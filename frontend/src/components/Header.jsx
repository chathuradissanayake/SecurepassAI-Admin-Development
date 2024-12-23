import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import avatar from "../assets/avatar.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate
  const [unreadCount, setUnreadCount] = useState(0);

  const getTitle = (path) => {
    if (path.startsWith('/users/') && path.split('/').length === 3) {
      return 'User Profile';
    }
    switch (path) {
      case '/dashboard':
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
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/collections/unread-count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
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
      <header className="flex justify-between items-center p-4 bg-white">
        <h2 className="text-gray-600 text-sm">Pages / {getTitle(location.pathname)}</h2>
        <div className="flex items-center gap-4">
          {/* <input
            type="text"
            placeholder="Search"
            className="p-2 rounded-full bg-gray-100"
          /> */}
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
