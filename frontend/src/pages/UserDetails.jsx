import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(`Fetching user with id: ${id}`);
        const response = await axios.get(`/api/users/${id}`, { withCredentials: true });
        console.log('API response:', response.data);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 bg-gray-50 flex-1">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="mb-4">
        <label className="block text-gray-700">First Name</label>
        <p className="p-2 border rounded">{user.firstName}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Last Name</label>
        <p className="p-2 border rounded">{user.lastName}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <p className="p-2 border rounded">{user.email}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">User ID</label>
        <p className="p-2 border rounded">{user.userId}</p>
      </div>
    </div>
  );
};

export default UserDetails;