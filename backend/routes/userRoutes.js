const express = require('express');
const { createUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

// Create a new user
router.post('/', createUser);

// Get all users
router.get('/', getAllUsers);

module.exports = router;