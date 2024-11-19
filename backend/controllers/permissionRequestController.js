const PermissionRequest = require('../models/PermissionRequest');

const createPermissionRequest = async (req, res) => {
  const { userId, doorId } = req.body;

  try {
    const newRequest = new PermissionRequest({
      user: userId,
      door: doorId,
    });

    const savedRequest = await newRequest.save();

    // Update the user's pendingRequests array
    await User.findByIdAndUpdate(userId, {
      $push: { pendingRequests: savedRequest._id }
    });

    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getPermissionRequestsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const requests = await PermissionRequest.find({ user: userId }).populate('door');
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approvePermissionRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await PermissionRequest.findById(id);
    if (!request) {
      return res.status(404).json({ error: 'Permission request not found' });
    }

    request.status = 'Approved';
    await request.save();

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const rejectPermissionRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await PermissionRequest.findById(id);
    if (!request) {
      return res.status(404).json({ error: 'Permission request not found' });
    }

    request.status = 'Rejected';
    await request.save();

    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPermissionRequest,
  getPermissionRequestsByUserId,
  approvePermissionRequest,
  rejectPermissionRequest,
};