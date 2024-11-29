// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const { getMessages } = require('../controllers/messageController');

// Route to get all messages
router.get("/messages", getMessages);

module.exports = router;