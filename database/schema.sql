-- ============================================
-- SIRA STUDIOS - HOSTINGER MySQL DATABASE SCRIPT
-- ============================================
-- Database: u174291510_sirastudios
-- Username: u174291510_sirastudios
-- Host: localhost
-- ============================================
-- Paste this entire script into Hostinger's phpMyAdmin
-- to create all required tables.
-- ============================================

-- Create users table (for authentication)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create profiles table (linked to users)
CREATE TABLE IF NOT EXISTS profiles (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL UNIQUE,
    email VARCHAR(255),
    full_name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create career_applications table
CREATE TABLE IF NOT EXISTS career_applications (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    position VARCHAR(100) NOT NULL,
    portfolio_url VARCHAR(500),
    resume_url VARCHAR(500),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create user_roles table (for role-based access control)
CREATE TABLE IF NOT EXISTS user_roles (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    role ENUM('admin', 'hr', 'user') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_user_role (user_id, role),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- TRIGGERS FOR AUTO UUID GENERATION
-- ============================================

-- Trigger for contact_submissions
DELIMITER //
CREATE TRIGGER before_insert_contact_submissions
BEFORE INSERT ON contact_submissions
FOR EACH ROW
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' THEN
        SET NEW.id = UUID();
    END IF;
END//
DELIMITER ;

-- Trigger for career_applications
DELIMITER //
CREATE TRIGGER before_insert_career_applications
BEFORE INSERT ON career_applications
FOR EACH ROW
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' THEN
        SET NEW.id = UUID();
    END IF;
END//
DELIMITER ;

-- Trigger for user_roles
DELIMITER //
CREATE TRIGGER before_insert_user_roles
BEFORE INSERT ON user_roles
FOR EACH ROW
BEGIN
    IF NEW.id IS NULL OR NEW.id = '' THEN
        SET NEW.id = UUID();
    END IF;
END//
DELIMITER ;

-- ============================================
-- INDEXES FOR BETTER PERFORMANCE
-- ============================================

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_contact_submissions_created ON contact_submissions(created_at);
CREATE INDEX idx_career_applications_created ON career_applications(created_at);
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);

-- ============================================
-- AFTER SETUP: CREATE YOUR ADMIN USER
-- ============================================
-- 1. Register a user through the website
-- 2. Find the user's ID in the 'users' table
-- 3. Run this SQL (replace YOUR_USER_ID):
--    INSERT INTO user_roles (id, user_id, role) VALUES (UUID(), 'YOUR_USER_ID', 'admin');
-- ============================================
