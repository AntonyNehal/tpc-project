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
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector from React Redux

function Header() {
  // Access the current user from the Redux store
  const currentUser = useSelector((state) => state.user.currentUser);

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
                <Link to="/logout" className="text-white hover:underline">
                  Log Out
                </Link>
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
