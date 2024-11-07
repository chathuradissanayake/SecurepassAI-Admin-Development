import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUserFriends, FaDoorOpen, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4 flex flex-col">
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Logo" className="w-24 h-24" />
      </div>
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 flex items-center gap-2' : 'text-gray-600 flex items-center gap-2'
              }
            >
              <FaHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 flex items-center gap-2' : 'text-gray-600 flex items-center gap-2'
              }
            >
              <FaUserFriends /> Users List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doors"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 flex items-center gap-2' : 'text-gray-600 flex items-center gap-2'
              }
            >
              <FaDoorOpen /> Doors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 flex items-center gap-2' : 'text-gray-600 flex items-center gap-2'
              }
            >
              <FaCog /> Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? 'text-blue-600 flex items-center gap-2' : 'text-gray-600 flex items-center gap-2'
              }
            >
              <FaUser /> Profile
            </NavLink>
          </li>
          <li className="text-gray-600 flex items-center gap-2">
            <FaSignOutAlt /> Logout
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;