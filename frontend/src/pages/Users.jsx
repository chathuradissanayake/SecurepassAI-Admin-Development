import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import UserList from '../components/UserList';

const Users = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1">
        <Header />
        
        <UserList />
        
      </div>
    </div>
  );
};

export default Users;