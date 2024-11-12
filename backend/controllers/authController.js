const User = require('../models/User');
const {  hashPassword } = require('../helper/auth');

// Register User
const registerUser = async (req, res) => {
    try {
      const { firstName, lastName, email, password, userId } = req.body;
  
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
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error fetching users' });
    }
  };

  const getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      console.log('Fetching user with id:', id); 
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      console.log('Fetched user:', user);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Error fetching user' });
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

    module.exports = { registerUser, getAllUsers, getUserById, deleteUserById};