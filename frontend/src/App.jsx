import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import UserProfile from './pages/UserProfile';
import Doors from './pages/Doors';
import DoorDetails from './pages/DoorDetails';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import QRGenerator from './pages/QRGenerator';
import LoginPage from './pages/LoginPage';
import LogoutPage from './pages/LogoutPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/doors" element={<Doors />} />
        <Route path="/doors/:id" element={<DoorDetails />} />
        <Route path="/create-door" element={<QRGenerator />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/qrgenerator" element={<QRGenerator />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
