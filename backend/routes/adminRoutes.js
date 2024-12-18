const express = require('express');
const { registerAdminUser, loginAdminUser, getCurrentAdminUser } = require('../controllers/adminAuthController');
const { createCompany, createAdminUser } = require('../controllers/superAdminController');
const { getCompaniesWithAdmins } = require('../controllers/companyController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Register a new admin user
router.post('/register', authMiddleware, roleMiddleware(['SuperAdmin']), registerAdminUser);

// Login an admin user
router.post('/login', loginAdminUser);

// Get current admin user
router.get('/me', authMiddleware, getCurrentAdminUser);

// Create a new company (SuperAdmin only)
router.post('/create-company', authMiddleware, roleMiddleware(['SuperAdmin']), createCompany);

// Create a new admin user (SuperAdmin only)
router.post('/create-admin', authMiddleware, roleMiddleware(['SuperAdmin']), createAdminUser);

// Get companies with their admins (SuperAdmin only)
router.get('/companies-with-admins', authMiddleware, roleMiddleware(['SuperAdmin']), getCompaniesWithAdmins);

module.exports = router;