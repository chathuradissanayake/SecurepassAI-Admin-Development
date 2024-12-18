const express = require('express');
const { registerAdminUser, loginAdminUser, getCurrentAdminUser } = require('../controllers/adminAuthController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

// Register a new admin user
router.post('/register', authMiddleware, roleMiddleware(['SuperAdmin']), registerAdminUser);

// Login an admin user
router.post('/login', loginAdminUser);

// Get current admin user
router.get('/me', authMiddleware, getCurrentAdminUser);

// Protected route for SuperAdmin
router.post('/create-company', authMiddleware, roleMiddleware(['SuperAdmin']), (req, res) => {
  
});

module.exports = router;