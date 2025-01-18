import axios from 'axios';
import React, { useState } from 'react';
import { GoChevronRight } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../../context/ThemeContext";
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
  const [successMessage, setSuccessMessage] = useState('');
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsTwoFactorEnabled(!isTwoFactorEnabled);
  };

  const handleSelectTheme = (selectedTheme) => {
    if (theme !== selectedTheme) {
      toggleTheme(); // Switch the theme if it's different
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          '/api/admin/change-password',
          {
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSuccessMessage('Password changed successfully');
      } catch (err) {
        setPasswordError('Failed to change password');
      }
    }
  };

  


  return (
    <div className="flex h-full dark:bg-slate-700">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-6 space-y-4 ">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            Settings
          </h2>

        
      

       
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
        

        <div>
        <div className="p-4 bg-slate-100 dark:bg-slate-600 rounded-lg shadow">
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
              Settings Panal
            </h3>

            <nav class="flex min-w-[240px] flex-col gap-1 p-1.5 dark:text-slate-100">
            <div
                role="button"
                onClick={() => navigate('/language')}
                class="text-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-between">
                Language
                <GoChevronRight className='text-gray-500'/>
            </div>
            <hr className='mx-3 border-t-1 border-slate-500 '></hr>

          

            <div
                role="button"
                onClick={() => navigate('/app-info')}
                class="text-slate-800 dark:text-slate-100 dark:hover:bg-slate-700  flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-between">   
                App Information
                <GoChevronRight className='text-gray-500'/>
            </div>
            <hr className='mx-3 border-t-1 border-slate-500 '></hr>


            <div
                role="button"
                onClick={() => navigate('/contactus')}
                class="text-slate-800 dark:text-slate-100 dark:hover:bg-slate-700  flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-between">
                Customer Care
                <GoChevronRight className='text-gray-500'/>
            </div>
            <hr className='mx-3 border-t-1 border-slate-500 '></hr>

            <div
                role="button"
                onClick={() => navigate('/aboutus')}
                class="text-slate-800 dark:text-slate-100 dark:hover:bg-slate-700  flex w-full items-center rounded-md p-3 transition-all hover:bg-slate-100 focus:bg-slate-100 active:bg-slate-100 justify-between">
                About us
                <GoChevronRight className='text-gray-500'/>
            </div>
            <hr className='mx-3 border-t-1 border-slate-500 '></hr>
        </nav>
        </div>




        <div className="p-4 bg-slate-100 dark:bg-slate-600 rounded-lg shadow mt-4">




        </div>
        </div>

        {/* Right Column: Change Password */}
        <div>
        <div className="p-4 bg-slate-100 dark:bg-slate-600 rounded-lg shadow">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
              Change Password
            </h3>
          <div className="mt-4">
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-slate-800 dark:text-slate-200">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwords.currentPassword}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
              placeholder="********"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-slate-800 dark:text-slate-200"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
              placeholder="********"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-slate-800 dark:text-slate-200"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwords.confirmPassword}
              onChange={handleChange}
              className="mt-1 w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
              placeholder="********"
            />
          </div>
          
          {passwordError && <p className="text-red-600 mt-2">{passwordError}</p>}
          {successMessage && <p className="text-green-600 mt-2">{successMessage}</p>}

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 my-2">
            Save
          </button>
        </div>

        <div className="p-4 bg-slate-100 dark:bg-slate-600 rounded-lg shadow mt-4">
        <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">
              Theme Settings
        </h3>

        <div className="flex flex-col space-y-3">
        {/* Light Theme */}
        <button
          className={`flex items-center p-3 rounded-md cursor-pointer transition ${
            theme === "light"
              ? "bg-blue-300 text-white shadow-lg"
              : "bg-slate-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200"
          }`}
          onClick={() => handleSelectTheme("light")}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
              theme === "light" ? "bg-white border-blue-500" : "border-gray-500"
            }`}
          >
            {theme === "light" && (
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            )}
          </div>
          Light
        </button>

        {/* Dark Theme */}
        <button
          className={`flex items-center p-3 rounded-md cursor-pointer transition ${
            theme === "dark"
              ? "bg-slate-800 text-white shadow-lg"
              : "bg-slate-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
          onClick={() => handleSelectTheme("dark")}
        >
          <div
            className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
              theme === "dark" ? "bg-white border-blue-500" : "border-gray-500"
            }`}
          >
            {theme === "dark" && (
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            )}
          </div>
          Dark
        </button>
      </div>
        </div>

        </div>
        </div>
        </div>
      </div>
    </div>
    
  );
};

export default Settings;