// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import UserData from "../moreInfo/UserData";
// import { Search, Clear } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
// import { IconButton } from "@mui/material";
// import variables from "../styles/variables.scss";
// import "../styles/Gameuser.scss";

// const GameUserData = () => {
//   const [data, setData] = useState([]); // Store all fetched data
//   const [filteredData, setFilteredData] = useState([]); // Store filtered data based on search
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showUserData, setShowUserData] = useState(false);

//   const inputRefs = useRef([]); // Store references to the input fields

//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchGameuserData = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:3001/gameuser/gameUsers"
//         );
//         setData(response.data); // Store full data
//         setFilteredData(response.data); // Initially set filtered data to all data
//       } catch (err) {
//         setError("Error fetching gameuser data");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchGameuserData();
//   }, []);

//   const handleMoreInfo = (user) => {
//     setSelectedUser(user);
//     setShowUserData(true);
//   };

//   const handleCloseUserData = () => {
//     setSelectedUser(null);
//     setShowUserData(false);
//   };

//   const handleSearchChange = (e) => {
//     const query = e.target.value.trim();
//     setSearch(query);
//     // Filter the data based on search query
//     if (query) {
//       setFilteredData(
//         data.filter(
//           (item) =>
//             (item.mobile_no &&
//             item.mobile_no.toLowerCase().startsWith(query.toLowerCase()))|| 
//             (item.panNumber && item.panNumber.toLowerCase().startsWith(query.toLowerCase()))
//         )
//       );
//     } else {
//       // If search is cleared, reset to show all data
//       setFilteredData(data);
//     }
//   };

//   const handleClearSearch = () => {
//     setSearch("");
//     setFilteredData(data); // Show all data again
//     navigate("/UserData");
//   };

//   const handleUpdate = async (id, updatedData, index) => {
//     try {
//       const response = await axios.patch(
//         `http://localhost:3001/gameuser/gameUsers/${id}`,
//         updatedData
//       );
  
//       if (response.status === 200) {
//         // Update the frontend after successful backend update
//         setFilteredData((prevData) =>
//           prevData.map((item) =>
//             item._id === id ? { ...item, ...updatedData } : item
//           )
//         );
  
//         setTimeout(() => {
//           if (inputRefs.current[index]) {
//             inputRefs.current[index].blur();
//           }
//         }, 1500);
  
//         // Show success alert
//         showAlert("Row updated successfully");
//       } else {
//         console.error("Backend update failed");
//         showAlert("Failed to update row");
//       }
//     } catch (err) {
//       console.error("Error updating data:", err);
//       showAlert("Error updating row");
//     }
//   };
  
  
  

//   const showAlert = (message) => {
//     // Create a div for the alert message
//     const alertDiv = document.createElement("div");
//     alertDiv.textContent = message;
//     alertDiv.style.position = "fixed";
//     alertDiv.style.top = "4%";
//     alertDiv.style.left = "50%";
//     alertDiv.style.transform = "translateX(-50%)"; // Center horizontally
//     alertDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
//     alertDiv.style.color = "white";
//     alertDiv.style.padding = "8px 20px"; // Reduced padding to reduce height
//     alertDiv.style.borderRadius = "5px";
//     alertDiv.style.zIndex = "9999";
//     alertDiv.style.fontSize = "16px"; // Reduced font size
//     alertDiv.style.fontWeight = "bold";
//     alertDiv.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
//     alertDiv.style.transition = "opacity 0.5s ease-out"; // Fade out effect

//     // Append the alert to the body
//     document.body.appendChild(alertDiv);

//     // Remove the alert after 1.5 seconds
//     setTimeout(() => {
//       alertDiv.style.opacity = "0"; // Apply the fade-out effect
//       setTimeout(() => {
//         document.body.removeChild(alertDiv);
//       }, 500); // Allow the fade-out transition to complete before removing
//     }, 1500);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (showUserData && selectedUser) {
//     return <UserData user={selectedUser} handleClose={handleCloseUserData} />;
//   }
//   const handleToggleBlock = (index) => {
//     const updatedItem = { ...filteredData[index] };
//     const currentBlockStatus = updatedItem.flags._isBlock;
  
//     // Toggle the value between 1 (blocked) and 0 (not blocked)
//     updatedItem.flags._isBlock = currentBlockStatus === 1 ? 0 : 1;
  
//     // Update the filtered data in the state (but don't make an API call here)
//     const newFilteredData = [...filteredData];
//     newFilteredData[index] = updatedItem;
//     setFilteredData(newFilteredData);
//   };
  


  

//   return (
//     <div className="neev">
//       <h3 className="ug">Game User Details</h3>
//       <div className="navbar_search" style={{ position: "relative" }}>
//         <input
//           className="input-std"
//           type="text"
//           placeholder="Search User by Mobile No     or Username..."
//           value={search}
//           onChange={handleSearchChange}
//           style={{
//             border: "2px solid #ccc", // Light gray border color
//             borderRadius: "20px", // Optional: rounded corners for the border
//             padding: "8px 12px", // Optional: for better padding inside the input
//           }}
//         />

//         <IconButton
//           disabled={search === ""}
//           onClick={handleClearSearch}
//           style={{
//             position: "absolute",
//             right: "81px",
//             top: "50%",
//             transform: "translateY(-50%)",
//           }}
//         >
//           <Clear sx={{ color: variables.pinkred }} />
//         </IconButton>

//         <IconButton
//           disabled={search === ""}
//           // onClick={() => {
//           //   navigate(`/properties/search/${search}`);
//           // }}
//           style={{ marginLeft: "8px" }}
//         >
//           <Search sx={{ color: variables.pinkred }} />
//         </IconButton>
//       </div>

//       {search && filteredData.length === 0 && (
//         <p className="no-results">No users found matching your search.</p>
//       )}

//       {search && filteredData.length > 0 && (
//         <p className="search-result">
//           Found {filteredData.length}{" "}
//           {filteredData.length === 1 ? "user" : "users"} matching your search.
//         </p>
//       )}

//       <table className="table-styles ">
//         <thead>
//           <tr>
//             <th className="table-header">Username</th>
//             <th className="table-header">MobileNo</th>
//             <th className="table-header">State</th>
//             <th className="table-header">Pan Number</th>
//             <th className="table-header">Aadhar Number</th>
//             <th className="table-header">_isBlock</th>
//             <th className="table-header"></th>
//             <th className="table-header"></th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.length > 0 ? (
//             filteredData.map((item, index) => (
//               <tr key={item.Id} className="table-row">
//                 <td className="stg-td">{item.un}</td>

//                 <td className="stg-td">{item.mobile_no}</td>

//                 <td className="stg-td">{item.state || "_"}</td>
//                 <td className="stg-td">{item.panNumber || "_"}</td>

//                 <td className="stg-tds">{item.aadharNumber || "_"}</td>

//                 <td className="stg-td">
//   <span
//     onClick={() => handleToggleBlock(index)}
//     style={{
//       cursor: 'pointer',
//       fontWeight: 'bold',
//     }}
//   >
//     {item.flags._isBlock}
//   </span>
// </td> 



//                 <td className="table-data">
//                   <button
//                     className="btn-stg"
//                     onMouseEnter={(e) =>
//                       (e.target.style.backgroundColor = "rgb(70, 70, 72)")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.target.style.backgroundColor = "rgb(16, 28, 52)")
//                     }
//                     onClick={() => handleMoreInfo(item)}
//                   >
//                     More Info
//                   </button>
//                 </td>
//                 <td className="table-data">
//                   <button
//                     className="btn-stg"
//                     onMouseEnter={(e) =>
//                       (e.target.style.backgroundColor = "rgb(70, 70, 72)")
//                     }
//                     onMouseLeave={(e) =>
//                       (e.target.style.backgroundColor = "rgb(16, 28, 52)")
//                     }
//                     onClick={() =>
//                       handleUpdate(item._id, {
//                         flags: { _isBlock: item.flags._isBlock },
//                       })
//                     }
//                   >
//                     Update
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="8" class="no-results">
//                 No results found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default GameUserData;













import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import UserData from "../moreInfo/UserData";
import { Search, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import variables from "../styles/variables.scss";
import "../styles/Gameuser.scss";

const GameUserData = () => {
  const [data, setData] = useState([]); // Store all fetched data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data based on search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserData, setShowUserData] = useState(false);

  const inputRefs = useRef([]); // Store references to the input fields

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [rowsPerPage, setRowsPerPage] = useState(8); // Rows per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGameuserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/gameuser/gameUsers"
        );
        setData(response.data); // Store full data
        setFilteredData(response.data); // Initially set filtered data to all data
      } catch (err) {
        setError("Error fetching gameuser data");
      } finally {
        setLoading(false);
      }
    };
    fetchGameuserData();
  }, []);

  const handleMoreInfo = (user) => {
    setSelectedUser(user);
    setShowUserData(true);
  };

  const handleCloseUserData = () => {
    setSelectedUser(null);
    setShowUserData(false);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.trim();
    setSearch(query);
    // Filter the data based on search query
    if (query) {
      setFilteredData(
        data.filter(
          (item) =>
            (item.mobile_no &&
              item.mobile_no.toLowerCase().startsWith(query.toLowerCase())) ||
            (item.panNumber &&
              item.panNumber.toLowerCase().startsWith(query.toLowerCase()))
        )
      );
    } else {
      // If search is cleared, reset to show all data
      setFilteredData(data);
    }
  };

  const handleClearSearch = () => {
    setSearch("");
    setFilteredData(data); // Show all data again
    setCurrentPage(1); // Reset to first page on search clear
    navigate("/UserData");
  };

  const handleUpdate = async (id, updatedData, index) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/gameuser/gameUsers/${id}`,
        updatedData
      );

      if (response.status === 200) {
        // Update the frontend after successful backend update
        setFilteredData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, ...updatedData } : item
          )
        );

        setTimeout(() => {
          if (inputRefs.current[index]) {
            inputRefs.current[index].blur();
          }
        }, 1500);

        // Show success alert
        showAlert("Row updated successfully");
      } else {
        console.error("Backend update failed");
        showAlert("Failed to update row");
      }
    } catch (err) {
      console.error("Error updating data:", err);
      showAlert("Error updating row");
    }
  };

  const showAlert = (message) => {
    const alertDiv = document.createElement("div");
    alertDiv.textContent = message;
    alertDiv.style.position = "fixed";
    alertDiv.style.top = "4%";
    alertDiv.style.left = "50%";
    alertDiv.style.transform = "translateX(-50%)";
    alertDiv.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    alertDiv.style.color = "white";
    alertDiv.style.padding = "8px 20px";
    alertDiv.style.borderRadius = "5px";
    alertDiv.style.zIndex = "9999";
    alertDiv.style.fontSize = "16px";
    alertDiv.style.fontWeight = "bold";
    alertDiv.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)";
    alertDiv.style.transition = "opacity 0.5s ease-out";

    document.body.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(alertDiv);
      }, 500);
    }, 1500);
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (currentPage > totalPages && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (showUserData && selectedUser) {
    return <UserData user={selectedUser} handleClose={handleCloseUserData} />;
  }

  const handleToggleBlock = (index) => {
    const updatedItem = { ...filteredData[index] };
    const currentBlockStatus = updatedItem.flags._isBlock;

    // Toggle the value between 1 (blocked) and 0 (not blocked)
    updatedItem.flags._isBlock = currentBlockStatus === 1 ? 0 : 1;

    // Update the filtered data in the state (but don't make an API call here)
    const newFilteredData = [...filteredData];
    newFilteredData[index] = updatedItem;
    setFilteredData(newFilteredData);
  };

  return (
    <div className="neev">
      <h3 className="ug">Game User Details</h3>
      <div className="navbar_search" style={{ position: "relative" }}>
        <input
          className="input-std"
          type="text"
          placeholder="Search User by Mobile No or Username..."
          value={search}
          onChange={handleSearchChange}
          style={{
            border: "2px solid #ccc",
            borderRadius: "20px",
            padding: "8px 12px",
          }}
        />

        <IconButton
          disabled={search === ""}
          onClick={handleClearSearch}
          style={{
            position: "absolute",
            right: "81px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Clear sx={{ color: variables.pinkred }} />
        </IconButton>

        <IconButton
          disabled={search === ""}
          style={{ marginLeft: "8px" }}
        >
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>

      {search && filteredData.length === 0 && (
        <p className="no-results">No users found matching your search.</p>
      )}

      {search && filteredData.length > 0 && (
        <p className="search-result">
          Found {filteredData.length}{" "}
          {filteredData.length === 1 ? "user" : "users"} matching your search.
        </p>
      )}

      {/* Rows per page dropdown */}
      <div style={{ marginBottom: "5px", visibility: "hidden" }}>
        <label style={{ marginRight: "10px" }}>Rows per page:</label>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          style={{ padding: "5px", fontSize: "14px" }}
        >
          <option value={10}>5</option>
          <option value={20}>8</option>
          <option value={30}>10</option>
        </select>
      </div>

      <table className="table-styles">
        <thead>
          <tr>
            <th className="table-header">Username</th>
            <th className="table-header">MobileNo</th>
            <th className="table-header">State</th>
            <th className="table-header">Pan Number</th>
            <th className="table-header">Aadhar Number</th>
            <th className="table-header">_isBlock</th>
            <th className="table-header"></th>
            <th className="table-header"></th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((item, index) => (
              <tr key={item.Id} className="table-row">
                <td className="stg-td">{item.un}</td>
                <td className="stg-td">{item.mobile_no}</td>
                <td className="stg-td">{item.state || "_"}</td>
                <td className="stg-td">{item.panNumber || "_"}</td>
                <td className="stg-tds">{item.aadharNumber || "_"}</td>
                <td className="stg-td">
                  <span
                    onClick={() => handleToggleBlock(index)}
                    style={{ cursor: "pointer", fontWeight: "bold" }}
                  >
                    {item.flags._isBlock}
                  </span>
                </td>
                <td className="table-data">
                  <button className="btn-stg" onClick={() => handleMoreInfo(item)}>
                    More Info
                  </button>
                </td>
                <td className="table-data">
                  <button
                    className="btn-stg"
                    onClick={() =>
                      handleUpdate(item._id, {
                        flags: { _isBlock: item.flags._isBlock },
                      })
                    }
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-results">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{marginLeft:"1200px",}}>
        {/* Conditionally render Previous button */}
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}
          style={{height:"27px",fontSize:"14px",marginBottom:"4px"}}
          >Previous</button>
        )}
        
        <span style={{whiteSpace:"nowrap",}}>
          Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
        </span>

        {/* Conditionally render Next button */}
        {currentPage < Math.ceil(filteredData.length / rowsPerPage) && (
          <button onClick={handleNextPage} style={{height:"27px",fontSize:"14px",marginBottom:"12px"}}>Next</button>
        )}
      </div>
    </div>
  );
};

export default GameUserData;
