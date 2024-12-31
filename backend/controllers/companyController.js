const Company = require('../models/Company');

const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const getCompaniesWithAdmins = async (req, res) => {
  try {
    const companies = await Company.find().populate('admins', '-password');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

const addLocation = async (req, res) => {
  const { companyId, location } = req.body;
  try {
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    company.locations.push(location);
    await company.save();
    res.status(200).json({ message: 'Location added successfully', company });
  } catch (error) {
    res.status(500).json({ message: 'Error adding location', error });
  }
};
module.exports = { getCompaniesWithAdmins,getCompanies,addLocation };