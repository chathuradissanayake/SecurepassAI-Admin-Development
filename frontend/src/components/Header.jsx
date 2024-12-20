import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useTheme } from "../../context/ThemeContext";
import avatar from "../assets/avatar.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [unreadCount, setUnreadCount] = useState(0);
  const { theme, toggleTheme } = useTheme();
  
  const isDarkTheme = theme === 'dark';
  const handleThemeToggle = () => {
    toggleTheme(); // Switch the theme when toggled
  };


  const getTitle = (path) => {
    if (path.startsWith('/users/') && path.split('/').length === 3) {
      return 'User Profile';
    }
    switch (path) {
      case '/':
        return 'Dashboard';
      case '/users':
        return 'Users';
      case '/doors':
        return 'Doors';
      case '/settings':
        return 'Settings';
      case '/profile':
        return 'Profile';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchUnreadMessagesCount = async () => {
      try {
        const response = await fetch(`/api/collections/unread-count`);
        const data = await response.json();
    
        console.log("Unread Messages Count:", data.count); // Log the count
        setUnreadCount(data.count || 0); // Update the state with the count
      } catch (error) {
        console.error("Error fetching unread messages count:", error);
      }
    };
      fetchUnreadMessagesCount();
    }, []);

  return (
    <div>
      <header className="flex justify-between items-center p-5 bg-white dark:bg-slate-800">
        <h2 className="text-gray-600 text-sm dark:text-slate-300">Pages / {getTitle(location.pathname)}</h2>
        <div className="flex items-center gap-4">
          {/* <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-full bg-gray-100"
          /> */}
          <div className="flex items-center mr-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isDarkTheme}
                onChange={handleThemeToggle}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:bg-gray-700"></div>
            </label>
            <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
              {isDarkTheme ? 'Light' : 'Dark'} Mode
            </span>
          </div>

          <div className="relative">
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs px-1">{unreadCount}</span>
            <button className="text-gray-600">🔔</button>
          </div>
          {/* <button className="text-gray-600">🌙</button> */}
          <img
            src={avatar}
            alt="User Avatar"
            className="w-8 h-8 rounded-full cursor-pointer" 
            onClick={() => navigate('/profile')}
          />
        </div>
      </header>
      <hr />
    </div>
  );
};

export default Header;
