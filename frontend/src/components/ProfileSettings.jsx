import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


const ProfileSettings = () => {
//edit name
const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [error, setError] = useState("");
  const userRole = localStorage.getItem('role'); // Assuming you store the role in localStorage
  const navigate = useNavigate();

  //change names and email
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('/api/admin/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { firstName, lastName, email } = response.data;
        setProfile({ firstName, lastName, email });
      } catch (err) {
        setError("Failed to fetch profile information");
      }
    };

    fetchProfile();
  }, []);

  const handleChangeName = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveName = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        '/api/admin/me',
        {
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setError("");
      alert("Profile updated successfully");
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError("Super Admins are not allowed to update their profile");
      } else {
        setError("Failed to update profile");
      }
    }
  };


  return (
    <div className="m-2">
      
        <h2 className="text-lg font-medium text-slate-800 dark:text-slate-200 mb-4">Name and Email change </h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/*First name */}
            <div>
            <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">First Name</label>
            <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleChangeName}
                className="mt-1 w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                disabled={userRole === 'SuperAdmin'}
            />

            </div>
            <div>

            {/* Last name */}
            <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">Last Name</label>
            <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleChangeName}
                className="mt-1 w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                disabled={userRole === 'SuperAdmin'}
            />
            </div> 
        </div>

        {/* email */}
        <div className="mt-4">
            <label className="block text-sm font-medium text-slate-800 dark:text-slate-200">Email</label>
            <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChangeName}
                className="mt-1 w-full p-2 border rounded dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                disabled={userRole === 'SuperAdmin'}
            />
            </div>

        {/* Save Button */}
        {userRole !== 'SuperAdmin' && (
            <div className="mt-8">
            <button
                onClick={handleSaveName}
                className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Save
            </button>
            </div>
        )}
    </div>
  )
}

export default ProfileSettings
