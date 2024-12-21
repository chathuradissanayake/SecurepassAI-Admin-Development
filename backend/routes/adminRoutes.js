const express = require('express');
const { registerAdminUser, loginAdminUser, getCurrentAdminUser, updateCurrentAdminUser, changePassword, getAllAdminUsers } = require('../controllers/adminAuthController');
const { createCompany, createAdminUser } = require('../controllers/superAdminController');
const { getCompaniesWithAdmins,getCompanies } = require('../controllers/companyController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Register a new admin user
router.post('/register', authMiddleware, roleMiddleware(['SuperAdmin']), registerAdminUser);

// Login an admin user
router.post('/login', loginAdminUser);

// Get current admin user
router.get('/me', authMiddleware, getCurrentAdminUser);

// Get all admin users
router.get('/admin-users', authMiddleware, roleMiddleware(['SuperAdmin']), getAllAdminUsers);

// Update current admin user
router.put('/me', authMiddleware, updateCurrentAdminUser);

// Change password
router.put('/change-password', authMiddleware, changePassword);

// Create a new company (SuperAdmin only)
router.post('/create-company', authMiddleware, roleMiddleware(['SuperAdmin']), createCompany);

// Get all companies with their admins
router.get('/companies-with-admins', authMiddleware, getCompaniesWithAdmins);

// Get all companies
router.get('/companies', authMiddleware, getCompanies);

// Create a new admin user (SuperAdmin only)
router.post('/create-admin', authMiddleware, roleMiddleware(['SuperAdmin']), createAdminUser);

module.exports = router;