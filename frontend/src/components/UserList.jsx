import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import Modal from './Modal';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

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

  if (loading) return <Spinner />;
  if (error) return <p>Error: {error}</p>;

  // Calculate the indices for the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-50 flex-1">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users List</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setIsModalVisible(true)}
        >
          + Add User
        </button>
      </div>
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
          {currentUsers.map(user => (
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
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex list-none">
            {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
              <li key={index} className="mx-1">
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <Modal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)}>
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        {/* Add your form for creating a new user here */}
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full p-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">User ID</label>
            <input type="text" className="w-full p-2 border rounded" />
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setIsModalVisible(false)}>Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default UserList;