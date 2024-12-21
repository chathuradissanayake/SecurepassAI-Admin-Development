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
          <h2 className="text-xl font-semibold text-gray-800">Companies</h2>
          <ul>
            {companies.map((company) => (
              <li key={company._id}>
                <h3 className="text-lg font-semibold">{company.name}</h3>
                <p>{company.address}</p>
                <ul>
                  {company.admins.map((admin) => (
                    <li key={admin._id}>{admin.firstName} {admin.lastName} ({admin.email})</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Companies;