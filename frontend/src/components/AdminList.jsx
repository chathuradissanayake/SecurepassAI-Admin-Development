import axios from "axios";
import { default as React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from '../components/Modal';

const AdminList = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyId, setCompanyId] = useState('');
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response1 = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/companies`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanies(response1.data);
      } catch (err) {
        console.error('Failed to fetch companies', err);
      }
    };

    fetchCompanies();
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/admin/admin-users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Filter out SuperAdmin accounts
      const filteredAdminUsers = response.data.filter(user => user.role !== 'SuperAdmin');
      setAdminUsers(filteredAdminUsers);
    } catch (err) {
      console.error("Failed to fetch admin users", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/create-admin`, {
        firstName,
        lastName,
        email,
        password,
        companyId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccess('Admin user created successfully');
      setError('');

      // Copy login credentials to clipboard
      const credentials = `Email: ${email}\nPassword: ${password}`;
      await navigator.clipboard.writeText(credentials);
      toast.success("Login credentials copied to clipboard. Please store them in a safe place and share them with the new admin user.",{
        autoClose: 5000,
      });
      // Reset form fields
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setCompanyId('');

      // Refresh the admin list
      await fetchAdminUsers();
      setIsModalVisible(false);
    } catch (err) {
      setError('Failed to create admin user');
      setSuccess('');
    }
  };

  useEffect(() => {
    fetchAdminUsers();
  }, []);

  return (
    <div className="p-4 border dark:border-none rounded-lg shadow-sm bg-white dark:bg-slate-600">

      <ToastContainer /> 

      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold dark:text-slate-100 mb-4">Admin List</h2>
        <button
          onClick={() => setIsModalVisible(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Create Admin
        </button>
      </div>
      <div className="">
        <table className="w-full mt-4 bg-white dark:bg-slate-700 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="text-left bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-b border-gray-300 dark:border-slate-400">
              <th className="p-4 ">
                Name
              </th>
              <th className="p-4 ">
                Company
              </th>
              <th className="p-4 ">
                Options
              </th>
            </tr>
          </thead>
          <tbody>
            {adminUsers.map((admin, index) => (
              <tr
                key={admin._id}
                className={`hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300`}
              >
                <td className="p-3 border-t border-gray-200 dark:border-slate-500">
                  <p className="text-sm font-medium ">
                    {admin.firstName} {admin.lastName}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{admin.email}</p>
                </td>
                <td className="p-3 border-t border-gray-200 dark:border-slate-500">
                  <p className="text-sm font-medium">
                    {admin.company ? admin.company.name : 'N/A'}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {admin.company ? admin.company.address : ''}
                  </p>
                </td>
                <td className="p-3 border-t border-gray-200 dark:border-slate-500 text-right">
                  <button
                    type="button"
                    className="text-gray-600 hover:text-gray-900 focus:outline-none"
                    onClick={() => navigate(`/admin-users/${admin._id}`)}
                  >
                    &#x22EE; {/* Unicode character for vertical ellipsis */}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Creating Admin */}
      <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Create Admin User</h2>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-700 dark:text-slate-200">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 dark:bg-slate-600 dark:text-slate-100 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-200">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 dark:bg-slate-600 dark:text-slate-100 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-200">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 dark:bg-slate-600 dark:text-slate-100 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-200">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 dark:bg-slate-600 dark:text-slate-100 focus:ring-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-slate-700 dark:text-slate-200">Company</label>
            <select
              value={companyId}
              onChange={(e) => setCompanyId(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 dark:bg-slate-600 dark:text-slate-100 focus:ring-blue-400"
              required
            >
              <option value="">Select a company</option>
              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 w-20 dark:bg-slate-500 text-white px-4 py-2 rounded mr-2"
              onClick={() => setIsModalVisible(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 w-20 text-white px-4 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminList;