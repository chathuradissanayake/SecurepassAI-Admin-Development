const express = require('express');
const router = express.Router();
const {
  createPermissionRequest,
  getPermissionRequestsByUserId,
  approvePermissionRequest,
  rejectPermissionRequest,
  pendingRequest,
} = require('../controllers/permissionRequestController');

// Route to create a new permission request
router.post('/create', createPermissionRequest);

// Route to get permission requests by user ID
router.get('/user/:userId', getPermissionRequestsByUserId);

// Route to approve a permission request
router.put('/:id/approve', approvePermissionRequest);

// Route to reject a permission request
router.put('/:id/reject', rejectPermissionRequest);

router.get('/pending-requests', pendingRequest);

module.exports = router;