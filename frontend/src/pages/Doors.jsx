import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Doors = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Doors</h1>
        <p>Welcome to the Doors page.</p>
      </div>
    </div>
  );
};

export default Doors;