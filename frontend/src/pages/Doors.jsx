import axios from 'axios';
import React, { useEffect, useState } from "react";
import DoorSection from "../components/DoorSection";
import Header from "../components/Header";
import RecentAccessDoors from "../components/RecentAccessDoors";
import Sidebar from "../components/Sidebar";
import Spinner from '../components/Spinner';

const Doors = () => {
  const [doors, setDoors] = useState([]);
  const [accessRecords, setAccessRecords] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoors = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("/api/doors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setDoors(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching doors:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchRecentAccess = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("/api/history/recent-access", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setAccessRecords(response.data);
      } catch (error) {
        console.error("Error fetching recent access records:", error);
        setError(error.message);
      }
    };

    fetchDoors();
    fetchRecentAccess();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex h-full dark:bg-slate-700">
      <Sidebar />
      <div className="flex-1">
        <Header />

        {/* Doors */}
        <div className="p-6 space-y-4 ">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Door Management
          </h2>
          
            <DoorSection doors={doors} setDoors={setDoors} />
          

          {/* Recent Access Records */}
          
            <RecentAccessDoors accessRecords={accessRecords} />
          
        </div>
      </div>
    </div>
  );
};

export default Doors;