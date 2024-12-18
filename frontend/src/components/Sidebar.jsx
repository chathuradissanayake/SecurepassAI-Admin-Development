import React from "react";
import {
  FaCog,
  FaDoorOpen,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('role'); // Assuming you store the role in localStorage

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens or session)
    console.log("Logging out...");
    navigate("/logout"); // Redirect to the logout page
  };

  return (
    <aside className="w-64 bg-slate-200 min-h-screen p-6 flex flex-col space-y-6">
      <div className="flex justify-center mb-6">
        <NavLink to="/dashboard">
          <img src={logo} alt="Logo" className="w-24 h-24" />
        </NavLink>
      </div>
      <nav className="flex-1">
        <ul className="space-y-6">
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? " text-blue-600 flex items-center gap-4"
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
                  ? "text-blue-600 flex items-center gap-4"
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
                  ? "text-blue-600 flex items-center gap-4"
                  : "text-gray-600 flex items-center gap-2"
              }
            >
              <FaDoorOpen /> Doors
            </NavLink>
          </li>
          {userRole === 'SuperAdmin' && (
            <>
              <li>
                <NavLink
                  to="/companies"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center gap-4"
                      : "text-gray-600 flex items-center gap-2"
                  }
                >
                  <FaUserFriends /> Companies
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin-users"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 flex items-center gap-4"
                      : "text-gray-600 flex items-center gap-2"
                  }
                >
                  <FaUser /> Admin Users
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 flex items-center gap-4"
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
                  ? "text-blue-600 flex items-center gap-4"
                  : "text-gray-600 flex items-center gap-2"
              }
            >
              <FaUser /> Profile
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="text-gray-600 flex items-center gap-2 w-full text-left"
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