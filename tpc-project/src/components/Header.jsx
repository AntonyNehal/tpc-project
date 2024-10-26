// import React from "react";
// import { Link } from "react-router-dom";

// function Header() {
//   return (
//     <header
//       className="text-white p-4"
//       style={{
//         backgroundImage: 'url("../public/collegeimage.jpg")',
//         backgroundSize: "cover",      // Ensures the image covers the entire area
//         backgroundPosition: "center", // Centers the image
//         backgroundRepeat: "no-repeat" // Prevents repeating the image
//       }}
//     >
//       <nav className="flex items-center justify-between bg-indigo-700 bg-opacity-75 p-4">
//         <div className="text-3xl font-bold">
//           <Link to="/">CEC</Link>
//         </div>
//         <ul className="flex space-x-6">
//           <li>
//             <Link to="/about" className="hover:underline">
//               About
//             </Link>
//           </li>
//           <li>
//             <Link to="/contact" className="hover:underline">
//               Contact
//             </Link>
//           </li>
//           <li>
//             <Link to="/calendar" className="hover:underline">
//               TPC Calendar
//             </Link>
//           </li>
//           <li>
//             <Link to="/login" className="hover:underline">
//               Log In
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;
import React from "react";

import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser, signInFailure } from '../redux/user/userSlice.js'; // Import hooks from Redux// Import useSelector from React Redux

function Header() {
  // Access the current user from the Redux store
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are included
      });

      if (res.ok) {
        dispatch(setCurrentUser(null)); // Clear the Redux user state
        navigate('/'); // Navigate to home page
      } else {
        const data = await res.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error signing out:', error);
      dispatch(signInFailure(error.message)); // Handle error state
    }
  };
  return (
    <header
      className="flex flex-col justify-end text-black"
      style={{
        backgroundImage: 'url("../collegeimage.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "200px",
        position: "relative",
      }}
    >
      <nav className="flex items-center justify-between bg-transparent p-4">
        <div className="text-3xl font-bold">
          <Link to="/" className="text-white">CEC</Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/about" className="text-white hover:underline">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:underline">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/calendar" className="text-white hover:underline">
              TPC Calendar
            </Link>
          </li>
          {/* Conditional rendering based on user login status */}
          {currentUser ? (
            <>
              <li>
                <Link to="/dashboard" className="text-white hover:underline">
                  Dashboard
                </Link>
              </li>
              <li>
              <button
                onClick={handleSignOut}
                className="text-white hover:underline"
              >
                Logout
              </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="text-white hover:underline">
                Log In
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
