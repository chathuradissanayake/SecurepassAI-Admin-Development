import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const AdminUsers = () => {
  const [adminUsers, setAdminUsers] = useState([]);

  useEffect(() => {
    const fetchAdminUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/admin/admin-users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdminUsers(response.data);
      } catch (err) {
        console.error("Failed to fetch admin users", err);
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
      </div>
    </div>
  );
};

export default AdminUsers