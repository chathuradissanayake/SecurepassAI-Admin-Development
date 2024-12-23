import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UPDoorAccess = ({ accessRecords, userId, onAccessUpdate }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [records, setRecords] = useState(accessRecords);
  const navigate = useNavigate();

  useEffect(() => {
    setRecords(accessRecords);
  }, [accessRecords]);

  // Calculate total pages
  const totalPages = Math.ceil(records.length / itemsPerPage);

  // Get the current page data
  const currentRecords = records.slice(
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

  // Handler for removing a record
  const handleRemovePermission = async (indexToRemove, doorAccessId) => {
    try {
      await axios.delete(`/api/users/${userId}/doorAccess/${doorAccessId}`, { withCredentials: true });
      const updatedRecords = records.filter((_, index) => index !== indexToRemove);
      setRecords(updatedRecords);

      // Adjust current page if it goes out of range after removal
      if (updatedRecords.length > 0 && currentPage >= Math.ceil(updatedRecords.length / itemsPerPage)) {
        setCurrentPage(currentPage - 1);
      }

      // Trigger the state update in the UserProfile component
      onAccessUpdate();
    } catch (error) {
      console.error('Error removing door access:', error);
    }
  };

  return (
    <div className="p-4 border dark:border-none rounded-lg shadow-sm bg-white dark:bg-slate-600">
      <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-100">Permissioned Doors</h2>

      {/* Table */}
      <div className="overflow-x-auto dark:bg-slate-700">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
              <th className="p-3 border border-gray-300 dark:border-slate-400">Door Code</th>
              <th className="p-3 border border-gray-300 dark:border-slate-400">Room Name</th>
              <th className="p-3 border border-gray-300 dark:border-slate-400">Location</th>
              <th className="p-3 border border-gray-300 dark:border-slate-400">Date</th>
              <th className="p-3 border border-gray-300 dark:border-slate-400">Entry Time</th>
              <th className="p-3 border border-gray-300 dark:border-slate-400">Exit Time</th>
              <th className="p-3 border text-center border-gray-300 dark:border-slate-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((record, index) => (
              <tr key={index} className="hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
                <td className="p-2 border border-gray-200 dark:border-slate-500">{record.door?.doorCode || 'N/A'}</td>
                <td className="p-2 border border-gray-200 dark:border-slate-500">
                  <button
                    onClick={() => navigate(`/doors/${record.door?._id}`)}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {record.door?.roomName || 'N/A'}
                  </button>
                </td>
                <td className="p-2 border border-gray-200 dark:border-slate-500">{record.door?.location || 'N/A'}</td>
                <td className="p-2 border border-gray-200 dark:border-slate-500">{new Date(record.date).toLocaleDateString('en-CA')}</td>
                <td className="p-2 border border-gray-200 dark:border-slate-500">{record.inTime}</td>
                <td className="p-2 border border-gray-200 dark:border-slate-500">{record.outTime}</td>
                <td className="p-2 border text-center border-gray-200 dark:border-slate-500">
                  <button
                    onClick={() => handleRemovePermission(currentPage * itemsPerPage + index, record._id)}
                    className="bg-red-400 text-white py-1 px-3 rounded hover:bg-red-500 "
                  >
                    Remove Permission
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded ${
            currentPage === 0 ? 'bg-gray-200 text-gray-400 dark:bg-slate-500 cursor-not-allowed' : 'bg-blue-600 dark:bg-slate-800 text-white hover:bg-blue-700'
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
                currentPage === index ? 'bg-blue-700 dark:bg-slate-800 text-white' : 'bg-gray-200 dark:bg-slate-500 dark:text-gray-100 text-gray-600 hover:bg-gray-300'
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
            currentPage === totalPages - 1 ? 'bg-gray-200 text-gray-400 dark:bg-slate-500 cursor-not-allowed' : 'bg-blue-600 dark:bg-slate-800 text-white hover:bg-blue-700'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UPDoorAccess;