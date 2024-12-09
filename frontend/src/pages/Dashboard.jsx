import React from "react";
import CollectionCounts from "../components/CollectionCounts";
import Header from "../components/Header";
import Messages from "../components/Messages";
import PendingRequests from "../components/PendingRequests";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  
  

  // // Dummy data for room occupancy
  // const rooms = [
  //   { name: "Main Entrance", capacity: 20, current: 15 },
  //   { name: "Conference Room A", capacity: 10, current: 8 },
  //   { name: "Executive Room", capacity: 15, current: 10 },
  //   { name: "Lobby", capacity: 30, current: 25 },
  //   { name: "Cafeteria", capacity: 50, current: 40 },
  // ];





  const rooms = [
    { name: "Main Entrance", capacity: 20, current: 19 },
    { name: "Conference Room A", capacity: 10, current: 8 },
    { name: "Executive Room", capacity: 15, current: 10 },
    { name: "Lobby", capacity: 30, current: 28 },
    { name: "Cafeteria", capacity: 50, current: 40 },
  ];

  return (
    <div className="flex h-full bg-white">
      <Sidebar />
      <div className="flex-1 p-6">
        <Header />

      {/* Collection Counts Section */}
      <div>
        <CollectionCounts/>
      </div>      

      {/* Access Requests Section */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 bg-white border rounded-lg shadow-md">
          <h3 className="text-gray-600 text-lg mb-4">Pending Requests</h3>
          <PendingRequests/>

      </div>

        

        {/* Messages */}
        <div className="p-6 bg-white border rounded-lg shadow-md">
          
          
            <Messages/>
          
        </div>
      </div>


      {/* Room Occupancy Section */}
      {/* <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
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
                  className="mb-4 bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-blue-800 font-bold text-lg">
                      {room.name}
                    </h4>
                    <p className="text-sm text-blue-600 font-medium">
                      {occupancyPercentage}% occupied ({room.current}/
                      {room.capacity})
                    </p>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        occupancyPercentage > 90 ? "bg-red-500" : "bg-blue-500"
                      }`}
                      style={{ width: `${occupancyPercentage}%` }}
                    ></div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div> */}


        
      </div>   
      </div>
         
  );
};

export default Dashboard;
