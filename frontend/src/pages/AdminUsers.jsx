import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const AdminUsers = () => {
  const [adminUsers, setAdminUsers] = useState([]);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.VITE_API_URL}/api/admin/admin-users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdminUsers(response.data);
      } catch (err) {
        console.error('Failed to fetch admin users', err);
      }
    };

    fetchAdminUsers();
  }, []);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />
        <div className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Admin Users</h2>
          <ul>
            {adminUsers.map((admin) => (
              <li key={admin._id}>
                {admin.firstName} {admin.lastName} ({admin.email})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;