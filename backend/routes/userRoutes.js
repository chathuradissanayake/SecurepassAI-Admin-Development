const express = require('express');
const { registerUser, getAllUsers, getUserById, deleteUserById  } = require('../controllers/authController');

const router = express.Router();

// Create a new user
router.post('/register', registerUser);

// Get all users
router.get('/', getAllUsers);

// Get user by userId
router.get('/:id', getUserById);

// Delete user by _id
router.delete('/:id', deleteUserById);

module.exports = router;