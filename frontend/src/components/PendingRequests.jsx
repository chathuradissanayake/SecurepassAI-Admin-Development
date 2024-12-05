import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get('/api/permission-requests/pending-requests'); // Adjust the endpoint based on your backend setup
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    fetchPendingRequests();
  }, []);

  return (
    <div>
      {requests.length > 0 ? (
        <ul>
        
          {requests.map((request) => (
            <div
              key={request._id}
              className=" items-center mb-4 bg-gray-100 p-3 rounded-lg"
            >
              <h2 className="text-lg font-semibold text-gray-700">
                {request.name}
              </h2>
              <p>
                <strong>Location:</strong> {request.roomName}
              </p>
              
              <p>
                <strong>Message:</strong> {request.message}
              </p>
              <p>
                <strong>Request Time:</strong>{' '}
                {new Date(request.requestTime).toLocaleString()}
              </p>
              <p className="text-yellow-500 font-bold mt-2">{request.status}</p>
            </div>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No pending requests found.</p>
      )}
    </div>
  );
};

export default PendingRequests;
