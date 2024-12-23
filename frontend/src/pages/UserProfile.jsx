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
    <div className="flex dark:bg-slate-700">
      <Sidebar />
      <div className="flex-1">
        <Header />

        <div className="p-6 space-y-4">
        
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4">
            User Profile
          </h2>

        <div className="p-4 border dark:border-none rounded-lg shadow-sm bg-white dark:bg-slate-600">
          <div className="flex items-center justify-between">
            {/* User Profile and Details */}
            <div className="flex items-center">
              <img
                src={user.profilePicture || avatar} 
                alt=""
                className="w-32 h-32 object-cover rounded-full"
              />
              <div className="ml-4">
                <h2 className="text-2xl font-bold text-slate-700 dark:text-slate-100 mb-3"> {user.firstName} {user.lastName} </h2>
                <p className="text-slate-700 dark:text-slate-300 mb-2"><strong>User ID:</strong> {user.userId}</p>
                <p className="text-slate-700 dark:text-slate-300"><strong>Email:</strong> {user.email}</p>
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
          <h2 className="text-xl text-slate-700 dark:text-slate-200 font-bold mb-4">Edit User</h2>
          <div className="mb-4">
            <label className="block text-slate-700 dark:text-slate-200">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  dark:bg-slate-600 dark:text-slate-100 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-700 dark:text-slate-200">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  dark:bg-slate-600 dark:text-slate-100 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-700 dark:text-slate-200">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  dark:bg-slate-600 dark:text-slate-100 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-700 dark:text-slate-200">User ID</label>
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  dark:bg-slate-600 dark:text-slate-100 focus:ring-blue-400"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCloseEditModal}
              className="bg-gray-500 w-20 dark:bg-slate-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-500 w-20 text-white px-4 py-2 rounded"
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
    </div>
  );
};

export default UserProfile;