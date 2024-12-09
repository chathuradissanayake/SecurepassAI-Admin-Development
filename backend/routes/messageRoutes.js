// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const { getMessages, toggleReadState} = require('../controllers/messageController');

// Route to get all messages
router.get("/messages", getMessages);

// Route to mark a message as read
router.patch("/messages/:id/toggle-read", toggleReadState);

module.exports = router;