import React from "react";
import CollectionCounts from "../components/CollectionCounts";
import Header from "../components/Header";
import Messages from "../components/Messages";
import PendingRequests from "../components/PendingRequests";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-full bg-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />

        {/* Collection Counts Section */}
        <div>
          <CollectionCounts />
        </div>

        {/* Access Requests Section */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 bg-white border rounded-lg shadow-md">
            <h3 className="text-gray-600 text-lg mb-4">Pending Requests</h3>
            <PendingRequests />
          </div>

          {/* Messages */}
          <div className="p-6 bg-white border rounded-lg shadow-md">
            <Messages />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;