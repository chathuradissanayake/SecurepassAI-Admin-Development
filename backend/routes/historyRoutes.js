const express = require('express');
const { getRecentAccessDoors } = require('../controllers/historyController');
const router = express.Router();

// Get recent access doors
router.get('/recent-access', getRecentAccessDoors);

module.exports = router;