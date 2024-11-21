import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-4">The page you are looking for does not exist.</p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;