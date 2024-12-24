import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminList = () => {
  const [adminUsers, setAdminUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchAdminUsers();
  }, []);

  return (
    <div className="p-4 border dark:border-none rounded-lg shadow-sm bg-white dark:bg-slate-600">

      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold dark:text-slate-100 mb-4">Admin List</h2>
            <button
              onClick={() => navigate('/create-admin')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Create Admin
            </button>
          </div>
          <div className="overflow-hidden shadow-md sm:rounded-lg">
            <table className="min-w-full bg-white border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                    Company
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-600">
                    Options
                  </th>
                </tr>
              </thead>
              <tbody>
                {adminUsers.map((admin, index) => (
                  <tr
                    key={admin._id}
                    className={`border-b ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-medium text-gray-900">
                        {admin.firstName} {admin.lastName}
                      </p>
                      <p className="text-sm text-gray-500">{admin.email}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm text-gray-900">
                        {admin.company ? admin.company.name : 'N/A'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {admin.company ? admin.company.address : ''}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        type="button"
                        className="text-gray-600 hover:text-gray-900 focus:outline-none"
                      >
                        &#x22EE; {/* Unicode character for vertical ellipsis */}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      
    
  );
};

export default AdminList;