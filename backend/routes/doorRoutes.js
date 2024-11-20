const express = require('express');
const { createDoor } = require("../controllers/doorController");
const router = express.Router();


// API Endpoint to save QR code details
router.post("/create", createDoor);


module.exports = router;
