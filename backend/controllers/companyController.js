const Company = require('../models/Company');

const getCompaniesWithAdmins = async (req, res) => {
  try {
    const companies = await Company.find().populate('admins', '-password');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getCompaniesWithAdmins };