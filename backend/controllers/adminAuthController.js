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

const updateCurrentAdminUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await AdminUser.findById(req.user.userId);

    if (user.role === 'SuperAdmin') {
      return res.status(403).json({ error: 'Super Admins are not allowed to update their profile' });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (password) user.password = await bcrypt.hash(password, 10);

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await AdminUser.findById(req.user.userId);

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Current password is incorrect' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
module.exports = { registerAdminUser, loginAdminUser, getCurrentAdminUser,updateCurrentAdminUser,changePassword };