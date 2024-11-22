import axios from 'axios';
import React, { useState } from 'react';

const UPPermissionRequests = ({ pendingRequests, onRequestUpdate }) => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const [requests, setRequests] = useState(pendingRequests.filter(request => request.status === 'Pending'));
  const [selectedActions, setSelectedActions] = useState({});

  // Calculate total pages
  const totalPages = Math.ceil(requests.length / itemsPerPage);

  // Get the current page data
  const currentRequests = requests.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  // Handlers for pagination
  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  // Handler for selecting an action
  const handleSelectAction = (index, action) => {
    setSelectedActions((prevActions) => ({
      ...prevActions,
      [index]: action,
    }));
  };

  // Handler for confirming the action
  const handleConfirmAction = async (indexToConfirm) => {
    const action = selectedActions[indexToConfirm];
    const request = currentRequests[indexToConfirm];

    if (action) {
      try {
        if (action === 'Approve') {
          await axios.put(`/api/permission-requests/${request._id}/approve`);
        } else if (action === 'Reject') {
          await axios.put(`/api/permission-requests/${request._id}/reject`);
        }

        // Remove the request from the list
        const updatedRequests = requests.filter((_, index) => index !== indexToConfirm);
        setRequests(updatedRequests);

        // Adjust current page if it goes out of range after removal
        if (updatedRequests.length > 0 && currentPage >= Math.ceil(updatedRequests.length / itemsPerPage)) {
          setCurrentPage(currentPage - 1);
        }

        // Trigger the state update in the UserProfile component
        onRequestUpdate();
      } catch (error) {
        console.error('Error updating request:', error);
      }
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4">Permission Requests</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border w-1/6">Door ID</th>
              <th className="p-2 border w-1/5">Door Name</th>
              <th className="p-2 border w-1/5">Date</th>
              <th className="p-2 border w-1/6">Entry Time</th>
              <th className="p-2 border w-1/6">Exit Time</th>
              <th className="p-2 border text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((request, index) => {
              const date = new Date(request.date);
              const formattedDate = date.toLocaleDateString('en-CA'); // 'en-CA' locale formats date as yyyy-mm-dd
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{request.door.doorCode}</td>
                  <td className="p-2 border">{request.door.doorName}</td>
                  <td className="p-2 border">{formattedDate}</td>
                  <td className="p-2 border">{request.inTime}</td>
                  <td className="p-2 border">{request.outTime}</td>
                  <td className="p-2 border">
                    <div className="flex items-center gap-2">
                      {/* Action Dropdown */}
                      <select
                        value={selectedActions[currentPage * itemsPerPage + index] || ''}
                        onChange={(e) =>
                          handleSelectAction(currentPage * itemsPerPage + index, e.target.value)
                        }
                        className="px-2 py-1 border rounded bg-white"
                      >
                        <option value="">Select action</option>
                        <option value="Approve">Approve</option>
                        <option value="Reject">Reject</option>
                      </select>

                      {/* Confirm Button */}
                      <button
                        onClick={() => handleConfirmAction(currentPage * itemsPerPage + index)}
                        className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
                      >
                        Confirm
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded ${
            currentPage === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index)}
              className={`px-3 py-1 rounded ${
                currentPage === index ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages - 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UPPermissionRequests;