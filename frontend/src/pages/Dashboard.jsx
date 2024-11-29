import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import DashboardRequests from "../components/DashboardRequests";
import {
  FaUsers,
  FaDoorOpen,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import axios from "axios";

const Dashboard = () => {
  const [accessRequests, setAccessRequests] = useState([]);
  const [showDenyPopup, setShowDenyPopup] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [denyReason, setDenyReason] = useState("");

  const fetchRequests = async () => {
    try {
      const response = await axios.get("/api/permission-requests/all-requests");
      setAccessRequests(response.data);
    } catch (error) {
      console.error("Error fetching access requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
    const interval = setInterval(fetchRequests, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const handleAccept = (id) => {
    // Simulate status update
    setAccessRequests((prev) => prev.filter((request) => request.id !== id));
    alert("Request Accepted! ✅");
  };

  const handleOpenDenyPopup = (request) => {
    setSelectedRequest(request);
    setShowDenyPopup(true);
  };

  const handleCloseDenyPopup = () => {
    setShowDenyPopup(false);
    setSelectedRequest(null);
    setDenyReason("");
  };

  const handleConfirmDeny = () => {
    if (!denyReason.trim()) {
      alert("Please provide a reason for denial.");
      return;
    }
    setAccessRequests((prev) =>
      prev.filter((request) => request.id !== selectedRequest.id)
    );
    alert(`Request Denied! ❌\nReason: ${denyReason}`);
    handleCloseDenyPopup();
  };

  const rooms = [
    { name: "Main Entrance", capacity: 20, current: 15 },
    { name: "Conference Room A", capacity: 10, current: 8 },
    { name: "Executive Room", capacity: 15, current: 10 },
    { name: "Lobby", capacity: 30, current: 25 },
    { name: "Cafeteria", capacity: 50, current: 40 },
  ];

  return (
    <div className="flex h-full bg-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />

        {/* Metrics Section */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
            <div className="text-blue-500 text-3xl">
              <FaUsers />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Total Users</h3>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-green-500 text-sm">+20 new users today</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
            <div className="text-green-500 text-3xl">
              <FaDoorOpen />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Active Rooms</h3>
              <p className="text-2xl font-bold">18 / 25</p>
              <p className="text-blue-500 text-sm">72% rooms in use</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
            <div className="text-yellow-500 text-3xl">
              <FaCheckCircle />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Access Attempts (24h)</h3>
              <p className="text-2xl font-bold">3,287</p>
              <p className="text-green-500 text-sm">94% success rate</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
            <div className="text-red-500 text-3xl">
              <FaExclamationTriangle />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Security Alerts</h3>
              <p className="text-2xl font-bold">6</p>
              <p className="text-red-500 text-sm">3 high priority</p>
            </div>
          </div>
        </div>

        {/* Access Requests Section */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Access Requests
          </h3>
          <DashboardRequests
            requests={accessRequests}
            onAccept={handleAccept}
            onDeny={handleOpenDenyPopup}
          />
        </div>

        {/* Room Occupancy Section */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Room Occupancy
          </h3>
          <ul>
            {rooms.map((room, index) => {
              const occupancyPercentage = Math.round(
                (room.current / room.capacity) * 100
              );
              return (
                <li
                  key={index}
                  className="mb-4 bg-gray-100 p-4 rounded-lg shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-gray-800 font-bold">{room.name}</h4>
                    <p className="text-sm text-gray-500">
                      {occupancyPercentage}% occupied ({room.current}/
                      {room.capacity})
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Deny Popup */}
        {showDenyPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Deny Access
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Provide a reason for denying access to{" "}
                <b>{selectedRequest.name}</b>.
              </p>
              <textarea
                className="w-full p-2 border rounded-lg mb-4"
                rows="3"
                placeholder="Enter reason..."
                value={denyReason}
                onChange={(e) => setDenyReason(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleCloseDenyPopup}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDeny}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Deny
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
