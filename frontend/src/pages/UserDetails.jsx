import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userId: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log(`Fetching user with id: ${id}`);
        const response = await axios.get(`/api/users/${id}`, { withCredentials: true });
        console.log('API response:', response.data);
        setUser(response.data);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          userId: response.data.userId
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Validate userId uniqueness
      const userIdResponse = await axios.get(`/api/users?userId=${formData.userId}`, { withCredentials: true });
      if (userIdResponse.data.length > 0 && userIdResponse.data[0]._id !== id) {
        setError('User ID is already taken');
        return;
      }

      await axios.put(`/api/users/${id}`, formData, { withCredentials: true });
      setUser(formData);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userId: user.userId
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/users/${id}`, { withCredentials: true });
      navigate('/users'); // Redirect to the users list page after deletion
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.message);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />
        <div className="p-6 bg-gray-50 flex-1">
          <h1 className="text-2xl font-bold mb-4">User Details</h1>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            {isEditing ? (
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
            ) : (
              <p className="p-2 border rounded">{user.firstName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            {isEditing ? (
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
            ) : (
              <p className="p-2 border rounded">{user.lastName}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
            ) : (
              <p className="p-2 border rounded">{user.email}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">User ID</label>
            {isEditing ? (
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className="p-2 border rounded w-full"
              />
            ) : (
              <p className="p-2 border rounded">{user.userId}</p>
            )}
          </div>
          {isEditing ? (
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;