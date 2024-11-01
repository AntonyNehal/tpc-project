

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCurrentUser } from '../redux/user/userSlice.js';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (currentUser) {
      // Populate formData with currentUser data when the component mounts
      setFormData({
        name: currentUser.name,
        branch: currentUser.branch,
        semester: currentUser.semester,
        phone: currentUser.phone,
        gender: currentUser.gender || '', // Ensure gender is included
      });
      setLoading(false);
    } else {
      setError('No user data available.');
      setLoading(false);
    }
  }, [currentUser]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '-');
  };

  const handleEditProfile = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting gender:', formData.gender); // Log the gender being submitted

    if (!formData.gender) {
      console.error('Gender is not defined.');
      return; // Exit early if gender is undefined
    }

    // Prepare updated data with proper gender formatting
    const updatedData = {
      ...currentUser,
      ...formData,
      gender: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1).toLowerCase(),
    };

    try {
      const response = await fetch(`http://localhost:3000/api/user/users/${currentUser.name}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(setCurrentUser(data)); // Update Redux state
      console.log('User updated successfully:', data);
      setIsEditing(false); // Exit editing mode
    } catch (error) {
      console.error('Failed to update user data:', error.message);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col h-screen p-5 bg-gray-100">
      <nav className="w-full flex justify-between bg-blue-500 p-4 text-white">
        <a href="/dashboard" className="font-bold">Back to Dashboard</a>
        <a href="/logout" className="font-bold">Logout</a>
      </nav>

      <div className="flex-grow flex justify-center items-center mt-5">
        <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-2xl overflow-y-auto">
          <h1 className="text-2xl font-bold mb-4">Student Profile</h1>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center mb-4">
              <img
                id="student-photo"
                src={currentUser?.image || 'default-avatar.png'}
                alt="Student"
                className="w-32 h-32 rounded-full border-4 border-blue-500 mr-4"
              />
              <div className="profile-info flex-grow">
                <h2 id="student-name" className="text-xl font-semibold">{currentUser?.name || 'Loading...'}</h2>
                <p><strong>Branch:</strong> {isEditing ? (
                  <input
                    type="text"
                    name="branch"
                    value={formData.branch || ''}
                    onChange={handleChange}
                    className="border p-2 rounded mb-2 w-full"
                  />
                ) : (
                  currentUser?.branch || 'N/A'
                )}</p>
                <p><strong>Semester:</strong> {isEditing ? (
                  <input
                    type="text"
                    name="semester"
                    value={formData.semester || ''}
                    onChange={handleChange}
                    className="border p-2 rounded mb-2 w-full"
                  />
                ) : (
                  currentUser?.semester || 'N/A'
                )}</p>
                <p><strong>Phone:</strong> {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="border p-2 rounded mb-2 w-full"
                  />
                ) : (
                  currentUser?.phone || 'N/A'
                )}</p>
                <p><strong>Email:</strong> {currentUser?.email || 'N/A'}</p>
                <p><strong>Gender:</strong> {isEditing ? (
                  <select
                    name="gender"
                    value={formData.gender || ''}
                    onChange={handleChange}
                    className="border p-2 rounded mb-2 w-full"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                ) : (
                  currentUser?.gender || 'N/A'
                )}</p>
                <p><strong>Date of Birth:</strong> {currentUser?.dob ? formatDate(currentUser.dob) : 'N/A'}</p>
                <p><strong>Nationality:</strong> {currentUser?.nationality || 'N/A'}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" onClick={handleEditProfile} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
              {isEditing && (
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                  Save
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
