<?php
/** Offline tests exercise real cookie-free PHP workers and shared file locks. */
declare(strict_types=1);
define('SITE_ROOT', dirname(__DIR__));
if (($argv[1] ?? '') === '--worker') {
    $options = json_decode(base64_decode($argv[2]), true, 512, JSON_THROW_ON_ERROR);
    putenv('JWT_SECRET=local-rate-limit-test-only-' . str_repeat('x', 40));
    putenv('SIRA_RATE_LIMIT_DIR=' . $options['store']);
    $_SERVER['DOCUMENT_ROOT'] = $options['document_root'];
    ini_set('session.save_path', $options['sessions']);
    ini_set('error_log', dirname($options['sessions']) . '/php-errors.log');
    ob_start();
    register_shutdown_function(function () {
        $body = ob_get_clean();
        echo json_encode(['status' => http_response_code() ?: 200, 'body' => json_decode($body, true)]);
    });
    require SITE_ROOT . '/api/config.php';
    try {
        if (($options['mode'] ?? 'ip') === 'account') {
            $allowed = checkLoginAccountRateLimit($options['identifier']);
        } elseif (($options['mode'] ?? 'ip') === 'clock') {
            $allowed = consumeSiraRateLimit($options['identifier'], $options['limit'], $options['now']);
        } else {
            $allowed = checkRateLimit($options['identifier'], $options['limit']);
        }
        echo json_encode(['allowed' => $allowed]);
    } catch (Throwable $error) {
        http_response_code(500);
        echo json_encode(['exception' => get_class($error)]);
    }
    exit;
}
$fixture = rtrim(getenv('SIRA_TEST_TEMP_DIR') ?: sys_get_temp_dir(), '/\\') . '/sira-rate-limit-tests-' . bin2hex(random_bytes(8));
mkdir($fixture, 0700, true);
mkdir($fixture . '/sessions', 0700);
ini_set('error_log', $fixture . '/php-errors.log');
$tests = $failures = 0;
function options(string $name, array $extra = []): array {
    global $fixture;
    $store = $fixture . '/' . $name;
    if (!file_exists($store)) mkdir($store, 0700);
    return array_merge(['store' => $store, 'sessions' => $fixture . '/sessions', 'document_root' => realpath(SITE_ROOT . '/public'), 'identifier' => 'login_203.0.113.8', 'limit' => 5], $extra);
}
function launch(array $options): array {
    $command = [PHP_BINARY];
    if (php_ini_loaded_file()) $command = array_merge($command, ['-c', php_ini_loaded_file()]);
    $command = array_merge($command, [__FILE__, '--worker', base64_encode(json_encode($options))]);
    $process = proc_open($command, [0 => ['pipe', 'r'], 1 => ['pipe', 'w'], 2 => ['pipe', 'w']], $pipes);
    if (!is_resource($process)) throw new RuntimeException('Could not launch PHP worker');
    fclose($pipes[0]);
    return [$process, $pipes];
}
function finish(array $worker): array {
    [$process, $pipes] = $worker;
    $stdout = stream_get_contents($pipes[1]);
    $stderr = stream_get_contents($pipes[2]);
    fclose($pipes[1]); fclose($pipes[2]);
    $exit = proc_close($process);
    $result = json_decode($stdout, true);
    if ($exit !== 0 || !is_array($result) || $stderr !== '') throw new RuntimeException('Worker failed: ' . $stdout . $stderr);
    return $result;
}
function request(array $options): array { return finish(launch($options)); }
function allowed(array $result): bool { return $result['status'] === 200 && ($result['body']['allowed'] ?? null) === true; }
function expect(bool $condition, string $message): void { if (!$condition) throw new RuntimeException($message); }
function runTest(string $name, callable $test): void {
    global $tests, $failures;
    $tests++;
    try { $test(); echo "PASS $name\n"; }
    catch (Throwable $error) { $failures++; echo "FAIL $name: {$error->getMessage()}\n"; }
}
runTest('fresh cookies/processes cannot reset the IP quota', function () {
    $options = options('fresh');
    for ($i = 0; $i < 5; $i++) expect(allowed(request($options)), 'An attempt inside quota must pass');
    $result = request($options);
    expect($result['status'] === 200 && $result['body']['allowed'] === false, 'Sixth cookie-free process must be denied');
});
runTest('action and IP keys are isolated', function () {
    $options = options('isolation', ['limit' => 1]);
    expect(allowed(request($options)), 'First login should pass');
    expect(!allowed(request($options)), 'Same login bucket must be exhausted');
    expect(allowed(request(array_merge($options, ['identifier' => 'contact_203.0.113.8']))), 'Different action must have its own quota');
    expect(allowed(request(array_merge($options, ['identifier' => 'login_203.0.113.9']))), 'Different IP must have its own quota');
});
runTest('normalized account quota is independent of IP/session', function () {
    $options = options('account', ['mode' => 'account', 'identifier' => ' Visitor@Example.org ']);
    for ($i = 0; $i < 5; $i++) expect(allowed(request($options)), 'Account attempt inside quota should pass');
    expect(!allowed(request(array_merge($options, ['identifier' => 'visitor@example.org']))), 'Case/whitespace must not reset account quota');
    expect(allowed(request(array_merge($options, ['identifier' => 'other@example.org']))), 'Different account must have its own quota');
    expect(allowed(request(array_merge($options, ['mode' => 'ip', 'identifier' => 'login_203.0.113.99']))), 'Unrelated IP bucket should still pass');
});
runTest('window resets at boundary; denial does not extend it', function () {
    $options = options('clock', ['mode' => 'clock', 'limit' => 1, 'now' => 1000]);
    expect(allowed(request($options)), 'First attempt should pass');
    expect(!allowed(request(array_merge($options, ['now' => 1059]))), 'Quota must remain exhausted before 60 seconds');
    expect(allowed(request(array_merge($options, ['now' => 1060]))), 'Quota must reset at exactly 60 seconds');
    expect(!allowed(request(array_merge($options, ['now' => 1061]))), 'New window must retain its counter');
});
runTest('concurrent workers cannot overshoot quota', function () {
    $options = options('concurrent'); $workers = [];
    for ($i = 0; $i < 20; $i++) $workers[] = launch($options);
    $accepted = 0;
    foreach ($workers as $worker) $accepted += allowed(finish($worker)) ? 1 : 0;
    expect($accepted === 5, "Exactly five concurrent workers must pass; observed $accepted");
});
runTest('storage inside document root fails closed', function () {
    $options = options('public-store');
    $result = request(array_merge($options, ['document_root' => $options['store']]));
    expect($result['status'] === 503 && isset($result['body']['error']), 'Public storage must return generic 503');
    mkdir($options['store'] . '/child', 0700);
    $result = request(array_merge($options, ['store' => $options['store'] . '/child', 'document_root' => $options['store']]));
    expect($result['status'] === 503, 'Descendants of document root must also be rejected');
});
runTest('missing document root fails closed', function () {
    $options = options('unknown-root', ['document_root' => '']);
    expect(request($options)['status'] === 503, 'Unknown public boundary must not fall back to the current directory');
});
runTest('missing storage fails closed', function () {
    $options = options('missing'); rmdir($options['store']);
    $result = request($options);
    expect($result['status'] === 503 && !is_dir($options['store']), 'Missing storage must return 503 without recreating it');
});
runTest('malformed and empty counter files fail closed', function () {
    $options = options('corrupt');
    expect(allowed(request($options)), 'Fixture should initialize a real counter');
    $files = glob($options['store'] . '/*.json');
    expect(count($files) === 1, 'Persisted counter must exist');
    file_put_contents($files[0], '{invalid');
    expect(request($options)['status'] === 503, 'Corrupt JSON must not reset quota');
    file_put_contents($files[0], '');
    expect(request($options)['status'] === 503, 'Empty existing counter must also fail closed');
    foreach (['[]', '{"start":"1000","count":0}', '{"start":1000,"count":-1}'] as $invalid) {
        file_put_contents($files[0], $invalid);
        expect(request($options)['status'] === 503, 'Invalid counter schema must not reset quota');
    }
});
runTest('lock storage failure returns generic 503', function () {
    $options = options('lock-error');
    expect(allowed(request($options)), 'Fixture should initialize real lock storage');
    $locks = glob($options['store'] . '/*.lock');
    expect(count($locks) === 1, 'Lock fixture must exist');
    unlink($locks[0]); mkdir($locks[0], 0700);
    $result = request($options);
    expect($result['status'] === 503 && $result['body'] === ['error' => 'Service temporarily unavailable'], 'An unusable lock must deny requests without storage details');
});
runTest('storage contains no raw account/IP identifiers', function () {
    $options = options('privacy', ['mode' => 'account', 'identifier' => 'visitor@example.org']);
    expect(allowed(request($options)), 'Account fixture should initialize storage');
    foreach (glob($options['store'] . '/*') as $file) {
        $text = basename($file) . file_get_contents($file);
        expect(!str_contains($text, 'visitor') && !str_contains($text, 'example.org') && !str_contains($text, '203.0.113'), 'No plaintext identifier may persist');
    }
});
// Remove only this run's randomly named fixture in the configured test temp root.
$boundary = realpath($fixture);
$iterator = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($fixture, FilesystemIterator::SKIP_DOTS), RecursiveIteratorIterator::CHILD_FIRST);
foreach ($iterator as $item) {
    $resolved = realpath($item->getPathname());
    if ($resolved === false || !str_starts_with($resolved, $boundary . DIRECTORY_SEPARATOR) || $item->isLink()) throw new RuntimeException('Unsafe cleanup path');
    $item->isDir() ? rmdir($item->getPathname()) : unlink($item->getPathname());
}
rmdir($fixture);
echo "$tests tests, $failures failures\n";
exit($failures === 0 ? 0 : 1);
