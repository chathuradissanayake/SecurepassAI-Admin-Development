import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Companies = () => {
  const [companies, setCompanies] = useState([]);

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

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Companies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <div key={company._id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
                <p className="text-gray-600">{company.address}</p>
                <h4 className="mt-4 text-lg font-medium text-gray-800">Admins</h4>
                <ul className="mt-2 space-y-2">
                  {company.admins.map((admin) => (
                    <li key={admin._id} className="flex items-center space-x-2">
                      <div className="text-gray-900">{admin.firstName} {admin.lastName}</div>
                      <div className="text-gray-500">({admin.email})</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;