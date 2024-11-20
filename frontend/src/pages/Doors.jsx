import React from 'react';
import DoorSection from '../components/DoorSection';
import Header from '../components/Header';
import RecentAccessDoors from '../components/RecentAccessDoors';
import Sidebar from '../components/Sidebar';

const Doors = () => {
  
  const doors = [
    { doorId: 'D1', roomName: 'Main Entrance', status: 'Active' },
    { doorId: 'D2', roomName: 'Data Vault', status: 'Inactive' },
    { doorId: 'D3', roomName: 'Executive Room', status: 'Active' },
    { doorId: 'D4', roomName: 'CCTV Room', status: 'Inactive' },
    { doorId: 'D5', roomName: 'Server Room', status: 'Inactive' },
    { doorId: 'D6', roomName: 'Security Hub', status: 'Active' },
    { doorId: 'D7', roomName: 'Lobby Entrance', status: 'Active' },
    { doorId: 'D8', roomName: 'Storage Room', status: 'Inactive' },
    { doorId: 'D9', roomName: 'Meeting Room', status: 'Active' },
    { doorId: 'D10', rooNname: 'Operations Room', status: 'Inactive' },
  ];
  const accessRecords = [
    { doorId: 'ME02', roomName: 'Main Entrance', user: 'Christine Brooks', time: '2 minutes ago', status: 'Access Granted' },
    { doorId: 'SE02', roomName: 'Security Hub', user: 'Rosie Pearson', time: '10 minutes ago', status: 'Access Denied' },
    { doorId: 'ER02', roomName:'Executive Room', user: 'Darrell Caldwell', time: '1 hour ago', status: 'Access Granted' },
    { doorId: 'DV02', roomName:'Data Vault', user: 'John Doe', time: '2 hours ago', status: 'Access Denied' },
    { doorId: 'SR02', roomName:'Server Room', user: 'Jane Smith', time: '3 hours ago', status: 'Access Granted' },
    { doorId: 'CR02', roomName:'CCTV Room', user: 'Michael Johnson', time: '4 hours ago', status: 'Access Denied' },
    { doorId: 'LE02', roomName:'Lobby Entrance', user: 'Alice Williams', time: '5 hours ago', status: 'Access Granted' },
    { doorId: 'SR02', roomName:'Storage Room', user: 'Tom Brown', time: '6 hours ago', status: 'Access Denied' },
    { doorId: 'MR02', roomName:'Meeting Room', user: 'Eve Davis', time: '7 hours ago', status: 'Access Granted' },
    { doorId: 'OR02', roomName:'Operations Room', user: 'Mark Taylor', time: '8 hours ago', status: 'Access Denied' },
    { doorId: 'ME02', roomName:'Main Entrance', user: 'Linda Thompson', time: '1 day ago', status: 'Access Granted' },
  ];
  return (
    <div className="flex h-full">
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
                <option key={door.doorId}>{door.roomName}</option>
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