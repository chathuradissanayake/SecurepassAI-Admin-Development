import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTh, FaList } from 'react-icons/fa'; // Import icons

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
            className={`cursor-pointer text-2xl ${viewMode === 'grid' ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-600`}
          />
          <FaList
            onClick={() => setViewMode('list')}
            className={`ml-2 cursor-pointer text-2xl ${viewMode === 'list' ? 'text-blue-500' : 'text-gray-500'} hover:text-blue-600`}
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
              className="p-6 rounded-lg shadow-md bg-slate-100 cursor-pointer"
              onClick={() => handleTileClick(company._id)}
            >
              <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
              <p className="text-gray-600">{company.address}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-hidden shadow-md sm:rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Address
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                  Admins
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, index) => (
                <tr
                  key={company._id}
                  className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                  onClick={() => handleTileClick(company._id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-gray-900">{company.name}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm text-gray-900">{company.address}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ul className="list-disc list-inside">
                      {company.admins.map((admin) => (
                        <li key={admin._id} className="text-sm text-gray-900">
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
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Create Company</h2>
            <form onSubmit={handleCreateCompany} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCompany.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={newCompany.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
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