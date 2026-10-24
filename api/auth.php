<?php
/**
 * AUTHENTICATION API
 * Handles user registration, login, and session management
 */

require_once 'cors.php';
require_once 'config.php';
require_once 'jwt.php';

$pdo = getDbConnection();

// Route the request
$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'register':
        handleRegister($pdo);
        break;
    case 'login':
        handleLogin($pdo);
        break;
    case 'me':
        handleGetUser($pdo);
        break;
    case 'logout':
        handleLogout();
        break;
    case 'test':
        echo json_encode(['success' => true, 'message' => 'Auth API is working']);
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
}

function handleRegister($pdo) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }
    
    // Rate limiting
    $clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    if (!checkRateLimit('register_' . $clientIP, RATE_LIMIT_AUTH_MAX)) {
        rateLimitExceeded();
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    $email = isset($input['email']) ? trim(filter_var($input['email'], FILTER_SANITIZE_EMAIL)) : '';
    $password = isset($input['password']) ? $input['password'] : '';
    $fullName = isset($input['fullName']) ? trim(htmlspecialchars($input['fullName'], ENT_QUOTES, 'UTF-8')) : '';
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email address']);
        return;
    }
    
    // Validate email length
    if (strlen($email) > 255) {
        http_response_code(400);
        echo json_encode(['error' => 'Email address is too long']);
        return;
    }
    
    // Strong password validation
    $passwordErrors = validatePassword($password);
    if (!empty($passwordErrors)) {
        http_response_code(400);
        echo json_encode(['error' => implode(' ', $passwordErrors)]);
        return;
    }
    
    // Validate name
    if (empty($fullName) || strlen($fullName) < 2) {
        http_response_code(400);
        echo json_encode(['error' => 'Full name must be at least 2 characters']);
        return;
    }
    
    if (strlen($fullName) > 100) {
        http_response_code(400);
        echo json_encode(['error' => 'Full name is too long']);
        return;
    }
    
    try {
        // Check if user exists
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        
        if ($stmt->fetch()) {
            http_response_code(400);
            echo json_encode(['error' => 'Email already registered']);
            return;
        }
        
        // Create user
        $userId = generateUUID();
        $passwordHash = password_hash($password, PASSWORD_DEFAULT);
        
        $pdo->beginTransaction();
        
        $stmt = $pdo->prepare("INSERT INTO users (id, email, password_hash, full_name) VALUES (?, ?, ?, ?)");
        $stmt->execute([$userId, $email, $passwordHash, $fullName]);
        
        $profileId = generateUUID();
        $stmt = $pdo->prepare("INSERT INTO profiles (id, user_id, email, full_name) VALUES (?, ?, ?, ?)");
        $stmt->execute([$profileId, $userId, $email, $fullName]);
        
        $stmt = $pdo->prepare("INSERT INTO user_roles (user_id, role) VALUES (?, 'user')");
        $stmt->execute([$userId]);
        
        $pdo->commit();
        
        // Generate JWT
        $token = generateJWT($userId, $email);
        
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $userId,
                'email' => $email,
                'full_name' => $fullName
            ],
            'token' => $token
        ]);
        
    } catch (Exception $e) {
        if ($pdo->inTransaction()) {
            $pdo->rollBack();
        }
        error_log("Registration error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Registration failed. Please try again.']);
    }
}

function handleLogin($pdo) {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
        return;
    }
    
    // Rate limiting
    $clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    if (!checkRateLimit('login_' . $clientIP, RATE_LIMIT_AUTH_MAX)) {
        rateLimitExceeded();
    }
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    $email = isset($input['email']) ? trim(filter_var($input['email'], FILTER_SANITIZE_EMAIL)) : '';
    $password = isset($input['password']) ? $input['password'] : '';
    
    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and password are required']);
        return;
    }

    // Shared account quota also limits guesses distributed across different IPs.
    if (!checkLoginAccountRateLimit($email)) {
        rateLimitExceeded();
    }
    
    try {
        $stmt = $pdo->prepare("SELECT id, email, password_hash, full_name FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if (!$user || !password_verify($password, $user['password_hash'])) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid email or password']);
            return;
        }
        
        $token = generateJWT($user['id'], $user['email']);
        
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'full_name' => $user['full_name']
            ],
            'token' => $token
        ]);
        
    } catch (Exception $e) {
        error_log("Login error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Login failed. Please try again.']);
    }
}

function handleGetUser($pdo) {
    $authUser = getAuthUser();
    
    if (!$authUser) {
        http_response_code(401);
        echo json_encode(['error' => 'Not authenticated']);
        return;
    }
    
    try {
        $stmt = $pdo->prepare("SELECT id, email, full_name FROM users WHERE id = ?");
        $stmt->execute([$authUser['user_id']]);
        $user = $stmt->fetch();
        
        if (!$user) {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            return;
        }
        
        echo json_encode([
            'success' => true,
            'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'full_name' => $user['full_name']
            ]
        ]);
        
    } catch (Exception $e) {
        error_log("Get user error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Failed to get user data']);
    }
}

function handleLogout() {
    echo json_encode(['success' => true, 'message' => 'Logged out successfully']);
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

function validatePassword($password) {
    $errors = [];
    
    if (strlen($password) < 8) {
        $errors[] = 'Password must be at least 8 characters.';
    }
    
    if (!preg_match('/[A-Z]/', $password)) {
        $errors[] = 'Password must contain at least one uppercase letter.';
    }
    
    if (!preg_match('/[a-z]/', $password)) {
        $errors[] = 'Password must contain at least one lowercase letter.';
    }
    
    if (!preg_match('/[0-9]/', $password)) {
        $errors[] = 'Password must contain at least one number.';
    }
    
    return $errors;
}
?>
