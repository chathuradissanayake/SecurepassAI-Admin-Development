import axios from "axios";
import React, { useState, useEffect } from "react";

const DashboardRequest = () => {
  const itemsPerPage = 5;
  const [allRequests, setAllRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch all requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/api/permission-requests");
        setAllRequests(response.data);
      } catch (error) {
        console.error("Error fetching all requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(allRequests.length / itemsPerPage);

  // Get the current page data
  const currentRequests = allRequests.slice(
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

  return (
    <div className="p-4 bg-white rounded-lg shadow-sm mb-6">
      <h2 className="text-xl font-semibold mb-4">All Permission Requests</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border w-1/6">User Name</th>
              <th className="p-2 border w-1/6">Door ID</th>
              <th className="p-2 border w-1/5">Room Name</th>
              <th className="p-2 border w-1/5">Date</th>
              <th className="p-2 border w-1/6">Entry Time</th>
              <th className="p-2 border w-1/6">Exit Time</th>
              <th className="p-2 border w-1/6">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRequests.map((request, index) => {
              const date = new Date(request.date);
              const formattedDate = date.toLocaleDateString("en-CA");
              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-2 border">{request.user.name}</td>
                  <td className="p-2 border">{request.door.doorCode}</td>
                  <td className="p-2 border">{request.door.roomName}</td>
                  <td className="p-2 border">{formattedDate}</td>
                  <td className="p-2 border">{request.inTime}</td>
                  <td className="p-2 border">{request.outTime}</td>
                  <td
                    className={`p-2 border text-${
                      request.status === "Pending"
                        ? "yellow-500"
                        : request.status === "Approved"
                        ? "green-500"
                        : "red-500"
                    }`}
                  >
                    {request.status}
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
            currentPage === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
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
                currentPage === index
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-100"
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
            currentPage === totalPages - 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DashboardRequest;
