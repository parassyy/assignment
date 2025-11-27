-- Create database
CREATE DATABASE IF NOT EXISTS taskmanager_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user and grant privileges
CREATE USER IF NOT EXISTS 'taskuser'@'%' IDENTIFIED BY 'taskpassword';
CREATE USER IF NOT EXISTS 'taskuser'@'localhost' IDENTIFIED BY 'taskpassword';

GRANT ALL PRIVILEGES ON taskmanager_db.* TO 'taskuser'@'%';
GRANT ALL PRIVILEGES ON taskmanager_db.* TO 'taskuser'@'localhost';

FLUSH PRIVILEGES;

-- Use the database
USE taskmanager_db;