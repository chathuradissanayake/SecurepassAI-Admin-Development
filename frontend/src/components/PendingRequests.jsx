import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PendingRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get('/api/permission-requests/pending-requests');
        // Sort the requests by requestTime in descending order
        const sortedRequests = response.data.sort((a, b) => new Date(b.requestTime) - new Date(a.requestTime));
        setRequests(sortedRequests);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    fetchPendingRequests();
  }, []);

  return (
    <div>
      {requests.length > 0 ? (
        <div className="max-h-96 overflow-y-auto">
          <ul>
            {requests.map((request) => (
              <div
                key={request._id}
                className="items-center mb-4 bg-gray-50 p-3 rounded-lg"
              >
                <div className='flex justify-between'>
                  <h2 className="text-lg font-semibold text-gray-700">
                    {request.user.firstName} {request.user.lastName} ({request.user.userId})
                  </h2>
                  <p className="text-yellow-500 font-bold mt-2">{request.status}</p>
                </div>
                <p>
                  <strong>Door:</strong> {request.door.doorCode} - {request.door.roomName}
                </p>
                <p>
                  <strong>Location:</strong> {request.door.location}
                </p>
                <p>
                  <strong>Message:</strong> {request.message}
                </p>
                <p>
                  <strong>Requested Time:</strong>{' '}
                  {new Date(request.requestTime).toLocaleString()}
                </p>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-gray-600">No pending requests found.</p>
      )}
    </div>
  );
};

export default PendingRequests;