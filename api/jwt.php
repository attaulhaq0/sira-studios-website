<?php
/**
 * JWT TOKEN HANDLING
 * Simple JWT implementation for authentication
 */

require_once 'config.php';

function base64UrlEncode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

function base64UrlDecode($data) {
    return base64_decode(strtr($data, '-_', '+/'));
}

function generateJWT($userId, $email) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    
    $payload = json_encode([
        'user_id' => $userId,
        'email' => $email,
        'iat' => time(),
        'exp' => time() + JWT_EXPIRY
    ]);
    
    $base64Header = base64UrlEncode($header);
    $base64Payload = base64UrlEncode($payload);
    
    $signature = hash_hmac('sha256', $base64Header . '.' . $base64Payload, JWT_SECRET, true);
    $base64Signature = base64UrlEncode($signature);
    
    return $base64Header . '.' . $base64Payload . '.' . $base64Signature;
}

function verifyJWT($token) {
    $parts = explode('.', $token);
    
    if (count($parts) !== 3) {
        return false;
    }
    
    list($base64Header, $base64Payload, $base64Signature) = $parts;
    
    $signature = base64UrlDecode($base64Signature);
    $expectedSignature = hash_hmac('sha256', $base64Header . '.' . $base64Payload, JWT_SECRET, true);
    
    if (!hash_equals($expectedSignature, $signature)) {
        return false;
    }
    
    $payload = json_decode(base64UrlDecode($base64Payload), true);
    
    if ($payload['exp'] < time()) {
        return false;
    }
    
    return $payload;
}

function getAuthUser() {
    $headers = getallheaders();
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    
    if (empty($authHeader) || !preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
        return null;
    }
    
    $token = $matches[1];
    return verifyJWT($token);
}

function requireAuth() {
    $user = getAuthUser();
    
    if (!$user) {
        http_response_code(401);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }
    
    return $user;
}
?>
