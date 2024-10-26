// import React, { useState } from 'react';

// // Sidebar Component
// const Sidebar = () => {
//   return (
//     <div className="w-64 bg-blue-800 text-white h-screen p-5">
//       <h2 className="mb-5 text-center">Welcome</h2>
//       <div className="user-info text-center mb-5">
//         <img src="s.jpg" alt="User Photo" className="w-20 h-20 rounded-full mx-auto" />
//         <h3 id="username" className="mt-2">nehal</h3>
//       </div>
//       <ul>
//         <li className="my-3"><a href="/dashboard" className="hover:text-blue-300">Dashboard</a></li>
//         <li className="my-3"><a href="profile.html" className="hover:text-blue-300">Profile</a></li>
//         <li className="my-3"><a href="/home" className="hover:text-blue-300">Go to Home</a></li>
//         <li className="my-3"><a href="/" className="hover:text-blue-300">Logout</a></li>
//       </ul>
//     </div>
//   );
// };

// // Main Content Component
// const MainContent = () => {
//   return (
//     <div className="flex-grow p-5 bg-gray-100">
//       <h1 className="text-xl font-bold mb-4">Dashboard</h1>
//       <p className="text-red-500 text-center">Click here for neat registration</p>
//       <div className="mt-8">
//         <h1 className="text-2xl font-semibold mb-4">Placement Statistics</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//           {['Jobs Applied', 'Interviews Completed', 'Applications Shortlisted', 'Interviews Selected'].map((title, index) => (
//             <div key={index} className="bg-blue-100 border border-gray-300 rounded-lg p-4 shadow-md">
//               <h2 className="text-lg font-semibold">{title}</h2>
//               <p id={`${title.replace(/ /g, '').toLowerCase()}Count`} className="text-2xl">0</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Dashboard Component
// const Dashboard = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <MainContent />
//     </div>
//   );
// };
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import { setCurrentUser } from '../redux/user/userSlice'; // Import the setCurrentUser action

// Sidebar Component
const Sidebar = ({ user }) => {
  return (
    <div className="w-64 bg-blue-800 text-white h-screen p-5">
      <h2 className="mb-5 text-center">Welcome</h2>
      <div className="user-info text-center mb-5">
        <img
          src={user.image || "default-avatar.png"}
          alt="User Photo"
          className="w-20 h-20 rounded-full mx-auto"
        />
        <h3 id="username" className="mt-2">{user.name || "Guest"}</h3>
      </div>
      <ul>
        <li className="my-3"><a href="/dashboard" className="hover:text-blue-300">Dashboard</a></li>
        <li className="my-3"><a href="/profile" className="hover:text-blue-300">Profile</a></li>
        <li className="my-3"><a href="/home" className="hover:text-blue-300">Go to Home</a></li>
        <li className="my-3"><a href="/" className="hover:text-blue-300">Logout</a></li>
      </ul>
    </div>
  );
};

// Main Content Component
const MainContent = () => {
  return (
    <div className="flex-grow p-5 bg-gray-100">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <p className="text-red-500 text-center">Click here for neat registration</p>
      <div className="mt-8">
        <h1 className="text-2xl font-semibold mb-4">Placement Statistics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {['Jobs Applied', 'Interviews Completed', 'Applications Shortlisted', 'Interviews Selected'].map((title, index) => (
            <div key={index} className="bg-blue-100 border border-gray-300 rounded-lg p-4 shadow-md">
              <h2 className="text-lg font-semibold">{title}</h2>
              <p id={`${title.replace(/ /g, '').toLowerCase()}Count`} className="text-2xl">0</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const user = useSelector((state) => state.user.currentUser); // Get current user from Redux store

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user/me', {
          method: 'GET',
          credentials: 'include', // Include cookies with the request
        });
        if (response.ok) {
          const userData = await response.json();
          dispatch(setCurrentUser(userData)); // Dispatch action to set current user
        } else {
          console.error('Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [dispatch]); // Add dispatch to the dependency array

  return (
    <div className="flex">
      <Sidebar user={user} />
      <MainContent />
    </div>
  );
};

export default Dashboard;
