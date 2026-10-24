<?php
/**
 * CORS HEADERS
 * Handles Cross-Origin Resource Sharing for the React frontend
 */

require_once 'config.php';

// Use the configured frontend URL for CORS (set in config.php)
$allowedOrigin = FRONTEND_URL;

// For development, you can temporarily allow all origins by uncommenting this:
// $allowedOrigin = '*';

header("Access-Control-Allow-Origin: " . $allowedOrigin);
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
