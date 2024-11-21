const User = require('../models/User');
const PermissionRequest = require('../models/PermissionRequest')
const { hashPassword } = require('../helper/auth');

// Register User
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userId } = req.body;
    console.log('Registering user:', req.body); // Log the request body

    // Check name
    if (!firstName || !lastName) {
      return res.json({
        error: 'First name and last name are required',
      });
    }

    // Check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: 'Email is already taken',
      });
    }

    // Check userId
    const userIdExist = await User.findOne({ userId });
    if (userIdExist) {
      return res.json({
        error: 'User ID is already taken',
      });
    }

    // Check password
    if (!password || password.length < 6) {
      return res.json({
        error: 'Password is required and should be min 6 characters long',
      });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user in database
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userId,
    });

    console.log('User created:', user); // Log the created user
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error registering user' });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log('Fetched users:', users); // Log the fetched users
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
};

// Get user by _id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Fetching user with id:', id); // Log the id

    // Find the user and populate the pending requests
    const user = await User.findById(id).populate({
      path: 'pendingRequests',
      match: { status: 'Pending' },
      populate: { path: 'door' }
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find approved permission requests for the user
    const approvedRequests = await PermissionRequest.find({ user: id, status: 'Approved' }).populate('door');

    // Extract the doors from the approved requests
    const approvedDoors = approvedRequests.map(request => request.door);

    // Update the user's doorAccess with the approved doors
    user.doorAccess = approvedDoors;

    // Find pending permission requests for the user
    const pendingRequests = await PermissionRequest.find({ user: id, status: 'Pending' }).populate('door');

    // Update the user's pendingRequests with the full details
    user.pendingRequests = pendingRequests;

    console.log('Fetched user:', user); // Log the fetched user
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching user' });
  }
};

// Update user by _id
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, userId } = req.body;
    console.log('Updating user with id:', id); // Log the id

    // Check userId uniqueness
    const userIdExist = await User.findOne({ userId });
    if (userIdExist && userIdExist._id.toString() !== id) {
      return res.status(400).json({ error: 'User ID is already taken' });
    }

    const user = await User.findByIdAndUpdate(id, { firstName, lastName, email, userId }, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('Updated user:', user); // Log the updated user
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error updating user' });
  }
};

// Delete user by _id
const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting user with id:', id); // Log the id
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('Deleted user:', user); // Log the deleted user
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error deleting user' });
  }
};

module.exports = { registerUser, getAllUsers, getUserById, updateUserById, deleteUserById };