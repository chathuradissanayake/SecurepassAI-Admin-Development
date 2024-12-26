import React from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute';

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
          <Route path="/users" element={isAuthenticated ? <ProtectedRoute allowedRoles={['Admin']}><Users /></ProtectedRoute> : <Navigate to="/login" />} />
          <Route path="/users/:id" element={isAuthenticated ? <ProtectedRoute allowedRoles={['Admin']}><UserProfile /></ProtectedRoute> : <Navigate to="/login" />} />
          <Route path="/doors" element={isAuthenticated ? <ProtectedRoute allowedRoles={['Admin']}><Doors /></ProtectedRoute> : <Navigate to="/login" />} />
          <Route path="/doors/:id" element={isAuthenticated ? <ProtectedRoute allowedRoles={['Admin']}><DoorDetails /></ProtectedRoute> : <Navigate to="/login" />} />
          <Route path="/create-door" element={isAuthenticated ? <ProtectedRoute allowedRoles={['Admin']}><QRGenerator /></ProtectedRoute> : <Navigate to="/login" />} />
          <Route path="/settings" element={isAuthenticated ? <ProtectedRoute allowedRoles={['Admin']}><Settings /></ProtectedRoute> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/companies" element={isAuthenticated ? <ProtectedRoute allowedRoles={['SuperAdmin']}><Companies /></ProtectedRoute> : <Navigate to="/login" />} />
          <Route path="/admin-users" element={isAuthenticated ? <ProtectedRoute allowedRoles={['SuperAdmin']}><AdminUsers /></ProtectedRoute> : <Navigate to="/login" />} />
          <Route path="/create-admin" element={isAuthenticated ? <ProtectedRoute allowedRoles={['SuperAdmin']}><CreateAdmin /></ProtectedRoute> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;