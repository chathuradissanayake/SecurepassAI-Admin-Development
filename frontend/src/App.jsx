import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Doors from './pages/Doors';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import UserDetails from './pages/UserDetails';
import UserProfile from './pages/UserProfile';
import Users from './pages/Users';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/doors" element={<Doors />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;