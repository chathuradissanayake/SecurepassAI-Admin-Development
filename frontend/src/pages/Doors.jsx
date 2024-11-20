import React, { useState, useEffect } from "react";
import axios from 'axios';
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
          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <DoorSection doors={doors} setDoors={setDoors} />
          </div>

          {/*QR Code Management */}
          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <h2 className="text-lg font-semibold mb-4">QR Code Management</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium">
                  Door Location
                </label>
                <select className="w-full p-2 border rounded">
                  <option>Select a door</option>
                  {doors.map((door) => (
                    <option key={door._id}>{door.doorName}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block mb-2 text-sm font-medium">
                  QR Code Status
                </label>
                <select className="w-full p-2 border rounded">
                  <option>Select a status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div className="flex items-end gap-4">
                <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
                  QR Code Log
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Generate QR Code
                </button>
              </div>
            </div>
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
