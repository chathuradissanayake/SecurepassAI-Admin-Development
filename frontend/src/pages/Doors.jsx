import axios from 'axios';
import React, { useEffect, useState } from "react";
import DoorSection from "../components/DoorSection";
import Header from "../components/Header";
import RecentAccessDoors from "../components/RecentAccessDoors";
import Sidebar from "../components/Sidebar";

const Doors = () => {
  const [doors, setDoors] = useState([]);
  const [accessRecords, setAccessRecords] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDoors = async () => {
      try {
        const response = await axios.get("/api/doors", {
          withCredentials: true,
        });
        setDoors(response.data);
      } catch (error) {
        console.error("Error fetching doors:", error);
      }
    };

    const fetchRecentAccess = async () => {
      try {
        const response = await axios.get("/api/history/recent-access", {
          withCredentials: true,
        });
        setAccessRecords(response.data);
      } catch (error) {
        console.error("Error fetching recent access records:", error);
      }
    };

    fetchDoors();
    fetchRecentAccess();
  }, []);

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1">
        <Header />

        {/* Doors */}
        <div className="p-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
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