import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  FaUsers,
  FaDoorOpen,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const Dashboard = () => {
  // Dummy data for access requests
  const [accessRequests, setAccessRequests] = useState([
    {
      id: 1,
      name: "Mohamed Afraar",
      room: "Main Entrance",
      date: "2023-06-10",
      time: "14:30",
      status: "Pending",
    },
    {
      id: 2,
      name: "Yoosuf Aathil",
      room: "Conference Room A",
      date: "2023-06-11",
      time: "10:00",
      status: "Pending",
    },
    {
      id: 3,
      name: "Chathura",
      room: "Executive Room",
      date: "2023-06-12",
      time: "09:15",
      status: "Pending",
    },
  ]);

  const [showDenyPopup, setShowDenyPopup] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [denyReason, setDenyReason] = useState("");

  // Dummy data for room occupancy
  const rooms = [
    { name: "Main Entrance", capacity: 20, current: 15 },
    { name: "Conference Room A", capacity: 10, current: 8 },
    { name: "Executive Room", capacity: 15, current: 10 },
    { name: "Lobby", capacity: 30, current: 25 },
    { name: "Cafeteria", capacity: 50, current: 40 },
  ];

  const handleAccept = (id) => {
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
                    <p className="font-bold text-gray-800">{room.name}</p>
                    <p className="text-sm text-gray-500">
                      {room.current} / {room.capacity} occupants
                    </p>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full ${
                        occupancyPercentage > 75
                          ? "bg-red-500"
                          : occupancyPercentage > 50
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                      style={{ width: `${occupancyPercentage}%` }}
                    ></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Access Requests Section */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Access Requests
          </h3>
          {accessRequests.length > 0 ? (
            <ul>
              {accessRequests.map((request) => (
                <li
                  key={request.id}
                  className="flex justify-between items-center mb-4 bg-gray-100 p-4 rounded-lg"
                >
                  <div>
                    <p className="font-bold text-gray-800">{request.name}</p>
                    <p className="text-sm text-gray-500">
                      {request.room} - {request.date} {request.time}
                    </p>
                    <p className="text-sm text-gray-500">
                      Status: {request.status}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAccept(request.id)}
                      className="px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleOpenDenyPopup(request)}
                      className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    >
                      Deny
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No access requests at the moment.</p>
          )}
        </div>
      </div>

      {/* Deny Popup */}
      {showDenyPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Deny Access Request
            </h3>
            <p className="text-gray-600 mb-4">
              Provide a reason for denying access for{" "}
              <span className="font-bold">{selectedRequest?.name}</span> (
              {selectedRequest?.room}).
            </p>
            <textarea
              value={denyReason}
              onChange={(e) => setDenyReason(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              rows="4"
              placeholder="Enter your reason here..."
            ></textarea>
            <p> Provide a reason for denying the request:</p>
            <textarea
              value={denyReason}
              onChange={(e) => setDenyReason(e.target.value)}
              className="w-full h-20 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter denial reason here..."
            ></textarea>
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={handleCloseDenyPopup}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDeny}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
              >
                Confirm Deny
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
