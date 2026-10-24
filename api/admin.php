<?php
/**
 * ADMIN ENDPOINTS
 * Handles admin-only data access (requires authentication + admin/hr role)
 */

require_once 'cors.php';
require_once 'config.php';
require_once 'jwt.php';

$pdo = getDbConnection();
$action = isset($_GET['action']) ? $_GET['action'] : '';

// Require authentication for all admin endpoints
$authUser = requireAuth();

switch ($action) {
    case 'contacts':
        handleGetContacts($pdo, $authUser);
        break;
    case 'careers':
        handleGetCareers($pdo, $authUser);
        break;
    case 'roles':
        handleGetUserRoles($pdo, $authUser);
        break;
    case 'check-admin':
        handleCheckAdmin($pdo, $authUser);
        break;
    default:
        http_response_code(400);
        echo json_encode(['error' => 'Invalid action']);
}

function hasRole($pdo, $userId, $role) {
    $stmt = $pdo->prepare("SELECT id FROM user_roles WHERE user_id = ? AND role = ?");
    $stmt->execute([$userId, $role]);
    return $stmt->fetch() !== false;
}

function hasAdminAccess($pdo, $userId) {
    return hasRole($pdo, $userId, 'admin') || hasRole($pdo, $userId, 'hr');
}

function handleGetContacts($pdo, $authUser) {
    // Only admin can view all contacts
    if (!hasRole($pdo, $authUser['user_id'], 'admin')) {
        http_response_code(403);
        echo json_encode(['error' => 'Access denied. Admin role required.']);
        return;
    }
    
    $stmt = $pdo->prepare("SELECT * FROM contact_submissions ORDER BY created_at DESC");
    $stmt->execute();
    $contacts = $stmt->fetchAll();
    
    echo json_encode(['data' => $contacts]);
}

function handleGetCareers($pdo, $authUser) {
    // Admin or HR can view career applications
    if (!hasAdminAccess($pdo, $authUser['user_id'])) {
        http_response_code(403);
        echo json_encode(['error' => 'Access denied. Admin or HR role required.']);
        return;
    }
    
    $stmt = $pdo->prepare("SELECT * FROM career_applications ORDER BY created_at DESC");
    $stmt->execute();
    $applications = $stmt->fetchAll();
    
    echo json_encode(['data' => $applications]);
}

function handleGetUserRoles($pdo, $authUser) {
    // Users can only view their own roles
    $stmt = $pdo->prepare("SELECT role FROM user_roles WHERE user_id = ?");
    $stmt->execute([$authUser['user_id']]);
    $roles = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo json_encode(['roles' => $roles]);
}

function handleCheckAdmin($pdo, $authUser) {
    $isAdmin = hasAdminAccess($pdo, $authUser['user_id']);
    
    echo json_encode([
        'isAdmin' => $isAdmin,
        'userId' => $authUser['user_id']
    ]);
}
?>
