// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "../styles/ludopublicmoredata.scss";

// const LudoPublicM = ({user, handleClose }) => {
//   const [filteredData, setFilteredData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [editedRow, setEditedRow] = useState(null);
//   const [editedField, setEditedField] = useState("");
//   const [localChanges, setLocalChanges] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://147.93.27.170:3001/ludopublic/ludopublicctg');
//         if (response.data) {
//           setFilteredData(response.data);
//         }
//       } catch (err) {
//         setError('Error fetching data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//     // useEffect(() => {
//     //   if (user) {
//     //     setLoading(false);  // Set loading to false once user data is available
//     //   } else {
//     //     setError('No user data available');
//     //     setLoading(false);
//     //   }
//     // }, [user]);

//     // // If no user or closed, don't render
//     // if (!user) {
//     //   return null;
//     // }

//   const handleUpdate = async (id, updatedData) => {
//     try {

//       const response = await axios.patch(`http://147.93.27.170:3001/ludopublic/ludopublicctg/${id}`, updatedData);

//       if (response.status === 200) {
//         setFilteredData((prevData) =>
//           prevData.map((item) => (item._id === id ? { ...item, ...updatedData } : item))
//         );
//       } else {
//         console.error('Failed to update the data');
//       }
//     } catch (err) {
//       console.error('Error updating data:', err);
//     }
//   };

//   const handleEdit = (index, field) => {
//     setEditedRow(index);
//     setEditedField(field);
//   };

//   const handleInputChange = (event, index, field) => {
//     const updatedItem = { ...filteredData[index], [field]: event.target.value };
//     const newFilteredData = [...filteredData];
//     newFilteredData[index] = updatedItem;
//     setFilteredData(newFilteredData);

//     // Track local changes
//     setLocalChanges((prev) => ({
//       ...prev,
//       [index]: { ...prev[index], [field]: event.target.value },
//     }));
//   };

//   const handleSave = (index) => {
//     const updatedItem = { ...filteredData[index], ...localChanges[index] };
//     handleUpdate(updatedItem._id, updatedItem);
//     setEditedRow(null); // Exit edit mode
//     setEditedField("");
//     setLocalChanges((prev) => ({ ...prev, [index]: {} })); // Reset local changes after save
//   };

//   // Handle toggle for boolean fields
//   const handleToggle = (index, field) => {
//     const newFilteredData = [...filteredData];
//     newFilteredData[index] = {
//       ...newFilteredData[index],
//       [field]: !newFilteredData[index][field], // Toggle the value
//     };
//     setFilteredData(newFilteredData);

//     // Track local changes
//     setLocalChanges((prev) => ({
//       ...prev,
//       [index]: { ...prev[index], [field]: newFilteredData[index][field] },
//     }));
//   };

//   if (loading) {
//     return <div>Loading...</div>; // Show loading message while data is being fetched
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error if fetching fails
//   }

//   const tableStyles = {
//     width: "82vw",
//     borderCollapse: "collapse",
//     marginTop: "20px",
//     marginBottom: "20px",
//     marginLeft: "230px"
//   };

//   const thStyles = {
//     backgroundColor: "black",
//     color: "white",
//     padding: "10px",
//     textAlign: "left",
//     borderBottom: "2px solid #ddd"
//   };

//   const tdStyles = {
//     padding: "8px",
//     textAlign: "left",
//     borderBottom: "1px solid #ddd"
//   };

//   return (
//     <div className="neev">
//       <h3 className="ctr">More Info About the Ludo Public

//       <button
//            className='go-back-btn'
//            style={{ marginLeft: '510px' }}
//            onClick={() => handleClose()}
//         >
//         Go Back
//         </button>
//       </h3>

//       <table style={tableStyles}>
//         <thead>
//           <tr>
//             <th style={thStyles}>Type</th>
//             <th style={thStyles}>Online Player</th>
//             <th style={thStyles}>targetScore</th>
//             <th style={thStyles}>isdelete</th>
//             <th style={thStyles}>_ip</th>
//             <th style={thStyles}>gst</th>
//             <th style={thStyles}>play store</th>
//             <th style={thStyles}>first_game</th>
//             <th style={thStyles}>order</th>
//             <th style={thStyles}>win amount</th>
//             <th style={thStyles}>free win games</th>
//             <th style={thStyles}></th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.length > 0 ? (
//             filteredData.map((item, index) => (
//               <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff" }}>

//                 {/* type */}
//                 <td style={tdStyles}>
//                   {editedRow === index && editedField === "type" ? (
//                     <input
//                       type="type"
//                       value={user.type || ''}
//                       onChange={(e) => handleInputChange(e, index, 'type')}
//                     />
//                   ) : (
//                     <span onClick={() => handleEdit(index, "type")}>{item.type || 'N/A'}</span>
//                   )}
//                 </td>

//                   {/* Online player */}
//                   <td style={tdStyles}>
//                   {editedRow === index && editedField === "online_player" ? (
//                     <input
//                       type="number"
//                       value={item.online_player || ''}
//                       onChange={(e) => handleInputChange(e, index, 'online_player')}
//                     />
//                   ) : (
//                     <span onClick={() => handleEdit(index, "online_player")}>{item.online_player|| 'N/A'}</span>
//                   )}
//                 </td>

//                 {/*targetScore*/}
//                 <td style={tdStyles}>
//                   {editedRow === index && editedField === "targetScore" ? (
//                     <input
//                       type="text"
//                       value={item.targetScore || ''}
//                       onChange={(e) => handleInputChange(e, index, 'targetScore')}
//                     />
//                   ) : (
//                     <span onClick={() => handleEdit(index, "targetScore")}>{item.targetScore || 'N/A'}</span>
//                   )}
//                 </td>

//                 {/* isdelete */}
//                 <td style={tdStyles}>
//                   {editedRow === index && editedField === "isdelete" ? (
//                     <input
//                       type="number"
//                       value={item.isdelete || ''}
//                       onChange={(e) => handleInputChange(e, index, 'isdelete')}
//                     />
//                   ) : (
//                     <span onClick={() => handleEdit(index, "isdelete")}>{item.isdelete || 'N/A'}</span>
//                   )}
//                 </td>
//                       {/* _IP */}
//                       <td style={tdStyles}>
//                   <span
//                     style={{
//                       backgroundColor: item._ip ? 'green' : 'red',
//                       color: 'white',
//                       padding: '5px 10px',
//                       borderRadius: '5px',
//                       textAlign: 'center',
//                       minWidth: '40px',
//                       display: 'inline-block',
//                     }}
//                     onClick={() => handleToggle(index, "_ip")}
//                   >
//                     {item._ip ? 'Yes' : 'No'}
//                   </span>
//                 </td>

//                     {/* gst*/}
//                     <td style={tdStyles}>
//                   {editedRow === index && editedField === "gst" ? (
//                     <input
//                       type="number"
//                       value={item.gst || ''}
//                       onChange={(e) => handleInputChange(e, index, 'gst')}
//                     />
//                   ) : (
//                     <span onClick={() => handleEdit(index, "gst")}>{item.gst || 'N/A'}</span>
//                   )}
//                 </td>

//                 {/* Play Store */}
//                 <td style={tdStyles}>
//                   <span
//                     style={{
//                       backgroundColor: item.play_store ? 'green' : 'red',
//                       color: 'white',
//                       padding: '5px 10px',
//                       borderRadius: '5px',
//                       textAlign: 'center',
//                       minWidth: '40px',
//                       display: 'inline-block',
//                     }}
//                     onClick={() => handleToggle(index, "play_store")}
//                   >
//                     {item.play_store ? 'Yes' : 'No'}
//                   </span>
//                 </td>

//                    {/*first_game*/}
//                    <td style={tdStyles}>
//                   <span
//                     style={{
//                       backgroundColor: item.first_game ? 'green' : 'red',
//                       color: 'white',
//                       padding: '5px 10px',
//                       borderRadius: '5px',
//                       textAlign: 'center',
//                       minWidth: '40px',
//                       display: 'inline-block',
//                     }}
//                     onClick={() => handleToggle(index, "first_game")}
//                   >
//                     {item.first_game ? 'Yes' : 'No'}
//                   </span>
//                 </td>

//                    {/* order */}
//                    <td style={tdStyles}>
//                   {editedRow === index && editedField === "order" ? (
//                     <input
//                       type="number"
//                       value={item.order || ''}
//                       onChange={(e) => handleInputChange(e, index, 'order')}
//                     />
//                   ) : (
//                     <span onClick={() => handleEdit(index, "order")}>{item.order || 'N/A'}</span>
//                   )}
//                 </td>
//                    {/* winAmount */}
//                    <td style={tdStyles}>
//                   {editedRow === index && editedField === "winAmount " ? (
//                     <input
//                       type="number"
//                       value={item.winAmount  || ''}
//                       onChange={(e) => handleInputChange(e, index, 'winAmount ')}
//                     />
//                   ) : (
//                     <span onClick={() => handleEdit(index, "winAmount ")}>{item.winAmount  || 'N/A'}</span>
//                   )}
//                 </td>

//                  {/*freeWinGame*/}
//                  <td style={tdStyles}>
//                   <span
//                     style={{
//                       backgroundColor: item.freeWinGame? 'green' : 'red',
//                       color: 'white',
//                       padding: '5px 10px',
//                       borderRadius: '5px',
//                       textAlign: 'center',
//                       minWidth: '40px',
//                       display: 'inline-block',
//                     }}
//                     onClick={() => handleToggle(index, "freeWinGame")}
//                   >
//                     {item.freeWinGame ? 'Yes' : 'No'}
//                   </span>
//                 </td>

//                 {/* Update Button */}
//                 <td style={tdStyles}>
//                   <button
//                     style={{
//                       padding: "9px",
//                       textAlign: "left",
//                       borderBottom: "1px solid #ddd",
//                       color: "white",
//                       borderRadius: "9px",
//                       margin: "12px",
//                       marginLeft: "10px",
//                       cursor: "pointer",
//                       transition: "background-color 0.3s ease"
//                     }}
//                     onClick={() => handleSave(index)} // Update data when clicked
//                   >
//                     Update data
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="10" style={{ padding: "10px", textAlign: "center" }}>
//                 No results found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LudoPublicM;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ludopublicm.scss";

const LudoPublicM = ({ user, handleClose }) => {
  const [filteredData, setFilteredData] = useState([]); // Store filtered data based on search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  // State to manage the updated user data
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleGoBack = () => {
    localStorage.setItem("updatedUser", JSON.stringify(updatedUser));
    handleClose(); // Perform the close action
  };

  useEffect(() => {
    if (user) {
      setUpdatedUser(user); // Set initial values from the user props
      setLoading(false);
    } else {
      setError("No user data available");
      setLoading(false);
    }
  }, [user]);

  // Update field values when user changes the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Toggle function for Yes/No fields
  const handleToggle = (e) => {
    const { name } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  // Handle Update Data button click
  const handleUpdate = async (updatedUser) => {
    try {
      // Update the user data on the backend
      const response = await axios.patch(
        `http://147.93.27.170:3001/ludopublic/ludopublicctg/${updatedUser._id}`,
        updatedUser
      );

      if (response.status === 200) {
        alert("Data updated successfully!");

        // Update localStorage with the latest data after a successful update
        localStorage.setItem("updatedUser", JSON.stringify(updatedUser));

        // Update the filteredData state
        const updatedData = response.data;
        const updatedList = filteredData.map((data) =>
          data._id === updatedData._id ? updatedData : data
        );
        setFilteredData(updatedList);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Error updating data");
      setError("Error updating data");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Styling for table and columns
  const tableStyles = {
    width: "82vw",
    borderCollapse: "collapse",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "230px",
    tableLayout: "fixed",
  };

  const thStyles = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
    width: "10%", // Set a fixed width for the header cells
  
   };

  const tdStyles = {
    padding: "1px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    width: "15%", // Ensure this width matches <th> width
  };

  return (
    <div className="neev">
      <h3 className="lpm">
        More Info About The Ludo Public
        <button
          className="go-back-btn"
          style={{ marginLeft: "510px" }}
          // onClick={() => handleClose()}
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </h3>

      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Type</th>
            <th style={thStyles}>Online Player</th>

            <th style={thStyles}>isdelete</th>
            <th style={thStyles}>_ip</th>
            <th style={thStyles}>gst</th>
            <th style={thStyles}>play store</th>
            <th style={thStyles}>first_game</th>
            <th style={thStyles}>order</th>
            <th style={thStyles}>win amount</th>
            <th style={thStyles}>free win games</th>
            <th style={thStyles}></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyles}>
            <input
  type="text"
  name="type"
  value={updatedUser.type || "_"}
  onChange={handleChange}
  style={{
    border: "none",
    outline: "none",
    transition: "border 0.3s ease",
  }}
  onBlur={(e) => (e.target.style.border = "none")}
/>

            </td>
            <td style={tdStyles}>
            <input
  type="text"
  name="type"
  value={updatedUser.online_player || "_"}
  onChange={handleChange}
  style={{
    border: "none",
    outline: "none",
    transition: "border 0.3s ease",
  }}
  onBlur={(e) => (e.target.style.border = "none")}
/>

            </td>

            <td style={tdStyles}>
              <input
                type="text"
                name="isdelete"
                value={
                  updatedUser.isdelete !== undefined ? updatedUser.isdelete : ""
                } // Make sure isdelete is a number or a string
                onChange={handleChange}
                style={{
                  border: "none",
                  outline: "none",
                  transition: "border 0.3s ease",
                }}
                onBlur={(e) => (e.target.style.border = "none")}
              />
            </td>

            <td style={tdStyles}>
              <input
                type="text"
                name="_ip"
                value={updatedUser._ip ? "Yes" : "No"} // Convert to string
                style={{
                  border: "none",
                  width: "60px",
                  height: "25px",
                  borderRadius: "6px",
                  textAlign: "center",
                  backgroundColor: updatedUser._ip ? "green" : "red", // Set background color based on value
                  outline: "none",
                  transition: "border 0.3s ease",
                }}
                onClick={handleToggle}
                // onFocus={(e) => e.target.style.border = '2px solid #3498db'}
                onBlur={(e) => (e.target.style.border = "none")}
              />
            </td>

            <td style={tdStyles}>
              <input
                type="text"
                name="gst"
                value={updatedUser.gst || ""}
                onChange={handleChange}
                style={{
                  border: "none",
                  outline: "none",
                  transition: "border 0.3s ease",
                }}
                // onFocus={(e) => e.target.style.border = '2px solid #3498db'} // Add border on focus
                onBlur={(e) => (e.target.style.border = "none")} // Remove border when focus is lost
              />
            </td>

            <td style={tdStyles}>
              <input
                type="text"
                name="play_store"
                value={updatedUser.play_store ? "Yes" : "No"} // Convert to string
                style={{
                  border: "none",
                  width: "60px",
                  height: "25px",
                  borderRadius: "6px",
                  textAlign: "center",
                  backgroundColor: updatedUser.play_store ? "green" : "red", // Set background color based on value
                  outline: "none",
                  transition: "border 0.3s ease",
                }}
                onClick={handleToggle}
                onBlur={(e) => (e.target.style.border = "none")}
              />
            </td>

            <td style={tdStyles}>
              <input
                type="text"
                name="first_game"
                value={updatedUser.first_game ? "Yes" : "No"} // Convert to string
                style={{
                  border: "none",
                  width: "60px",
                  height: "25px",
                  borderRadius: "6px",
                  textAlign: "center",
                  backgroundColor: updatedUser.first_game ? "green" : "red", // Set background color based on value
                  outline: "none",
                  transition: "border 0.3s ease",
                }}
                onClick={handleToggle}
                onBlur={(e) => (e.target.style.border = "none")}
              />
            </td>

            <td style={tdStyles}>
              <input
                type="text"
                name="order"
                value={updatedUser.order || ""}
                onChange={handleChange}
                style={{
                  border: "none",
                  outline: "none",
                  transition: "border 0.3s ease",
                }}
                // onFocus={(e) => e.target.style.border = '2px solid #3498db'} // Add border on focus
                onBlur={(e) => (e.target.style.border = "none")} // Remove border when focus is lost
              />
            </td>

            <td style={tdStyles}>
              <input
                type="text"
                name="winAmount"
                value={
                  updatedUser.winAmount !== undefined
                    ? updatedUser.winAmount
                    : ""
                } // Make sure isdelete is a number or a string
                onChange={handleChange}
                style={{
                  border: "none",
                  outline: "none",
                  transition: "border 0.3s ease",
                }}
                onBlur={(e) => (e.target.style.border = "none")}
              />
            </td>

            <td style={tdStyles}>
              <input
                type="text"
                name="freeWinGame"
                value={updatedUser.freeWinGame ? "Yes" : "No"} // Convert to string
                style={{
                  border: "none",
                  width: "60px",
                  height: "25px",
                  borderRadius: "6px",
                  textAlign: "center",
                  backgroundColor: updatedUser.freeWinGame ? "green" : "red", // Set background color based on value
                  outline: "none",
                  transition: "border 0.3s ease",
                }}
                onClick={handleToggle}
                onBlur={(e) => (e.target.style.border = "none")}
              />
            </td>
            <button
              style={{
                padding: "4px",
                height: "30px",
                textAlign: "left",
                borderBottom: "1px solid #ddd",
                color: "white",
                borderRadius: "9px",
                margin: "5px",
                marginLeft: "5px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
              onClick={() => handleUpdate(updatedUser)} // Pass updatedUser, not the event
            >
              Update data
            </button>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LudoPublicM;
