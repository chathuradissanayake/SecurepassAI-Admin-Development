const express = require('express');
const { registerUser, getAllUsers } = require('../controllers/authController');

const router = express.Router();

// Create a new user
router.post('/register', registerUser);

// Get all users
router.get('/', getAllUsers);

module.exports = router;