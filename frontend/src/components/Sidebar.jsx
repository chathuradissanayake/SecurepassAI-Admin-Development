import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserFriends,
  FaDoorOpen,
  FaCog,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens or session)
    console.log("Logging out...");
    navigate("/logout"); // Redirect to the logout page
  };

  return (
    <aside className="w-64 bg-white h-screen p-4 flex flex-col">
      <div className="flex justify-center mb-8">
        <NavLink to="/">
          <img src={logo} alt="Logo" className="w-24 h-24" />
        </NavLink>
      </div>
      <nav className="flex-1">
        <ul className="space-y-4">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 flex items-center gap-2"
                  : "text-gray-600 flex items-center gap-2"
              }
            >
              <FaHome /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 flex items-center gap-2"
                  : "text-gray-600 flex items-center gap-2"
              }
            >
              <FaUserFriends /> Users List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/doors"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 flex items-center gap-2"
                  : "text-gray-600 flex items-center gap-2"
              }
            >
              <FaDoorOpen /> Doors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 flex items-center gap-2"
                  : "text-gray-600 flex items-center gap-2"
              }
            >
              <FaCog /> Settings
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 flex items-center gap-2"
                  : "text-gray-600 flex items-center gap-2"
              }
            >
              <FaUser /> Profile
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-red-600 flex items-center gap-2 w-full text-left"
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
