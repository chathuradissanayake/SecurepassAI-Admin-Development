import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoorSection = ({ doors, setDoors }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  // Calculate total pages
  const totalPages = Math.ceil(doors.length / itemsPerPage);

  // Get the current page doors
  const currentDoors = doors.slice(
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

  return (
    <div>
      {/* Door List */}
      <div className='flex justify-between items-center mb-4'>
        <h2 className="text-lg font-semibold">Doors</h2>
        <button className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700' onClick={() => navigate('/create-door')}>Add new Door</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentDoors.map((door) => (
          <div key={door._id} className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{door.doorName}</h3>
              <span
                className={`px-2 py-1 rounded text-sm ${
                  door.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}
              >
                {door.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate(`/doors/${door._id}`)}
                className="text-blue-600 hover:underline"
              >
                View Details
              </button>
              <button className="text-blue-600 hover:underline">Regenerate</button>
              <select className=" px-2 py-1 border rounded">
                <option disabled>Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className={`px-4 py-2 rounded ${
            currentPage === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Previous
        </button>
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

export default DoorSection;