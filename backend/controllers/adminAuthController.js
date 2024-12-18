const AdminUser = require('../models/AdminUser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const registerAdminUser = async (req, res) => {
  const { firstName, lastName, email, password, role, company } = req.body;
  try {
    if (role === 'SuperAdmin') {
      const existingSuperAdmin = await AdminUser.findOne({ role: 'SuperAdmin' });
      if (existingSuperAdmin) {
        return res.status(400).json({ error: 'Super Admin already exists' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AdminUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      company,
    });
    await newUser.save();
    res.status(201).json({ message: 'Admin user registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const loginAdminUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await AdminUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getCurrentAdminUser = async (req, res) => {
  try {
    const user = await AdminUser.findById(req.user.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { registerAdminUser, loginAdminUser, getCurrentAdminUser };