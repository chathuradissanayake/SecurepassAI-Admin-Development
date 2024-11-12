import React from 'react';
import DoorSection from '../components/DoorSection';
import Header from '../components/Header';
import RecentAccessDoors from '../components/RecentAccessDoors';
import Sidebar from '../components/Sidebar';

const Doors = () => {
  
  const doors = [
    { id: 'D1', name: 'Main Entrance', status: 'Active' },
    { id: 'D2', name: 'Data Vault', status: 'Inactive' },
    { id: 'D3', name: 'Executive Room', status: 'Active' },
    { id: 'D4', name: 'CCTV Room', status: 'Inactive' },
    { id: 'D5', name: 'Server Room', status: 'Inactive' },
    { id: 'D6', name: 'Security Hub', status: 'Active' },
    { id: 'D7', name: 'Lobby Entrance', status: 'Active' },
    { id: 'D8', name: 'Storage Room', status: 'Inactive' },
    { id: 'D9', name: 'Meeting Room', status: 'Active' },
    { id: 'D10', name: 'Operations Room', status: 'Inactive' },
  ];
  const accessRecords = [
    { door: 'Main Entrance', user: 'Christine Brooks', time: '2 minutes ago', status: 'Access Granted' },
    { door: 'Security Hub', user: 'Rosie Pearson', time: '10 minutes ago', status: 'Access Denied' },
    { door: 'Executive Room', user: 'Darrell Caldwell', time: '1 hour ago', status: 'Access Granted' },
    { door: 'Data Vault', user: 'John Doe', time: '2 hours ago', status: 'Access Denied' },
    { door: 'Server Room', user: 'Jane Smith', time: '3 hours ago', status: 'Access Granted' },
    { door: 'CCTV Room', user: 'Michael Johnson', time: '4 hours ago', status: 'Access Denied' },
    { door: 'Lobby Entrance', user: 'Alice Williams', time: '5 hours ago', status: 'Access Granted' },
    { door: 'Storage Room', user: 'Tom Brown', time: '6 hours ago', status: 'Access Denied' },
    { door: 'Meeting Room', user: 'Eve Davis', time: '7 hours ago', status: 'Access Granted' },
    { door: 'Operations Room', user: 'Mark Taylor', time: '8 hours ago', status: 'Access Denied' },
    { door: 'Main Entrance', user: 'Linda Thompson', time: '1 day ago', status: 'Access Granted' },
  ];
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
      <Header />
        

      {/*Doors */}
      <div className="p-6 space-y-6">
        <div className="p-4 border rounded-lg shadow-sm bg-white">
            <DoorSection doors={doors} />
        </div>



      {/*QR Code Management */}
      <div className="p-4 border rounded-lg shadow-sm bg-white">
        <h2 className="text-lg font-semibold mb-4">QR Code Management</h2>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium">Door Location</label>
            <select className="w-full p-2 border rounded">
              <option>Select a door</option>
              {doors.map((door) => (
                <option key={door.id}>{door.name}</option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium">QR Code Status</label>
            <select className="w-full p-2 border rounded">
              <option>Select a status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="flex items-end gap-4">
            <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">QR Code Log</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Generate QR Code</button>
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