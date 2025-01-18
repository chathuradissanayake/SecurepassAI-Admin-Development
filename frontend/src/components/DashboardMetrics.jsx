import React, { useEffect, useState } from 'react';
import { FaUsers, FaUserShield, FaBuilding } from "react-icons/fa";

const DashboardMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalUsersCount: 0,
    totalAdminUsersCount: 0,
    totalCompaniesCount: 0,
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/dashboard/metrics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error('Error fetching dashboard metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Users Card */}
      <div className="p-4 bg-white dark:bg-slate-600 dark:text-slate-200 rounded-lg shadow-md flex items-center gap-4">
        <div className="text-blue-500 text-3xl">
          <FaUsers />
        </div>
        <div>
          <h3 className="text-gray-600 dark:text-slate-300 text-sm">Total Users</h3>
          <p className="text-2xl font-bold">{metrics.totalUsersCount}</p>
        </div>
      </div>

      {/* Total Admin Users Card */}
      <div className="p-4 bg-white dark:bg-slate-600 dark:text-slate-200 rounded-lg shadow-md flex items-center gap-4">
        <div className="text-green-500 text-3xl">
          <FaUserShield />
        </div>
        <div>
          <h3 className="text-gray-600 dark:text-slate-300 text-sm">Total Admin Users</h3>
          <p className="text-2xl font-bold">{metrics.totalAdminUsersCount}</p>
        </div>
      </div>

      {/* Total Companies Card */}
      <div className="p-4 bg-white dark:bg-slate-600 dark:text-slate-200 rounded-lg shadow-md flex items-center gap-4">
        <div className="text-yellow-500 text-3xl">
          <FaBuilding />
        </div>
        <div>
          <h3 className="text-gray-600 dark:text-slate-300 text-sm">Total Companies</h3>
          <p className="text-2xl font-bold">{metrics.totalCompaniesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardMetrics;