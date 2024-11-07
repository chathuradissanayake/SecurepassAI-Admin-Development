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

    module.exports = { registerUser, getAllUsers };