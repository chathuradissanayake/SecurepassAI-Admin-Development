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


  const downloadQRCode = () => {
    if (!door || !door.qrImage) {
      alert('No QR Code available to download.');
      return;
    }

    const link = document.createElement('a');
    link.href = door.qrImage; // Base64 string
    link.download = `${door.doorCode}_${door.roomName}_${door.location}_QR.png`; // Name of the downloaded file
    link.click();
  };
  
  const handleDeleteDoor = async () => {
    try {
      await axios.delete(`/api/doors/${id}`, { withCredentials: true });
      navigate('/doors'); // Redirect to the doors list page after deletion
    } catch (err) {
      console.error('Error deleting door:', err);
      setError(err.message);
    }
  };

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
        <div className='flex justify-between p-6 '>
        <h1 className="text-xl font-semibold text-gray-800">Door Details</h1>
        <div className=" ">
              <button
                onClick={() => navigate(-1)}
                className="bg-slate-600 text-white py-2 px-8 rounded hover:bg-slate-700">
                Back
              </button>
        </div>   
        </div>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Door Details */}
            <div className="flex-1">
              
              <p className="text-gray-600 text-4xl mb-5">
                <strong>Door Code:</strong> {door.doorCode}
                <span
                className={`px-3 py-2 ml-8 rounded text-lg ${
                  door.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {door.status}
              </span>
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Door Name:</strong> {door.roomName}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Location:</strong> {door.location}
              </p>

              <select
                className="px-2 py-1 mt-4 text-slate-800 border rounded"
                value={door.status}
                onChange={async (e) => {
                  const newStatus = e.target.value;

                  try {
                    // Update the status in the backend
                    const response = await fetch(`/api/doors/${door._id}/status`, {
                      method: 'PUT',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ status: newStatus }),
                    });

                    if (response.ok) {
                      const updatedDoor = await response.json();

                      // Update the door state with the new status
                      setDoor((prevDoor) => ({
                        ...prevDoor,
                        status: updatedDoor.status,
                      }));
                    } else {
                      console.error('Failed to update status');
                    }
                  } catch (error) {
                    console.error('Error updating status:', error);
                  }
                }}
              >
                <option disabled>Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

            </div>
            
            
            {/* QR Code */}
            <div className='flex justify-between'>
              {door.qrImage ? (
                <div className="">
                  <img
                    src={door.qrImage}
                    alt={`QR Code for ${door.roomName}`}
                    className=" w-48 h-48 object-contain"
                  />
                </div>
              ) : (
                <p className="text-gray-500">No QR Code available.</p>
              )}



              <div>
                
                <div>       
                  <button
                      onClick={''}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2 w-40 ">
                      Print QR
                  </button>
                </div>
                <div> 
                  <button
                    type="button"
                    onClick={downloadQRCode}
                    
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-2 w-40">
                    Download QR
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleDeleteDoor}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mb-2 w-40">
                    Delete Door
                  </button>
                </div>
                </div>
            </div>
          </div>
          
        </div>

        {/* Approved Permission Requests */}
        <div className="bg-white rounded-lg shadow p-6">
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
                    <td className="p-2 border">
                      {request.user.firstName} {request.user.lastName}
                    </td>
                    <td className="p-2 border">
                      {new Date(request.date).toLocaleDateString('en-CA')}
                    </td>
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
    </div>
  );
};

export default DoorDetails;
