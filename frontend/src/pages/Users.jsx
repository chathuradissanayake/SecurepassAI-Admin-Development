import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import UserList from '../components/UserList';

const Users = () => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />
        <UserList />
      </div>
    </div>
  );
};

export default Users;