import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import Spinner from '../components/Spinner';
import UPDoorAccess from "../components/UPDoorAccess";
import UPHistory from "../components/UPHistory";
import UPPermissionRequests from "../components/UPPermissionRequests";
import avatar from "../assets/avatar.png"
const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [historyRecords, setHistoryRecords] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userId: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setUser(response.data);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          userId: response.data.userId
        });
        setPendingRequests(response.data.pendingRequests);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/users/${id}/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        setHistoryRecords(response.data);
      } catch (err) {
        console.error('Error fetching history:', err);
      }
    };

    fetchUser();
    fetchHistory();
  }, [id]);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`/api/users/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUser(formData);
      setIsEditModalOpen(false);
    } catch (err) {
      console.error('Error updating user:', err);
      setError(err.message);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      navigate('/users'); // Redirect to the users list page after deletion
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.message);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleRequestUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUser(response.data);
      setPendingRequests(response.data.pendingRequests);
    } catch (err) {
      console.error('Error fetching updated user data:', err);
    }
  };

  const handleAccessUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUser(response.data);
    } catch (err) {
      console.error('Error fetching updated user data:', err);
    }
  };

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <Header />
        <h1 className="text-2xl font-bold my-5">User Profile</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            {/* User Profile and Details */}
            <div className="flex items-center">
              <img
                src={user.profilePicture || avatar} 
                alt=""
                className="w-32 h-32 object-cover rounded-full"
              />
              <div className="ml-4">
                <h2 className="text-2xl font-bold mb-3"> {user.firstName} {user.lastName} </h2>
                <p className="text-gray-600 mb-2"><strong>User ID:</strong> {user.userId}</p>
                <p className="text-gray-600"><strong>Email:</strong> {user.email}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Edit User
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>

        {/* Pending Door Permission Requests */}
        <UPPermissionRequests pendingRequests={pendingRequests} onRequestUpdate={handleRequestUpdate} />

        {/* Door Access Table */}
        <UPDoorAccess accessRecords={user.doorAccess} userId={user._id} onAccessUpdate={handleAccessUpdate} />

        {/* Door Access History */}
        <UPHistory historyRecords={historyRecords} />

        {/* Edit User Modal */}
        <Modal isVisible={isEditModalOpen} onClose={handleCloseEditModal}>
          <h2 className="text-xl font-semibold mb-4">Edit User</h2>
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
          <div className="mb-4">
            <label className="block text-gray-700">User ID</label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleCloseEditModal}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </Modal>

        {/* Delete User Modal */}
        <Modal isVisible={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
          <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
          <p className="mb-4">Are you sure you want to delete this user? This action cannot be undone.</p>
          <div className="flex justify-end gap-4">
            <button
              onClick={handleCloseDeleteModal}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserProfile;