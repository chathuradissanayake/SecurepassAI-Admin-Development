const User = require('../models/User');

// Create a new user
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, userId, email, password } = req.body;
    const newUser = new User({ firstName, lastName, userId, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
};