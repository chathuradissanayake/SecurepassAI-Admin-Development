import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaDoorOpen, FaExclamationTriangle, FaUsers } from "react-icons/fa";

const CollectionCounts = () => {
  const [doorsCount, setDoorsCount] = useState(null);
  const [usersCount, setUsersCount] = useState(null);
  const [historiesCount, setHistoriesCount] = useState(null);
  const [todayCount, setTodayCount] = useState(null);

  // Helper function to get today's date in "YYYY-MM-DD" format
  const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  // Fetch counts for collections: doors, users, histories
  useEffect(() => {
    const fetchCollectionsCount = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/collections/counts");
        const data = await response.json();

        const doorsCollection = data.find((collection) => collection.name === "doors");
        const usersCollection = data.find((collection) => collection.name === "users");
        const historiesCollection = data.find((collection) => collection.name === "histories");

        setDoorsCount(doorsCollection ? doorsCollection.count : 0);
        setUsersCount(usersCollection ? usersCollection.count : 0);
        setHistoriesCount(historiesCollection ? historiesCollection.count : 0);
      } catch (error) {
        console.error("Error fetching collection counts:", error);
      }
    };

    fetchCollectionsCount();
  }, []);

  // Fetch today's access attempts count
  useEffect(() => {
    const fetchTodayCount = async () => {
      try {
        const todayDate = getTodayDate();
        const response = await fetch(
          `http://localhost:5000/api/collections/history?entryTime=${todayDate}`
        );
        const data = await response.json();
        setTodayCount(data.count || 0);
      } catch (error) {
        console.error("Error fetching today's histories count:", error);
      }
    };

    fetchTodayCount();
  }, []);

  return (
    <div>
      {/* Metrics Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users Card */}
        <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
          <div className="text-blue-500 text-3xl">
            <FaUsers />
          </div>
          <div>
            <h3 className="text-gray-600 text-sm">Total Users</h3>
            <p className="text-2xl font-bold">
              {usersCount !== null ? usersCount : "Loading..."}
            </p>
            <p className="text-green-500 text-sm">+20 new users today</p>
          </div>
        </div>

        {/* Active Doors Card */}
        <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
          <div className="text-green-500 text-3xl">
            <FaDoorOpen />
          </div>
          <div>
            <h3 className="text-gray-600 text-sm">Active Doors</h3>
            <p className="text-2xl font-bold">
              {doorsCount !== null ? doorsCount : "Loading..."}
            </p>
            <p className="text-blue-500 text-sm">72% rooms in use</p>
          </div>
        </div>

        {/* Access Attempts Card */}
        <div className="p-4 bg-white rounded-lg shadow-md flex items-center gap-4">
          <div className="text-yellow-500 text-3xl">
            <FaCheckCircle />
          </div>
          <div>
            <h3 className="text-gray-600 text-sm">Access Attempts (24h)</h3>
            <p className="text-2xl font-bold">
              {todayCount !== null ? todayCount : "Loading..."}
            </p>
            <p className="text-green-500 text-sm">
              {historiesCount !== null ? historiesCount : "Loading..."} of total Attempts
            </p>
          </div>
        </div>

        {/* Security Alerts Card */}
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
    </div>
  );
};

export default CollectionCounts;
