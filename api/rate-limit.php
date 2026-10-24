<?php
/** Shared, private rate-limit state. No cookies or raw identifiers are persisted. */

function siraRateLimitDirectory() {
    $configured = getenv('SIRA_RATE_LIMIT_DIR') ?: '';
    $absolute = str_replace('\\', '/', $configured);
    if ($absolute === '' || ($absolute[0] !== '/' && !preg_match('~^[A-Za-z]:/~', $absolute))) {
        throw new RuntimeException('Private rate-limit storage is not configured');
    }
    $publicDirectory = $_SERVER['DOCUMENT_ROOT'] ?? '';
    if (!is_string($publicDirectory) || $publicDirectory === '') {
        throw new RuntimeException('Document root is not configured');
    }
    $directory = realpath($configured);
    $documentRoot = realpath($publicDirectory);
    if ($directory === false || $documentRoot === false || !is_dir($directory) ||
        !is_dir($documentRoot) || !is_writable($directory)) {
        throw new RuntimeException('Private rate-limit storage is unavailable');
    }
    $normalize = function ($path) {
        $path = rtrim(str_replace('\\', '/', $path), '/');
        return PHP_OS_FAMILY === 'Windows' ? strtolower($path) : $path;
    };
    $storagePath = $normalize($directory);
    $publicPath = $normalize($documentRoot);
    if ($storagePath === $publicPath || str_starts_with($storagePath . '/', $publicPath . '/')) {
        throw new RuntimeException('Rate-limit storage must be outside the document root');
    }
    if (PHP_OS_FAMILY !== 'Windows' && (fileperms($directory) & 0077) !== 0) {
        throw new RuntimeException('Rate-limit storage requires private permissions');
    }
    return $directory;
}

// $now is supplied by the server clock; the HTTP API never accepts it from input.
function consumeSiraRateLimit($identifier, $maxRequests, $now) {
    if (!is_string($identifier) || $identifier === '' || strlen($identifier) > 512 ||
        !is_int($maxRequests) || $maxRequests < 1 || !is_int($now) || $now < 0) {
        throw new RuntimeException('Invalid rate-limit parameters');
    }
    $directory = siraRateLimitDirectory();
    $key = hash_hmac('sha256', 'sira-rate-limit:v1:' . $identifier, JWT_SECRET);
    $lockPath = $directory . DIRECTORY_SEPARATOR . $key . '.lock';
    $statePath = $directory . DIRECTORY_SEPARATOR . $key . '.json';
    if (is_link($lockPath) || is_link($statePath)) {
        throw new RuntimeException('Invalid rate-limit storage file');
    }
    $previousMask = umask(0077);
    try {
        $lock = @fopen($lockPath, 'c+b');
    } finally {
        umask($previousMask);
    }
    if ($lock === false) {
        throw new RuntimeException('Cannot open rate-limit lock');
    }
    try {
        if (PHP_OS_FAMILY !== 'Windows' && !@chmod($lockPath, 0600)) {
            throw new RuntimeException('Cannot secure rate-limit lock');
        }
        // The lock file has a stable inode: never unlink it during live requests.
        if (!flock($lock, LOCK_EX)) {
            throw new RuntimeException('Cannot lock rate-limit state');
        }
        clearstatcache(true, $statePath);
        $data = ['start' => $now, 'count' => 0];
        if (file_exists($statePath)) {
            if (!is_file($statePath) || is_link($statePath) || filesize($statePath) > 256) {
                throw new RuntimeException('Invalid rate-limit counter');
            }
            $raw = @file_get_contents($statePath);
            if ($raw === false) {
                throw new RuntimeException('Cannot read rate-limit state');
            }
            $data = json_decode($raw, true, 8, JSON_THROW_ON_ERROR);
            if (!is_array($data) || count($data) !== 2 || !isset($data['start'], $data['count']) ||
                !is_int($data['start']) || $data['start'] < 0 || !is_int($data['count']) || $data['count'] < 0) {
                throw new RuntimeException('Invalid rate-limit state');
            }
        }
        if ($now - $data['start'] >= RATE_LIMIT_WINDOW) {
            $data = ['start' => $now, 'count' => 0];
        }
        if ($data['count'] >= $maxRequests) {
            return false;
        }
        $data['count']++;
        $encoded = json_encode($data, JSON_THROW_ON_ERROR);
        $previousMask = umask(0077);
        try {
            $state = @fopen($statePath, 'c+b');
        } finally {
            umask($previousMask);
        }
        if ($state === false) {
            throw new RuntimeException('Cannot open rate-limit state');
        }
        try {
            if ((PHP_OS_FAMILY !== 'Windows' && !@chmod($statePath, 0600)) ||
                !ftruncate($state, 0) || !rewind($state) ||
                fwrite($state, $encoded) !== strlen($encoded) || !fflush($state)) {
                throw new RuntimeException('Cannot persist rate-limit state');
            }
        } finally {
            fclose($state);
        }
        return true;
    } finally {
        flock($lock, LOCK_UN);
        fclose($lock);
    }
}

function checkRateLimit($identifier, $maxRequests = null) {
    try {
        return consumeSiraRateLimit($identifier, $maxRequests ?? RATE_LIMIT_MAX_REQUESTS, time());
    } catch (Throwable $error) {
        // Never expose a storage path, account, IP or underlying exception to clients.
        error_log('Sira rate-limit storage unavailable');
        http_response_code(503);
        echo json_encode(['error' => 'Service temporarily unavailable']);
        exit;
    }
}

function checkLoginAccountRateLimit($email) {
    // The users.email collation is case-insensitive; variants must share a quota.
    return checkRateLimit('login_account_' . strtolower(trim($email)), RATE_LIMIT_AUTH_MAX);
}
