import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaChevronLeft } from 'react-icons/fa';
import avatar from '../assets/avatar.png';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Spinner from '../components/Spinner';

const UserProfile = () => {
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
    userId: '',
    password: ''
  });

  const permissions = {
    doorAccess: ['D1', 'D2', 'D3'],
    pendingRequests: ['D4', 'D5'],
    history: [
      { door: 'Main Entrance', entryTime: '2023-04-10 14:30:00', exitTime: '2023-04-10 16:45:00', duration: '2h 15m', status: 'Exited' },
      { door: 'Security Hub', entryTime: '2023-04-11 09:15:00', exitTime: null, duration: 'Ongoing', status: 'Active' },
      { door: 'Executive Room', entryTime: '2023-04-12 11:00:00', exitTime: '2023-04-12 11:02:00', duration: '2m', status: 'Exited' },
    ]
  };

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
          userId: response.data.userId,
          password: '' 
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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`/api/users/${id}`, formData, { withCredentials: true });
      setUser({ ...user, ...formData });
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
      userId: user.userId,
      password: '' 
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/users/${id}`, { withCredentials: true });
      navigate('/users'); 
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex h-full">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100">
        <Header />

        <div className="p-8 bg-white">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className=" text-black-600 px-4 py-2 rounded flex items-center"
            >
              <FaChevronLeft className="mr-2" />
              Back
            </button>
          </div>

          <div className="flex items-start gap-8">
            <img
              src={avatar}
              alt="User Profile"
              className="rounded-full w-24 h-24"
            />

            <div>
              <h3 className="text-xl font-semibold text-blue-900">User Details</h3>
              <div className="flex flex-wrap gap-4">
                <div className="w-1/2">
                  <p><strong>User ID:</strong> {formData.userId}</p>
                </div>
                <div className="w-1/2">
                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-gray-700">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                      />
                    </div>
                  ) : (
                    <p><strong>First Name:</strong> {formData.firstName}</p>
                  )}
                </div>
                <div className="w-1/2">
                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-gray-700">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                      />
                    </div>
                  ) : (
                    <p><strong>Last Name:</strong> {formData.lastName}</p>
                  )}
                </div>
                <div className="w-1/2">
                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                      />
                    </div>
                  ) : (
                    <p><strong>Email:</strong> {formData.email}</p>
                  )}
                </div>
                <div className="w-1/2">
                  {isEditing ? (
                    <div className="mb-4">
                      <label className="block text-gray-700">Password</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="p-2 border rounded w-full"
                      />
                    </div>
                  ) : (
                    <p><strong>Password:</strong> {'********'}</p>
                  )}
                </div>
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
                <button
                  onClick={handleEdit}
                  className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 mt-4"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Door Access */}
          <h4 className="text-lg font-semibold text-blue-900 mt-6">Door Access</h4>
          <div className="flex gap-2 mt-2">
            {permissions.doorAccess.map((door, index) => (
              <span key={index} className="px-3 py-1 bg-green-500 text-white rounded-full">{door}</span>
            ))}
          </div>

          {/* Pending Door Permission Requests */}
          <h4 className="text-lg font-semibold text-blue-900 mt-6">Pending Door Permission Requests</h4>
          <div className="flex gap-2 mt-2">
            {permissions.pendingRequests.map((request, index) => (
              <span key={index} className="px-3 py-1 bg-yellow-500 text-white rounded-full">{request}</span>
            ))}
          </div>

          {/* Delete Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete User
            </button>
            <p className="text-red-600 m-2">Warning: This action cannot be undone.</p>
          </div>

          {/* Door Access History */}
          <h4 className="text-lg font-semibold text-blue-900 mt-10">Door Access History</h4>
          <table className="w-full mt-4 border rounded-md">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="py-2 px-4">DOOR</th>
                <th className="py-2 px-4">ENTRY TIME</th>
                <th className="py-2 px-4">EXIT TIME</th>
                <th className="py-2 px-4">DURATION</th>
                <th className="py-2 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {permissions.history.map((entry, index) => (
                <tr key={index} className="text-center border-t">
                  <td className="py-2 px-4">{entry.door}</td>
                  <td className="py-2 px-4">{entry.entryTime}</td>
                  <td className="py-2 px-4">{entry.exitTime || 'N/A'}</td>
                  <td className="py-2 px-4">{entry.duration}</td>
                  <td className={`py-2 px-4 ${entry.status === 'Exited' ? 'text-red-500' : 'text-green-500'}`}>
                    {entry.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination (Placeholder) */}
          <div className="flex justify-between mt-4">
            <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded hover:bg-gray-300">Prev</button>
            <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded hover:bg-gray-300">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;