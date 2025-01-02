import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaList, FaTh } from 'react-icons/fa'; // Import icons
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCompany, setNewCompany] = useState({ name: '', address: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // State for view mode
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/admin/companies-with-admins`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCompanies(response.data);
      } catch (err) {
        console.error('Failed to fetch companies', err);
      }
    };

    fetchCompanies();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      // Check if the company name and address combination is unique
      const checkResponse = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/companies/check-name-address-update`,
        {
          params: { name: newCompany.name, address: newCompany.address },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!checkResponse.data.isUnique) {
        toast.error('Company name and address combination already taken');
        return;
      }

      // Create the company if the combination is unique
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/create-company`, newCompany, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCompanies([...companies, response.data]);
      setNewCompany({ name: '', address: '' });
      setShowModal(false);
      setError('');
      toast.success('Company created successfully');
    } catch (err) {
      setError('Failed to create company');
      setSuccess('');
      toast.error('Failed to create company');
    }
  };

  const handleTileClick = (id) => {
    navigate(`/companies/${id}`);
  };

  return (
    <div className="p-4 border dark:border-none rounded-lg shadow-sm bg-white dark:bg-slate-600">
      <ToastContainer /> {/* Add ToastContainer */}
      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-4 ">
        <div className='flex items-center gap-4'>
          <FaTh
            onClick={() => setViewMode('grid')}
            className={`cursor-pointer text-2xl ${viewMode === 'grid' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-slate-400'} hover:text-blue-600`}
          />
          <FaList
            onClick={() => setViewMode('list')}
            className={`ml-2 cursor-pointer text-2xl ${viewMode === 'list' ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-slate-400'} hover:text-blue-600`}
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Create Company
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <div
              key={company._id}
              className="p-6 rounded-lg shadow-md bg-slate-100 dark:bg-slate-700 cursor-pointer hover:dark:bg-slate-800 hover:bg-slate-300"
              onClick={() => handleTileClick(company._id)}
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">{company.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">{company.address}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <table className="w-full mt-4 bg-white dark:bg-slate-700 shadow-md rounded-lg overflow-hidden">
            <thead >
              <tr className='text-left bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-b border-gray-300 dark:border-slate-400'>
                <th className="p-4">
                  Name
                </th>
                <th className="p-4">
                  Address
                </th>
                <th className="p-4">
                  Admins
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr
                  key={company._id}
                  className={`hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300`}
                  onClick={() => handleTileClick(company._id)}
                >
                  <td className="p-3 border-t border-gray-200 dark:border-slate-500">
                    <p className="text-sm font-medium">{company.name}</p>
                  </td>
                  <td className="p-3 border-t border-gray-200 dark:border-slate-500">
                    <p className="text-sm font-medium">{company.address}</p>
                  </td>
                  <td className="p-3 border-t border-gray-200 dark:border-slate-500">
                    <ul className="list-disc list-inside">
                      {company.admins.map((admin) => (
                        <li key={admin._id} className="text-sm text-gray-900 dark:text-slate-200">
                          {admin.firstName} {admin.lastName}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold dark:text-slate-100 text-gray-800 mb-4">Create Company</h2>
            <form onSubmit={handleCreateCompany} className="space-y-4">
              <div>
                <label className="block text-slate-700 dark:text-slate-200">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCompany.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 dark:bg-slate-600 dark:text-slate-100 focus:ring-blue-400"
                  required
                />
              </div>
              <div>
                <label className="block text-slate-700 dark:text-slate-200">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newCompany.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 dark:bg-slate-600 dark:text-slate-100 focus:ring-blue-400"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 w-20 dark:bg-slate-500 text-white px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 w-20 text-white px-4 py-2 rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyList;