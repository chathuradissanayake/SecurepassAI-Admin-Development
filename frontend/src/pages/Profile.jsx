import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import avatar from '../assets/avatar.png'

const Profile = () => {
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Smith",
    email: "johnsmith@gmail.com",
    password: "********"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Saved profile:", profile);
  };


  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        {/* Profile Image and Edit Button */}
        <div className="flex items-center mb-8">
          <div className="relative">
            <img
              src={avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          
          </div>
        </div>

        {/* Profile Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div>
            <label className="block text-gray-600 font-medium">First Name</label>
            <input
              type="text"
              name="name"
              value={profile.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />

            <label className="block text-gray-600 font-medium mt-4">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Right Column */}
          <div>
            <label className="block text-gray-600 font-medium">Last Name</label>
            <input
              type="text"
              name="username"
              value={profile.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />

            <label className="block text-gray-600 font-medium mt-4">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />          
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Profile;