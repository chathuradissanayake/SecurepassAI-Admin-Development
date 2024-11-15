import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Profile = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p>Welcome to the Profile page.</p>
      </div>
    </div>
  );
};

export default Profile;