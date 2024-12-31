import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import DashboardMetrics from "../components/DashboardMetrics";
import CollectionCounts from "../components/CollectionCounts";

const Dashboard = () => {
  const userRole = localStorage.getItem('role'); // Assuming you store the role in localStorage

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
            </div>
          )}

          {/* Collection Counts Section for Admin */}
          {userRole !== 'SuperAdmin' && (
            <div>
              <CollectionCounts />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;