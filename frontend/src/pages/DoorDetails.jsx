import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';

const DoorDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [door, setDoor] = useState(null);
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoor = async () => {
      try {
        console.log(`Fetching door with id: ${id}`);
        const response = await axios.get(`/api/doors/${id}`, { withCredentials: true });
        console.log('API response:', response.data);
        setDoor(response.data.door);
        setApprovedRequests(response.data.approvedRequests);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching door:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoor();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />
        <h1 className="text-2xl font-bold my-5">Door Details</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            {/* Door Details */}
            <div className="flex items-center">
              <div className="ml-4">
                <h2 className="text-xl font-semibold mb-3">Door Details</h2>
                <p className="text-gray-600 mb-2"><strong>Door Code:</strong> {door.doorCode}</p>
                <p className="text-gray-600 mb-2"><strong>Door Name:</strong> {door.roomName}</p>
                <p className="text-gray-600 mb-2"><strong>location:</strong> {door.location}</p>
                <h3 className="text-lg font-semibold mb-3">Approved Permission Requests</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-2 border">User Name</th>
                        <th className="p-2 border">Date</th>
                        <th className="p-2 border">In Time</th>
                        <th className="p-2 border">Out Time</th>
                        <th className="p-2 border">Message</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedRequests.map((request) => (
                        <tr key={request._id} className="hover:bg-gray-50">
                          <td className="p-2 border">{request.user.firstName} {request.user.lastName}</td>
                          <td className="p-2 border">{new Date(request.date).toLocaleDateString('en-CA')}</td>
                          <td className="p-2 border">{request.inTime}</td>
                          <td className="p-2 border">{request.outTime}</td>
                          <td className="p-2 border">{request.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate(-1)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoorDetails;