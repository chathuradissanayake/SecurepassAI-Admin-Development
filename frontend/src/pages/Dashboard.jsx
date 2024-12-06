import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaDoorOpen,
  FaExclamationTriangle,
  FaUsers,
} from "react-icons/fa";
import CollectionCounts from "../components/CollectionCounts";
import Header from "../components/Header";
import Messages from "../components/Messages";
import PendingRequests from "../components/PendingRequests";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  
  const [doorsCount, setDoorsCount] = useState(null);
  const [usersCount, setUsersCount] = useState(null);
  const [historiesCount, setHistoriesCount] = useState(null);

  useEffect(() => {
    const fetchCollectionsCount = async () => {
      try {
        // Fetch data from backend
        const response = await fetch("/api/collections/counts");
        const data = await response.json();

        // Find the counts for doors and users collections
        const doorsCollection = data.find((collection) => collection.name === "doors");
        const usersCollection = data.find((collection) => collection.name === "users");
        const historiesCollection = data.find((collection) => collection.name === "histories");

        // Set the counts for doors and users collections
        setDoorsCount(doorsCollection ? doorsCollection.count : 0);
        setUsersCount(usersCollection ? usersCollection.count : 0);
        setHistoriesCount(historiesCollection ? historiesCollection.count : 0);
      } catch (error) {
        console.error("Error fetching collection counts:", error);
      }
    };

    fetchCollectionsCount();
  }, []);

  // Dummy data for room occupancy
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
              <p className="text-2xl font-bold">{usersCount !== null ? usersCount : "Loading..."}</p>
              <p className="text-green-500 text-sm">+20 new users today</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
            <div className="text-green-500 text-3xl">
              <FaDoorOpen />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Active Doors</h3>
              <p className="text-2xl font-bold">{doorsCount !== null ? doorsCount : "Loading..."}</p>
              <p className="text-blue-500 text-sm">72% rooms in use</p>
            </div>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
            <div className="text-yellow-500 text-3xl">
              <FaCheckCircle />
            </div>
            <div>
              <h3 className="text-gray-600 text-sm">Access Attempts (24h)</h3>
              <p className="text-2xl font-bold">{historiesCount !== null ? historiesCount : "Loading..."}</p>
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
<div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
  <div className="p-6 bg-white border rounded-lg shadow-md">
    <h3 className="text-gray-600 text-lg mb-4">Pending Requests</h3>
    <PendingRequests/>

  </div>

  

  {/* Messages */}
  <div className="p-6 bg-white border rounded-lg shadow-md">
    <h3 className="text-gray-600 text-lg mb-4">Messages</h3>
    
      <Messages/>
    
  </div>
</div>
<div>
  <CollectionCounts/>
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


        
      </div>   
      </div>
         
  );
};

export default Dashboard;
