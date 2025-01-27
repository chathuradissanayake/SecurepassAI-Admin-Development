import React, { useEffect, useState } from "react";
import axios from "axios";
import CollectionCounts from "../components/CollectionCounts";
import DashboardMetrics from "../components/DashboardMetrics";
import Header from "../components/Header";
import Messages from "../components/Messages";
import PendingRequests from "../components/PendingRequests";
import Sidebar from "../components/Sidebar";
import CombinedGrowthChart from "../components/CombinedGrowthChart";

const Dashboard = () => {
  const userRole = localStorage.getItem('role'); // Assuming you store the role in localStorage

  const [growthData, setGrowthData] = useState({
    userGrowth: [],
    companyGrowth: [],
    doorGrowth: []
  });

  useEffect(() => {
    const fetchGrowthData = async () => {
      try {
        const [userGrowthResponse, companyGrowthResponse, doorGrowthResponse] = await Promise.all([
          axios.get('/api/growth/user-growth'),
          axios.get('/api/growth/company-growth'),
          axios.get('/api/growth/door-growth')
        ]);

        setGrowthData({
          userGrowth: userGrowthResponse.data,
          companyGrowth: companyGrowthResponse.data,
          doorGrowth: doorGrowthResponse.data
        });
      } catch (error) {
        console.error('Error fetching growth data:', error);
      }
    };

    fetchGrowthData();
  }, []);

  return (
    <div className="flex h-full bg-white dark:bg-slate-700">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="flex-1 p-6">
          {/* Dashboard Metrics Section for Super Admin */}
          {userRole === 'SuperAdmin' && (
            <div className="mt-6">
              <DashboardMetrics />
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-slate-200">Growth Metrics</h3>
                <CombinedGrowthChart data={growthData} />
              </div>
            </div>
          )}

          {/* Collection Counts Section for Admin */}
          {userRole !== 'SuperAdmin' && (
            <div>
              <div>
                <CollectionCounts />
              </div>
              {/* Access Requests Section */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-white dark:bg-slate-600 dark:text-slate-200 border dark:border-none rounded-lg shadow-md">
                  <h3 className="text-gray-600 dark:text-slate-200 text-lg mb-4">Pending Requests</h3>
                  <PendingRequests />
                </div>
                {/* Messages */}
                <div className="p-6 bg-white dark:bg-slate-600 dark:text-slate-200 border dark:border-none rounded-lg shadow-md">
                  <Messages />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;