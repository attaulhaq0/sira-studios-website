<?php
/**
 * CAREERS API
 * Handles job application submissions
 */

require_once 'cors.php';
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Rate limiting
$clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (!checkRateLimit('careers_' . $clientIP)) {
    rateLimitExceeded();
}

$pdo = getDbConnection();

$input = json_decode(file_get_contents('php://input'), true);

// Sanitize inputs
$name = isset($input['name']) ? trim(htmlspecialchars($input['name'], ENT_QUOTES, 'UTF-8')) : '';
$email = isset($input['email']) ? trim(filter_var($input['email'], FILTER_SANITIZE_EMAIL)) : '';
$phone = isset($input['phone']) ? trim(htmlspecialchars($input['phone'], ENT_QUOTES, 'UTF-8')) : null;
$position = isset($input['position']) ? trim(htmlspecialchars($input['position'], ENT_QUOTES, 'UTF-8')) : '';
$portfolioUrl = isset($input['portfolio_url']) ? trim(filter_var($input['portfolio_url'], FILTER_SANITIZE_URL)) : null;
$message = isset($input['message']) ? trim(htmlspecialchars($input['message'], ENT_QUOTES, 'UTF-8')) : '';

// Validation
$errors = [];

if (empty($name) || strlen($name) < 2) {
    $errors[] = 'Name must be at least 2 characters';
}

if (strlen($name) > 100) {
    $errors[] = 'Name must be less than 100 characters';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Valid email is required';
}

if (strlen($email) > 255) {
    $errors[] = 'Email must be less than 255 characters';
}

if (empty($position)) {
    $errors[] = 'Position is required';
}

if (strlen($position) > 100) {
    $errors[] = 'Position must be less than 100 characters';
}

if ($portfolioUrl && !filter_var($portfolioUrl, FILTER_VALIDATE_URL)) {
    $errors[] = 'Portfolio URL must be a valid URL';
}

if ($portfolioUrl && strlen($portfolioUrl) > 500) {
    $errors[] = 'Portfolio URL is too long';
}

if (strlen($message) > 2000) {
    $errors[] = 'Message must be less than 2000 characters';
}

if ($phone && strlen($phone) > 20) {
    $errors[] = 'Phone number is too long';
}

if (!empty($errors)) {
    http_response_code(400);
    echo json_encode(['error' => implode('. ', $errors)]);
    exit;
}

try {
    $id = generateUUID();
    
    $stmt = $pdo->prepare("
        INSERT INTO career_applications (id, name, email, phone, position, portfolio_url, message)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([$id, $name, $email, $phone, $position, $portfolioUrl, $message]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your application. We will review it and get back to you!',
        'id' => $id
    ]);
    
} catch (Exception $e) {
    error_log("Career application error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to submit application. Please try again.']);
}

function generateUUID() {
    return sprintf('%04x%04x-%04x-%04x-%04x-%04x%04x%04x',
        mt_rand(0, 0xffff), mt_rand(0, 0xffff),
        mt_rand(0, 0xffff),
        mt_rand(0, 0x0fff) | 0x4000,
        mt_rand(0, 0x3fff) | 0x8000,
        mt_rand(0, 0xffff), mt_rand(0, 0xffff), mt_rand(0, 0xffff)
    );
}
?>
