import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoorSection = ({ doors, setDoors }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const itemsPerPage = 6;
  const navigate = useNavigate();

  // Filter doors based on the search query
  const filteredDoors = doors.filter((door) =>
    door.roomName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    door.doorCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total pages after filtering
  const totalPages = Math.ceil(filteredDoors.length / itemsPerPage);

  // Get the current page doors
  const currentDoors = filteredDoors.slice(
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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); // Reset to the first page when searching
  };

  return (
    <div>
      {/* Search and Add Button */}
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold">Doors</h2>
      <div className=''>
      <input
          type="text"
          placeholder="Search by Room Name or Door Code"
          value={searchQuery}
          onChange={handleSearch}
          className="border px-4 py-2 rounded mr-2"
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate('/create-door')}
        >
          Add new Door
        </button>


      </div>
       
      </div>

      {/* Door List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentDoors.map((door) => (
          <div key={door._id} className="p-4 border rounded-lg shadow-sm bg-white">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{door.roomName}</h3>
              <h3 className="text-lg font-semibold">{door.doorCode}</h3>
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
            </div>
          </div>
        ))}
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

        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index)}
              className={`px-3 py-1 rounded ${
                index === currentPage ? 'bg-blue-700 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
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

      {/* No Results Message */}
      {filteredDoors.length === 0 && (
        <div className="mt-4 text-center text-gray-500">
          No doors found matching your search.
        </div>
      )}
    </div>
  );
};

export default DoorSection;
