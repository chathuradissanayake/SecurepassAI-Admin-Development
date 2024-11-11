const express = require('express');
const { registerUser, getAllUsers, getUserById } = require('../controllers/authController');

const router = express.Router();

// Create a new user
router.post('/register', registerUser);

// Get all users
router.get('/', getAllUsers);

// Get user by userId
router.get('/:id', getUserById);

module.exports = router;