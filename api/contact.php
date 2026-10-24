<?php
/**
 * CONTACT FORM API
 * Handles public contact form submissions
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
if (!checkRateLimit('contact_' . $clientIP)) {
    rateLimitExceeded();
}

$pdo = getDbConnection();

$input = json_decode(file_get_contents('php://input'), true);

// Sanitize inputs
$name = isset($input['name']) ? trim(htmlspecialchars($input['name'], ENT_QUOTES, 'UTF-8')) : '';
$email = isset($input['email']) ? trim(filter_var($input['email'], FILTER_SANITIZE_EMAIL)) : '';
$phone = isset($input['phone']) ? trim(htmlspecialchars($input['phone'], ENT_QUOTES, 'UTF-8')) : null;
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

if (empty($message) || strlen($message) < 10) {
    $errors[] = 'Message must be at least 10 characters';
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
        INSERT INTO contact_submissions (id, name, email, phone, message)
        VALUES (?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([$id, $name, $email, $phone, $message]);
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your message. We will get back to you soon!',
        'id' => $id
    ]);
    
} catch (Exception $e) {
    error_log("Contact form error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Failed to submit message. Please try again.']);
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
