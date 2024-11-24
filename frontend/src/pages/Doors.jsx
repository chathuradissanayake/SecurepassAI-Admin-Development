import axios from 'axios';
import React, { useEffect, useState } from "react";
import DoorSection from "../components/DoorSection";
import Header from "../components/Header";
import RecentAccessDoors from "../components/RecentAccessDoors";
import Sidebar from "../components/Sidebar";

const Doors = () => {
  const [doors, setDoors] = useState([]);
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

    fetchDoors();
  }, []);

  const accessRecords = [];

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />

        {/*Doors */}
        <div className="p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">
                Door Management
              </h2>
          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <DoorSection doors={doors} setDoors={setDoors} />
          </div>

          {/* Recent Access Records */}
          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <RecentAccessDoors accessRecords={accessRecords} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doors;
