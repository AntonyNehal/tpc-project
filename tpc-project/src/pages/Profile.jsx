import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
 // Adjust the path as needed
import { setCurrentUser } from '../redux/user/userSlice';
const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser); // Access current user from Redux store

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user/me', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          dispatch(setCurrentUser(userData)); // Set current user in Redux store
        } else {
          console.error('Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [dispatch]);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options).replace(/\//g, '-'); // Format as DD-MM-YYYY
  };

  return (
    <div className="flex flex-col items-center p-5 bg-gray-100">
      <nav className="w-full flex justify-between bg-blue-500 p-4 text-white">
        <a href="/dashboard" className="font-bold">Back to Dashboard</a>
        <a href="/logout" className="font-bold">Logout</a>
      </nav>
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md mt-5">
        <h1 className="text-2xl font-bold mb-4">Student Profile</h1>
        <div className="flex items-center mb-4">
          <img
            id="student-photo"
            src={currentUser?.image || 'default-avatar.png'}
            alt="Student Photo"
            className="w-32 h-32 rounded-full border-4 border-blue-500 mr-4"
          />
          <div className="profile-info">
            <h2 id="student-name" className="text-xl font-semibold">{currentUser?.name || 'Loading...'}</h2>
            <p><strong>Branch:</strong> {currentUser?.branch || 'Loading...'}</p>
            <p><strong>Semester:</strong> {currentUser?.semester || 'Loading...'}</p>
            <p><strong>Phone:</strong> {currentUser?.phone || 'Loading...'}</p>
            <p><strong>Email:</strong> {currentUser?.email || 'Loading...'}</p>
            <p><strong>Gender:</strong> {currentUser?.gender || 'Loading...'}</p>
            <p><strong>Date of Birth:</strong> {currentUser?.dob ? formatDate(currentUser.dob) : '01-01-2000'}</p>
            <p><strong>Nationality:</strong> {currentUser?.nationality || 'Loading...'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="skills-section bg-gray-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Skills Acquired</h3>
            <ul className="list-disc list-inside">
              {currentUser?.skills?.map((skill, index) => (
                <li key={index}>{skill}</li>
              )) || <li>Loading...</li>}
            </ul>
          </div>
          <div className="upload-section bg-gray-200 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Upload Certificates</h3>
            <input type="file" id="fileInput" accept="image/*" multiple className="mt-2 mb-2" />
            <button id="uploadButton" className="bg-blue-500 text-white py-2 px-4 rounded">Upload</button>
          </div>
        </div>
        <button id="edit-button" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
