const User = require('../models/User');
const AdminUser = require('../models/AdminUser');
const Company = require('../models/Company');

// Fetch dashboard metrics
const getDashboardMetrics = async (req, res) => {
  try {
    const totalUsersCount = await User.countDocuments();
    const totalAdminUsersCount = await AdminUser.countDocuments();
    const totalCompaniesCount = await Company.countDocuments();

    res.json({
      totalUsersCount,
      totalAdminUsersCount,
      totalCompaniesCount,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDashboardMetrics };