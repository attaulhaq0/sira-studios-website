<?php
/**
 * DATABASE CONFIGURATION
 * 
 * ⚠️ IMPORTANT: Update ALL values below before deploying to production!
 * You can find database credentials in Hostinger hPanel > Databases > MySQL Databases
 */

// =============================================================================
// PRODUCTION SETTINGS - Disable error display
// =============================================================================
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// =============================================================================
// DATABASE CREDENTIALS - HOSTINGER MYSQL
// =============================================================================
define('DB_HOST', getenv('DB_HOST') ?: 'localhost');
define('DB_NAME', getenv('DB_NAME') ?: '');
define('DB_USER', getenv('DB_USER') ?: '');
define('DB_PASS', getenv('DB_PASS') ?: '');

// =============================================================================
// JWT CONFIGURATION - UPDATE THIS!
// =============================================================================
// ⚠️ CRITICAL: Generate a secure random string for production!
// Use this command to generate: php -r "echo bin2hex(random_bytes(32));"
// Or use: https://randomkeygen.com/ (use "CodeIgniter Encryption Keys")
define('JWT_SECRET', getenv('JWT_SECRET') ?: '');
if (strlen(JWT_SECRET) < 32) {
    http_response_code(503);
    exit(json_encode(['error' => 'Server configuration required']));
}

// JWT Token expiry (in seconds) - 7 days
define('JWT_EXPIRY', 60 * 60 * 24 * 7);

// =============================================================================
// FRONTEND URL - Sira Studios
// =============================================================================
define('FRONTEND_URL', 'https://sirastudios.com');

// =============================================================================
// RATE LIMITING CONFIGURATION
// =============================================================================
define('RATE_LIMIT_WINDOW', 60); // Time window in seconds
define('RATE_LIMIT_MAX_REQUESTS', 10); // Max requests per window for forms
define('RATE_LIMIT_AUTH_MAX', 5); // Max auth attempts per window

// =============================================================================
// DATABASE CONNECTION
// =============================================================================
function getDbConnection() {
    try {
        $pdo = new PDO(
            "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4",
            DB_USER,
            DB_PASS,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]
        );
        return $pdo;
    } catch (PDOException $e) {
        // Log error internally but don't expose details
        error_log("Database connection failed: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Service temporarily unavailable']);
        exit;
    }
}

// =============================================================================
// RATE LIMITING HELPER
// =============================================================================
require_once __DIR__ . '/rate-limit.php';

function rateLimitExceeded() {
    http_response_code(429);
    echo json_encode(['error' => 'Too many requests. Please try again later.']);
    exit;
}
?>
