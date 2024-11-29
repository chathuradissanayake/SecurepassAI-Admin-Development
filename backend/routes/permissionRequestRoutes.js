const express = require('express');
const router = express.Router();
const {
  createPermissionRequest,
  getPermissionRequestsByUserId,
  approvePermissionRequest,
  rejectPermissionRequest,
  getAllPermissionRequests,
} = require('../controllers/permissionRequestController');

// Route to create a new permission request
router.post('/create', createPermissionRequest);

// Route to get permission requests by user ID
router.get('/user/:userId', getPermissionRequestsByUserId);

router.get("/", getAllPermissionRequests); // New route to fetch all requests

// Route to approve a permission request
router.put('/:id/approve', approvePermissionRequest);

// Route to reject a permission request
router.put('/:id/reject', rejectPermissionRequest);

module.exports = router;