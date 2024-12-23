import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ThemeProvider } from "../context/ThemeContext"; // Import the ThemeProvider

import Dashboard from './pages/Dashboard';
import DoorDetails from './pages/DoorDetails';
import Doors from './pages/Doors';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import QRGenerator from './pages/QRGenerator';
import Settings from './pages/Settings';
import UserProfile from './pages/UserProfile';
import Users from './pages/Users';
import Companies from './pages/Companies';
import AdminUsers from './pages/AdminUsers';
import CreateAdmin from './pages/CreateAdmin';
import { isTokenExpired, getToken, getRole, clearAuthData } from './utils/auth';

const App = () => {
  const token = getToken();
  const isAuthenticated = token && !isTokenExpired(token);
  const userRole = getRole();

  if (!isAuthenticated) {
    clearAuthData();
  }

  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />
        <Route path="/users/:id" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
        <Route path="/doors" element={isAuthenticated ? <Doors /> : <Navigate to="/login" />} />
        <Route path="/doors/:id" element={isAuthenticated ? <DoorDetails /> : <Navigate to="/login" />} />
        <Route path="/create-door" element={isAuthenticated ? <QRGenerator /> : <Navigate to="/login" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/companies" element={isAuthenticated && userRole === 'SuperAdmin' ? <Companies /> : <Navigate to="/login" />} />
        <Route path="/admin-users" element={isAuthenticated && userRole === 'SuperAdmin' ? <AdminUsers /> : <Navigate to="/login" />} />
        <Route path="/create-admin" element={isAuthenticated && userRole === 'SuperAdmin' ? <CreateAdmin /> : <Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;