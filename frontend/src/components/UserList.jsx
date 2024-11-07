import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users');
        console.log('API response:', response.data);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          throw new Error('API response is not an array');
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <Spinner/>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-50 flex-1">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">+ Add User</button>
      <table className="w-full mt-4 bg-white shadow-md rounded">
        <thead>
          <tr className="text-left">
            <th className="p-4">Full Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">User ID</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className="border-b">
              <td className="p-4">{user.firstName} {user.lastName}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.userId}</td>
              <td className="p-4 flex gap-2">
                <button className="text-blue-600">✏️ Edit</button>
                <button className="text-red-600">🗑️ Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;