const express = require('express');
const router = express.Router();
const {
  createPermissionRequest,
  getPermissionRequestsByUserId,
  approvePermissionRequest,
  rejectPermissionRequest,
  getPendingRequests,
} = require('../controllers/permissionRequestController');
const { authMiddleware, roleMiddleware } = require('../middleware/authMiddleware');


// Route to create a new permission request
router.post('/create', createPermissionRequest);

// Route to get permission requests by user ID
router.get('/user/:userId', getPermissionRequestsByUserId);

// Route to approve a permission request
router.put('/:id/approve', approvePermissionRequest);

// Route to reject a permission request
router.put('/:id/reject', rejectPermissionRequest);

// Route to fetch pending requests
router.get('/pending-requests', authMiddleware, roleMiddleware(['Admin']), getPendingRequests);


module.exports = router;