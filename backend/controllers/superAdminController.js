const AdminUser = require('../models/AdminUser');
const Company = require('../models/Company');
const bcrypt = require('bcrypt');

const createCompany = async (req, res) => {
  const { name, address } = req.body;
  try {
    const company = new Company({ name, address });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createAdminUser = async (req, res) => {
  const { firstName, lastName, email, password, companyId } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminUser = new AdminUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: 'Admin',
      company: companyId,
    });
    await adminUser.save();

    // Add the admin user to the company
    const company = await Company.findById(companyId);
    company.admins.push(adminUser._id);
    await company.save();

    res.status(201).json(adminUser);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createCompany, createAdminUser };