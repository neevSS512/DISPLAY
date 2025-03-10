// import { Person, Menu } from "@mui/icons-material";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import "../styles/Navbar.scss";
// import { Link } from "react-router-dom";
// import { setLogout } from "../redux/state";
// import variables from "../styles/variables.scss";

// const Navbar = () => {
//   const [dropdownMenu, setDropdownMenu] = useState(false);
//   const user = useSelector((state) => state.user); // Get the user data from Redux store
//   const dispatch = useDispatch();
  
  

//   return (
//     <div className="navbar">
//       <a href="/">
//         {/* <img src="/assets/logo.png" alt="logo" /> */}
//       </a>

//       <div className="navbar_right">
//         {user ? (
//           <a href="/create-listing" className="host">
//             you are loggedIn
//           </a>
//         ) : (
//           <a href="/login" className="host">
//             {/* username or password is incorrect */}
//           </a>
//         )}

//         <button
//           className="navbar_right_account"
//           onClick={() => setDropdownMenu(!dropdownMenu)}
//         >
//           <Menu sx={{ color: variables.darkgrey }} />
//           <Person sx={{ color: variables.darkgrey, objectFit: "cover", borderRadius: "50%" }} />
//         </button>

//         {dropdownMenu && !user && (
//           <div className="navbar_right_accountmenu">
//             <Link to="/login">Log In</Link>
//           </div>
//         )}

//         {dropdownMenu && user && (
//           <div className="navbar_right_accountmenu">

//             <Link
//               to="/login"
//               onClick={() => {
//                 dispatch(setLogout()); // Log the user out
//               }}
//             >
//               Log Out
//             </Link>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import { Person, Menu } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";
import { setLogout } from "../redux/state";
import variables from "../styles/variables.scss";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [showAlert, setShowAlert] = useState(false);  // State for alert
  const user = useSelector((state) => state.user); // Get the user data from Redux store
  const dispatch = useDispatch();
  
  // Show the alert when the user is logged in
  useEffect(() => {
    if (user) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    }
  }, [user]);

  return (
    <div className="navbar">
      <a href="/">
        {/* <img src="/assets/logo.png" alt="logo" /> */}
      </a>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            {/* you are loggedIn */}
          </a>
        ) : (
          <a href="/login" className="host">
            {/* username or password is incorrect */}
          </a>
        )}

        {/* Show alert message if the user is logged in */}
        {showAlert && user && (
          <div className="navbar_alert">
            <p>Welcome back!</p>
          </div>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: variables.darkgrey }} />
          <Person sx={{ color: variables.darkgrey, objectFit: "cover", borderRadius: "50%" }} />
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout()); // Log the user out
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;


