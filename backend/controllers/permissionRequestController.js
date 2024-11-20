const PermissionRequest = require("../models/PermissionRequest");
const User = require("../models/User");

const createPermissionRequest = async (req, res) => {
  const { userId, doorId, name, doorName, inTime, outTime, date, message } = req.body;

  try {
    // Fetch the user's details using the userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const newRequest = new PermissionRequest({
      user: user._id, // Use the MongoDB ObjectId
      door: doorId,
      name,
      doorName,
      inTime,
      outTime,
      date,
      message,
    });

    const savedRequest = await newRequest.save();

    // Update the user's pendingRequests array
    user.pendingRequests.push(savedRequest._id);
    await user.save();

    res.status(201).json(savedRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPermissionRequestsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const requests = await PermissionRequest.find({ user: userId }).populate("door");
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approvePermissionRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await PermissionRequest.findById(id).populate('door');
    if (!request) {
      return res.status(404).json({ error: "Permission request not found" });
    }

    request.status = "Approved";
    await request.save();

    // Update the user's doorAccess array
    await User.findByIdAndUpdate(request.user, {
      $push: { doorAccess: request.door._id },
      $pull: { pendingRequests: request._id }
    });

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
      return res.status(404).json({ error: "Permission request not found" });
    }

    request.status = "Rejected";
    await request.save();

    // Remove the request from the user's pendingRequests array
    await User.findByIdAndUpdate(request.user, {
      $pull: { pendingRequests: request._id }
    });

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