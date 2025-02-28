
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
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
//   const [error, setError] = useState('');
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showUserData, setShowUserData] = useState(false);


//   const [editedRow, setEditedRow] = useState(null);       // Track which row is being edited
//   const [editedField, setEditedField] = useState("");     // Track which field is being edited

  
//   const [search, setSearch] = useState("");
//   const navigate = useNavigate();

//   // Fetch game user data
//   useEffect(() => {
//     const fetchGameuserData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/gameuser/gameUsers');
//         setData(response.data); // Store full data
//         setFilteredData(response.data); // Initially set filtered data to all data
//       } catch (err) {
//         setError('Error fetching gameuser data');
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
//     const query = e.target.value
//     setSearch(query);
//     // Filter the data based on search query
//     if (query) {
//       setFilteredData(
//         data.filter(
//           (item) =>
//             (item.MobileNo && item.MobileNo.toLowerCase().startsWith(query.toLowerCase()))
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

//   // Handle field edit
//   const handleEdit = (index, field) => {
//     setEditedRow(index);
//     setEditedField(field);
//   };

//   // Handle input change
//   const handleInputChange = (event, index, field) => {
//     const updatedItem = { ...filteredData[index], [field]: event.target.value };
//     const newFilteredData = [...filteredData];
//     newFilteredData[index] = updatedItem;
//     setFilteredData(newFilteredData);
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

//     const handleUpdate = async (id, updatedData) => {
//       try {
//         const response = await axios.patch(`http://localhost:3001/gameuser/gameUsers/${id}`, updatedData);
//         if (response.status === 200) {
//           setFilteredData((prevData) =>
//             prevData.map((item) => (item._id === id ? { ...item, ...updatedData } : item))
//           );
//         }
//       } catch (err) {
//         console.error('Error updating data:', err);
//       }
//     };

   
//   const buttonStyles = {
//     padding: "5px 8px",
//     textAlign: "center",
//     borderBottom: "1px solid #ddd",
//     color: "white",
//     borderRadius: "5px",
//     margin: "12px",
//     marginLeft: "10px",
//     fontSize:'15px',
//     minWidth: '28px',
//     cursor: "pointer",
//     transition: "background-color 0.3s ease",
//     whiteSpace: "nowrap",  // Prevent text wrapping
//     display: "inline-block",  // Ensure it's inline-block so the text stays in one line
  
//   };
//   return (
//     <div className="neev">
//       <h3 className="ug">Game User Details</h3>
//       <div className="navbar_search" style={{ position: "relative" }}>
//         <input
//           type="text"
//           placeholder="Search User by Mobile No     or Username..."
//           value={search}
//           onChange={handleSearchChange}
//           style={{
//             padding: "10px 12px",  
//             fontSize: "14px",      
//             width: "100%",         
//             backgroundColor: "#f4f4f4", 
//             color: "#333",        
//             borderRadius: "20px",   
//             border: "1px solid #ddd", 
//           }}
//         />
        
//         {/* Clear Icon positioned at the end */}
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

//         {/* Search Icon */}
//         <IconButton
//           disabled={search === ""}
//           onClick={() => { navigate(`/properties/search/${search}`); }}
//           style={{ marginLeft: "8px" }}
//         >
//           <Search sx={{ color: variables.pinkred }} />
//         </IconButton>
//       </div>

//       {/* Display message if no users are found */}
//       {search && filteredData.length === 0 && (
//           <p className="no-results">
//              No users found matching your search.
//           </p>
//          )}

//       {/* Display message if results are found */}
//       {search && filteredData.length > 0 && (
//           <p className="search-result">
//           Found {filteredData.length} {filteredData.length === 1 ? "user" : "users"} matching your search.
//           </p>
//        )}


//       <table className='table-styles '>
//         <thead>
//           <tr>
//       <th className="table-header">Id</th>
//       <th className="table-header">Username</th>
//       <th className="table-header">MobileNo</th>
//       <th className="table-header">State</th>
//       <th className="table-header">isPanVerified</th>
//       <th className="table-header">isAadharVerified</th>
//       <th className="table-header">Bank_Verified</th>
//       <th className="table-header">_isBlock</th>
//       <th className="table-header"></th>
//       <th className="table-header"></th>
//     </tr>
//   </thead>
//         <tbody>
//           {filteredData.length > 0 ? (
//             filteredData.map((item, index) => (
//               <tr key={item.Id} className="table-row">
                 

//                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item._id}</td>
//                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>
//                   {editedRow === index && editedField ==="un" ? (
//                     <input
//                       type="string"
//                       value={item.un || ''}
//                       onChange={(e) => handleInputChange(e, index, 'un')}
//                       // onBlur={() => handleSave(index, 'entryFee')}
//                     />
//                   ) : (
//                     <span onClick={() => handleEdit(index, "un")}>{item.un || 'N/A'}</span>
//                   )}
//                 </td>

//                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd",whiteSpace:"nowrap" }}>{item.MobileNo}</td>
//                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd",whiteSpace:"nowrap" }}>{item.State}</td>
//                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item.isPanVerified }</td>
//                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item.isAadharVerified }</td>
//                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item.isBankVerified}</td>
//                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item.flags._isBlock}</td>
    
                
// <td className='table-data'>
//   <button
//     style={buttonStyles}
//     onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(70, 70, 72)'}
//     onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(16, 28, 52)'}
//     onClick={() => handleMoreInfo(item)}
//   >
//     More Info
//   </button>
// </td>
//                 <td className='table-data'>  
//                <button
//                     style={buttonStyles}
//                     onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(70, 70, 72)'}
//                     onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(16, 28, 52)'}
//                     onClick={() => handleUpdate(item)} 
//               >
//                Update
//               </button>
//               </td>   
//               </tr>
//             ))
//           ) : (
//           <tr>
//             <td colSpan="8" class="no-results">No results found.</td>
//           </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default GameUserData;









import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
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
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserData, setShowUserData] = useState(false);

  const [editedRow, setEditedRow] = useState(null);       // Track which row is being edited
  const [editedField, setEditedField] = useState("");
  const inputRefs = useRef([]); // Store references to the input fields
  const [editingBorder, setEditingBorder] = useState(null); // Track which input field has a border

  
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Fetch game user data
  useEffect(() => {
    const fetchGameuserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/gameuser/gameUsers');
        setData(response.data); // Store full data
        setFilteredData(response.data); // Initially set filtered data to all data
      } catch (err) {
        setError('Error fetching gameuser data');
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
    const query = e.target.value
    setSearch(query);
    // Filter the data based on search query
    if (query) {
      setFilteredData(
        data.filter(
          (item) =>
            (item.MobileNo && item.MobileNo.toLowerCase().startsWith(query.toLowerCase()))
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
    navigate("/UserData");
  };

  // Handle field edit
  const handleEdit = (index, field) => {
    setEditedRow(index);
    setEditedField(field);
  };
 


  // Handle input changes
  const handleInputChange = (event, index, field) => {
    const updatedItem = { ...filteredData[index], [field]: event.target.value };
    const newFilteredData = [...filteredData];
    newFilteredData[index] = updatedItem;
    setFilteredData(newFilteredData);
  };

  const handleUpdate = async (id, updatedData, index) => {
    try {
      const response = await axios.patch(`http://localhost:3001/gameuser/gameUsers/${id}`, updatedData);

      if (response.status === 200) {
        // Update the frontend after successful backend update
        setFilteredData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, ...updatedData } : item
          )
        );

        // After successful update, remove focus and border from the input field
        setTimeout(() => {
          // Blur the input field to remove focus
          if (inputRefs.current[index]) {
            inputRefs.current[index].blur();
          }
        }, 200); // Small delay to allow the update process to complete

        // Clear editedRow, editedField, and editingBorder to revert back to display mode
        setEditedRow(null);
        setEditedField("");
        setEditingBorder(null);
      } else {
        console.error('Backend update failed');
      }
    } catch (err) {
      console.error('Error updating data:', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (showUserData && selectedUser) {
    return <UserData user={selectedUser} handleClose={handleCloseUserData} />;
  }


   
  const buttonStyles = {
    padding: "5px 8px",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    color: "white",
    borderRadius: "5px",
    margin: "12px",
    marginLeft: "10px",
    fontSize:'15px',
    minWidth: '28px',
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    whiteSpace: "nowrap",  // Prevent text wrapping
    display: "inline-block",  // Ensure it's inline-block so the text stays in one line
  
  };
  return (
    <div className="neev">
      <h3 className="ug">Game User Details</h3>
      <div className="navbar_search" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search User by Mobile No     or Username..."
          value={search}
          onChange={handleSearchChange}
          style={{
            padding: "10px 12px",  
            fontSize: "14px",      
            width: "100%",         
            backgroundColor: "#f4f4f4", 
            color: "#333",        
            borderRadius: "20px",   
            border: "1px solid #ddd", 
          }}
        />
        
        {/* Clear Icon positioned at the end */}
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

        {/* Search Icon */}
        <IconButton
          disabled={search === ""}
          onClick={() => { navigate(`/properties/search/${search}`); }}
          style={{ marginLeft: "8px" }}
        >
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>

      {/* Display message if no users are found */}
      {search && filteredData.length === 0 && (
          <p className="no-results">
             No users found matching your search.
          </p>
         )}

      {/* Display message if results are found */}
      {search && filteredData.length > 0 && (
          <p className="search-result">
          Found {filteredData.length} {filteredData.length === 1 ? "user" : "users"} matching your search.
          </p>
       )}


      <table className='table-styles '>
        <thead>
          <tr>
      <th className="table-header">Id</th>
      <th className="table-header">Username</th>
      <th className="table-header">MobileNo</th>
      <th className="table-header">State</th>
      <th className="table-header">isPanVerified</th>
      <th className="table-header">isAadharVerified</th>
      <th className="table-header">Bank_Verified</th>
      <th className="table-header">_isBlock</th>
      <th className="table-header"></th>
      <th className="table-header"></th>
    </tr>
  </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={item.Id} className="table-row">
                 

               <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item._id}</td>
               <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>
                  {editedRow === index && editedField ==="un" ? (
                    <input
                      type="string"
                      value={item.un || ''}
                      onChange={(e) => handleInputChange(e, index, 'un')}
                      ref={(el) => (inputRefs.current[index] = el)} // Set ref to this input field
                      style={editingBorder === index ? { border: '2px solid blue' } : {}} // Add border when editing
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "un")}>{item.un || 'N/A'}</span>
                  )}
                </td>
                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>
                  {editedRow === index && editedField ==="MobileNo" ? (
                    <input
                      type="number"
                      value={item.MobileNo || ''}
                      onChange={(e) => handleInputChange(e, index, 'MobileNo')}
                      // onBlur={() => handleSave(index, 'entryFee')}
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "MobileNo")}>{item.MobileNo || 'N/A'}</span>
                  )}
                </td>
                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>
                  {editedRow === index && editedField ==="State" ? (
                    <input
                      type="string"
                      value={item.State || ''}
                      onChange={(e) => handleInputChange(e, index, 'State')}
                      // onBlur={() => handleSave(index, 'entryFee')}
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "State")}>{item.State || 'N/A'}</span>
                  )}
                </td>
                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>
                  {editedRow === index && editedField ==="isPanVerified " ? (
                    <input
                      type="number"
                      value={item.isPanVerified  || ''}
                      onChange={(e) => handleInputChange(e, index, 'isPanVerified ')}
                      // onBlur={() => handleSave(index, 'entryFee')}
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "isPanVerified ")}>{item.isPanVerified}</span>
                  )}
                </td>
                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>
                  {editedRow === index && editedField ==="isAadharVerified " ? (
                    <input
                      type="number"
                      value={item.isAadharVerified  || ''}
                      onChange={(e) => handleInputChange(e, index, 'isAadharVerified')}
                      // onBlur={() => handleSave(index, 'entryFee')}
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "isAadharVerified ")}>{item.isAadharVerified}</span>
                  )}
                </td>
                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>
                  {editedRow === index && editedField ==="isBankVerified " ? (
                    <input
                      type="number"
                      value={item.isBankVerified || ''}
                      onChange={(e) => handleInputChange(e, index, 'isBankVerified')}
                      // onBlur={() => handleSave(index, 'entryFee')}
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "isBankVerified ")}>{item.isBankVerified}</span>
                  )}
                </td>
                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>
                  {editedRow === index && editedField ==="flags._isBlock" ? (
                    <input
                      type="string"
                      value={item.flags._isBlock|| ''}
                      onChange={(e) => handleInputChange(e, index, 'flags._isBlock')}
                      // onBlur={() => handleSave(index, 'entryFee')}
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "flags._isBlock")}>{item.flags._isBlock}</span>
                  )}
                </td>
    
                
<td className='table-data'>
  <button
    style={buttonStyles}
    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(70, 70, 72)'}
    onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(16, 28, 52)'}
    onClick={() => handleMoreInfo(item)}
  >
    More Info
  </button>
</td>
                <td className='table-data'>  
               {/* <button
                    style={buttonStyles}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(70, 70, 72)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(16, 28, 52)'}
                    onClick={() => handleUpdate(item)} 
              >
               Update
              </button> */}

<button
  style={buttonStyles}
  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(70, 70, 72)'}
  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(16, 28, 52)'}
  onClick={() => handleUpdate(item._id, {
    un: item.un,
    MobileNo: item.MobileNo,
    State: item.State,
    isPanVerified: item.isPanVerified,
    isAadharVerified: item.isAadharVerified,
    isBankVerified: item.isBankVerified,
    flags: { _isBlock: item.flags._isBlock }
  })}
>
  Update
</button>

              </td>   
              </tr>
            ))
          ) : (
          <tr>
            <td colSpan="8" class="no-results">No results found.</td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GameUserData;












