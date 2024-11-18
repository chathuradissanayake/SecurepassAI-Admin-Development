import React, {useEffect, useState} from "react";
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import UPDoorAccess from "../components/UPDoorAccess";
import UPHistory from "../components/UPHistory";
import UPPermissionRequests from "../components/UPPermissionRequests";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserProfile = () => {

  const {id} = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(`Fetching user with id: ${id}`);
        const response = await axios.get(`/api/users/${id}`, { withCredentials: true });
        console.log('API response:', response.data);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const accessRecords = [
    { doorCode: 'D1', doorName: 'Main Entrance', entryTime: '08:00', exitTime: '18:00' },
    { doorCode: 'D2', doorName: 'Security Hub', entryTime: '09:00', exitTime: '17:00' },
    { doorCode: 'D3', doorName: 'Office Area', entryTime: '10:00', exitTime: '16:00' },
    { doorCode: 'D4', doorName: 'Server Room', entryTime: '11:00', exitTime: '15:00' },
    { doorCode: 'D1', doorName: 'Main Entrance', entryTime: '08:00', exitTime: '18:00' },
    { doorCode: 'D2', doorName: 'Security Hub', entryTime: '09:00', exitTime: '17:00' },
    { doorCode: 'D3', doorName: 'Office Area', entryTime: '10:00', exitTime: '16:00' },
    { doorCode: 'D4', doorName: 'Server Room', entryTime: '11:00', exitTime: '15:00' },
    { doorCode: 'D1', doorName: 'Main Entrance', entryTime: '08:00', exitTime: '18:00' },
    { doorCode: 'D2', doorName: 'Security Hub', entryTime: '09:00', exitTime: '17:00' },
    { doorCode: 'D3', doorName: 'Office Area', entryTime: '10:00', exitTime: '16:00' },
    { doorCode: 'D4', doorName: 'Server Room', entryTime: '11:00', exitTime: '15:00' },
  ];

  const pendingRequests = [
    { doorCode: 'D3', doorName: 'Office Area', entryTime: '10:00', exitTime: '16:00' },
    { doorCode: 'D4', doorName: 'Server Room', entryTime: '11:00', exitTime: '15:00' },
  ];

  const historyRecords = [
    {
      doorCode: 'D1',
      doorName: 'Main Entrance',
      entryTime: '2023-04-10 14:30:00',
      exitTime: '2023-04-10 16:45:00',
    },
    {
      doorCode: 'D2',
      doorName: 'Security Hub',
      entryTime: '2023-04-11 09:15:00',
      exitTime: null, // Ongoing access
    },
    {
      doorCode: 'D3',
      doorName: 'Office Area',
      entryTime: '2023-04-12 11:00:00',
      exitTime: '2023-04-12 11:02:00',
    },
  ];


  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />
        <h1 className="text-2xl font-bold my-5">User Profile</h1>
        

        <div className="bg-white rounded-lg shadow p-6 mb-6">
  <div className="flex items-center justify-between">
    {/* User Profile and Details */}
    <div className="flex items-center">
      <img
        src="https://via.placeholder.com/150"
        alt="User Profile"
        className="w-30 h-30 rounded-full"
      />
      <div className="ml-4">
        <h2 className="text-xl font-semibold mb-3">User Details</h2>
        <p className="text-gray-600 mb-2">User ID: {user.userId}</p>
        <p className="text-gray-600 mb-2">Name: {user.firstName} {user.lastName}</p>
        <p className="text-gray-600">Email: {user.email}</p>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col gap-2">
      <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Edit User
      </button>
      <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
        Delete User
      </button>
    </div>
  </div>
</div>



      {/* Pending Door Permission Requests */}
      <UPPermissionRequests pendingRequests={pendingRequests}/>

      {/* Door Access Table */}
      <UPDoorAccess accessRecords={accessRecords}/>

      {/* Door Access History */}
      <UPHistory historyRecords={historyRecords}/>
      
      </div>
    </div>
  );
};

export default UserProfile;
