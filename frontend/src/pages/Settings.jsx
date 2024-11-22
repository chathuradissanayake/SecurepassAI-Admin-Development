import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const Settings = () => {
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');

  const handleToggle = () => {
    setIsTwoFactorEnabled(!isTwoFactorEnabled);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
      // Implement password change logic here
      console.log('Two-factor authentication:', isTwoFactorEnabled);
      console.log('Passwords:', passwords);
    }
  };

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />
        
            {/* Two-Factor Authentication */}
            <div className="p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Two-factor Authentication
              </h2>
              <div className="flex items-center mt-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isTwoFactorEnabled}
                    onChange={handleToggle}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
                <span className="ml-3 text-sm text-gray-700">
                  Enable or disable two-factor authentication
                </span>
              </div>
            </div>

            {/* Change Password */}
            <div className="px-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
              <div className="mt-4">
                <label
                  htmlFor="currentPassword"
                  className="block text-gray-600 font-medium"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handleChange}
                  className="w-1/2 mt-2 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="********"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="newPassword"
                  className="block text-gray-600 font-medium"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  className="w-1/2 mt-2 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="********"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-600 font-medium"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  className="w-1/2 mt-2 px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="********"
                />
              </div>
              {passwordError && <p className="text-red-600 mt-2">{passwordError}</p>}
            </div>

            {/* Save Button */}
            <div className="p-6 space-y-6">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      
  );
};

export default Settings;