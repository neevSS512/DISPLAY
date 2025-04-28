
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SnakeCounterM from "../moreInfo/SnakeCounterM";
import "../styles/snakecounter.scss";

const SnakeCounterData = () => {
  const [filteredData, setFilteredData] = useState([]); // Store filtered data based on search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserData, setShowUserData] = useState(false);
   // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page
  const handleCreateRow = () => {
    const newRow = {
      entryFee: '0',  // String type (according to schema)
      bonus: 0,       // Number type
      type: 'CASH',   // String type
      botsAllowed: false,  // Boolean type
      rake: 0,        // Number type
      allowedPlayer: 0, // Number type
      online_player: 0,   // Number type
      prizeDistributionRatio: [
        {
          rank: 1,        // Number type, setting default rank to 1
          prizeRatio: 0,  // Number type, setting default prize ratio to 0
        },
      ],
      modeType: 'CASH',  // String type
      targetScore: null, // Can be null or any value
      isdelete: 0,      // Number type
      _ip: false,       // Boolean type
      gst: 0,           // Number type
      play_store: false,  // Boolean type
      first_game: false,  // Boolean type
      order: 0,         // Number type
      winAmount: 0,     // Number type
      online_playerForTwo:0, //Number type
      leaderBoardScore: 0, // Number type
      freeWinGame: false, // Boolean type
    };
    setFilteredData((prevData) => [newRow, ...prevData]);
  };
  

  // Fetch game user data
  useEffect(() => {
    const fetchGameuserData = async () => {
      try {
        const response = await axios.get('http://147.93.27.170:3001/snakecounter/snakecounterctg');
        setFilteredData(response.data); // Initially set filtered data to all data
      } catch (err) {
        setError('Error fetching gameuser data');
      } finally {
        setLoading(false);
      }
    };
    fetchGameuserData();
  }, []);


  const handleSaveData = async () => {
    try {
      console.log('Filtered data before saving:', filteredData);
  
      const newRows = filteredData.filter(item => !item._id);
  
      await Promise.all(
        newRows.map(async (newRow) => {
          console.log('New Row Data:', newRow); // Log each new row
  
          const response = await axios.post('http://147.93.27.170:3001/snakecounter/snakecounterctg', newRow);
  
          if (response.status === 201) {
            setFilteredData((prevData) =>
              prevData.map((item) =>
                item === newRow ? { ...newRow, _id: response.data._id } : item
              )
            );
          }
        })
      );
  
      alert('Data saved successfully');
    } catch (err) {
      console.error('Error saving data:', err);
    }
  };
  

  const handleMoreInfo = (user) => {
    setSelectedUser(user);
    setShowUserData(true);
  };

  const handleCloseUserData = () => {
    setSelectedUser(null);
    setShowUserData(false);
  };

 
  const handleChange = (e, index, field, prizeIndex) => {
    const newData = [...filteredData];
    
    if (field === 'rank' || field === 'prizeRatio') {
      // Update the rank or prizeRatio in prizeDistributionRatio array
      newData[index].prizeDistributionRatio[prizeIndex][field] = e.target.value;
    } else {
      // For other fields
      newData[index][field] = e.target.value;
    }
    
    setFilteredData(newData);
  };
  


  const updateData = async (item) => {
    try {
      // Update data with correct field `_id`
      const updatedUser = {
        entryFee: item.entryFee,
        bonus: item.bonus,
        botsAllowed: item.botsAllowed,
        rake: item.rake,
        allowedPlayer: item.allowedPlayer,
        online_playerForTwo:item.online_playerForTwo,
        modeType: item.modeType,
        leaderBoardScore: item.leaderBoardScore,
        prizeDistributionRatio: item.prizeDistributionRatio, // Add this line to include prizeDistributionRatio
     
      };
      
  
      const response = await axios.patch(`http://147.93.27.170:3001/snakecounter/snakecounterctg/${item._id}`, updatedUser);
  
      if (response.status === 200) {
        alert('Data updated successfully!');
        // Update filteredData in frontend with the new data
        const updatedData = response.data;
        const updatedList = filteredData.map((data) =>
          data._id === updatedData._id ? updatedData : data
        );
        setFilteredData(updatedList);
      }
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating data');
    }
  };
 // Handle input changes for editable fields, including the toggle for 'botsAllowed'
 const handleToggle = (e, index, field) => {
  const newData = [...filteredData];
  newData[index][field] = !newData[index][field]; // Toggle the value
  console.log("Updated botsAllowed:", newData[index][field]); // Debugging the toggle value
  setFilteredData(newData);
};

  
const handleDelete = async (id) => {
  // Show a confirmation dialog
  const isConfirmed = window.confirm("Do you want to delete this row?");

  if (isConfirmed) {
    try {
      console.log(`Deleting row with id: ${id}`);
      
      // Send the delete request to the backend
      const response = await axios.delete(`http://147.93.27.170:3001/snakecounter/snakecounterctg/${id}`);

      // Log the response to check if the request was successful
      console.log('Delete Response:', response);

      // Update the state to remove the deleted item from the table
      setFilteredData((prevData) => {
        const updatedData = prevData.filter(item => item._id !== id);
        console.log('Updated Data after Deletion:', updatedData); // Log the updated data
        return updatedData;
      });

      // Show a success alert
      showAlert('Row deleted successfully');
    } catch (err) {
      console.error('Error deleting data:', err);
      // Show an error alert
      showAlert('Failed to delete row');
    }
  } else {
    // Show a cancellation alert
    showAlert('Deletion cancelled');
  }
};

const showAlert = (message) => {
  // Create a div for the alert message
  const alertDiv = document.createElement('div');
  alertDiv.textContent = message;
  alertDiv.style.position = 'fixed';
  alertDiv.style.top = '4%';
  alertDiv.style.left = '50%';
  alertDiv.style.transform = 'translateX(-50%)'; // Center horizontally
  alertDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
  alertDiv.style.color = 'white';
  alertDiv.style.padding = '8px 20px'; // Reduced padding to reduce height
  alertDiv.style.borderRadius = '5px';
  alertDiv.style.zIndex = '9999';
  alertDiv.style.fontSize = '16px'; // Reduced font size
  alertDiv.style.fontWeight = 'bold';
  alertDiv.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
  alertDiv.style.transition = 'opacity 0.5s ease-out'; // Fade out effect

  // Append the alert to the body
  document.body.appendChild(alertDiv);

  // Remove the alert after 1.5 seconds
  setTimeout(() => {
    alertDiv.style.opacity = '0'; // Apply the fade-out effect
    setTimeout(() => {
      document.body.removeChild(alertDiv);
    }, 500); // Allow the fade-out transition to complete before removing
  }, 1500);
};
const tableStyles = {
  width: "82vw",
  borderCollapse: "collapse",
  marginTop: "20px",
  marginBottom: "20px",
  marginLeft: "230px",
  border: "none", // Ensure no border is applied to the whole table
 
};

  const thStyles = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
    whiteSpace: "nowrap",  // Prevent wrapping
    width: "auto",  // Set specific widths if necessary
  };
  
  
  const tdStyles = {
    padding: "1px",
    margin: "12px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",  // Keep the bottom border, remove vertical borders
  };
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
   // Pagination logic
   const indexOfLastRow = currentPage * rowsPerPage;
   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
   const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
 
   const handleNextPage = () => {
     if (currentPage < Math.ceil(filteredData.length / rowsPerPage)) {
       setCurrentPage(currentPage + 1);
     }
   };
 
   const handlePreviousPage = () => {
     if (currentPage > 1) {
       setCurrentPage(currentPage - 1);
     }
   };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (showUserData && selectedUser) {
    return <SnakeCounterM user={selectedUser} handleClose={handleCloseUserData} />;
  }


  return (
    <div className="neev">
      <h3 className="sc">Snake Rapid


      <button className="btn-s" onClick={handleCreateRow} >Create Data</button>
      <button className="btn-x" onClick={handleSaveData} >Save Data</button>
      </h3>
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

      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Entry Fee</th>
            <th style={thStyles}>Bonus</th>
            <th style={thStyles}>botsAllowed</th>
            <th style={thStyles}>Reke</th>
            <th style={thStyles}>allowedPlayer</th>
            <th style={thStyles}>rank</th>
            <th style={thStyles}>prizeRatio</th>
            {/* <th style={thStyles}>online_playerForTwo</th> */}

            <th style={thStyles}>modeType</th>
            <th style={thStyles}>Leaderboard Score</th>
            <th style={thStyles}></th>
            <th style={thStyles}></th>
            <th style={thStyles}></th>
          </tr>
        </thead>
        <tbody>
          {/* {filteredData.length > 0 ? (
            filteredData.map((item, index) => ( */}
             {currentRows.length > 0 ? (
            currentRows.map((item, index) => (
              <tr key={item.Id} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff" }}>
            
            <td style={tdStyles}>


<input
  type="text"
  value={item.entryFee}
  onChange={(e) => handleChange(e, index, 'entryFee')}
  style={{
    width: '74px',
    height: '23px',
    border: '1px solid transparent',  // Start with a transparent border
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'inherit',
    textAlign: 'center',
    boxSizing: 'border-box',  // Ensure border doesn't affect size
  }}
  onFocus={(e) => e.target.style.border = '2px solid black'}  // Add border on focus
  onBlur={(e) => e.target.style.border = '1px solid transparent'}  // Remove border when focus is lost
/>

</td>


                   
<td style={tdStyles}>
  <input
    type="text"
    value={item.bonus}
    onChange={(e) => handleChange(e, index, 'bonus')}

    // onFocus={(e) => e.target.select()} // Optional: Select text when the field is focused
    style={{
      width: '74px',
      height: '23px',
      border: '1px solid transparent',  // Start with a transparent border
      outline: 'none',
      backgroundColor: 'transparent',
      color: 'inherit',
      textAlign: 'center',
      boxSizing: 'border-box',  // Ensure border doesn't affect size
    }}
    onFocus={(e) => e.target.style.border = '2px solid black'}  // Add border on focus
    onBlur={(e) => e.target.style.border = '1px solid transparent'}  // Remove border when focus is lost
      // onFocus={(e) => e.target.select()} // Optional: Select text when the field is focused
  />
</td>

<td style={tdStyles}>
  <button
    onClick={(e) => handleToggle(e, index, 'botsAllowed')}
    style={{
      width: '50px',
      height: "25px",
      backgroundColor: item.botsAllowed ? 'green' : 'red',
      color: 'black',
      borderRadius: "6px",
      textAlign: 'center',
      border: 'none',
      cursor: 'pointer',
      fontWeight: 'bold',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {item.botsAllowed ? 'Yes' : 'No'}
  </button>
</td>


                           
<td style={tdStyles}>
  <input
    type="number"
    value={item.rake}
    onChange={(e) => handleChange(e, index, 'rake')}
    style={{
      width: '74px',
      height: '23px',
      border: '1px solid transparent',  // Start with a transparent border
      outline: 'none',
      backgroundColor: 'transparent',
      color: 'inherit',
      textAlign: 'center',
      boxSizing: 'border-box',  // Ensure border doesn't affect size
    }}
    onFocus={(e) => e.target.style.border = '2px solid black'}  // Add border on focus
    onBlur={(e) => e.target.style.border = '1px solid transparent'}  // Remove border when focus is lost
  />
</td>

                           
<td style={tdStyles}>
  <input
    type="text"
    value={item.allowedPlayer}
    onChange={(e) => handleChange(e, index, 'allowedPlayer')}
    style={{
      width: '74px',
      height: '23px',
      border: '1px solid transparent',  // Start with a transparent border
      outline: 'none',
      backgroundColor: 'transparent',
      color: 'inherit',
      textAlign: 'center',
      boxSizing: 'border-box',  // Ensure border doesn't affect size
    }}
    onFocus={(e) => e.target.style.border = '2px solid black'}  // Add border on focus
    onBlur={(e) => e.target.style.border = '1px solid transparent'}  // Remove border when focus is lost
  />
</td>


<td style={tdStyles}>
  {item.prizeDistributionRatio.map((prize, prizeIndex) => (
    <div key={prizeIndex}>
      <input
        type="text"
        value={prize.rank}
        onChange={(e) => handleChange(e, index, 'rank', prizeIndex)}
        style={{
          width: '74px',
          height: '23px',
          border: '1px solid transparent',  // Start with a transparent border
          outline: 'none',
          backgroundColor: 'transparent',
          color: 'inherit',
          textAlign: 'center',
          boxSizing: 'border-box',  // Ensure border doesn't affect size
        }}
        onFocus={(e) => e.target.style.border = '2px solid black'}  // Add border on focus
        onBlur={(e) => e.target.style.border = '1px solid transparent'}  // Remove border when focus is lost
      />
    </div>
  ))}
</td>

<td style={tdStyles}>
  {item.prizeDistributionRatio.map((prize, prizeIndex) => (
    <div key={prizeIndex}>
      <input
        type="text"
        value={prize.prizeRatio}
        onChange={(e) => handleChange(e, index, 'prizeRatio', prizeIndex)}
        style={{
          width: '74px',
          height: '23px',
          border: '1px solid transparent',  // Start with a transparent border
          outline: 'none',
          backgroundColor: 'transparent',
          color: 'inherit',
          textAlign: 'center',
          boxSizing: 'border-box',  // Ensure border doesn't affect size
        }}
        onFocus={(e) => e.target.style.border = '2px solid black'}  // Add border on focus
        onBlur={(e) => e.target.style.border = '1px solid transparent'}  // Remove border when focus is lost
      />
    </div>
  ))}
</td>


<td style={tdStyles}>
  <input
    type="text"
    value={item.modeType}
    onChange={(e) => handleChange(e, index, 'modeType')}
    style={{
      width: '74px',
      height: '23px',
      border: '1px solid transparent',  // Start with a transparent border
      outline: 'none',
      backgroundColor: 'transparent',
      color: 'inherit',
      textAlign: 'center',
      boxSizing: 'border-box',  // Ensure border doesn't affect size
    }}
    onFocus={(e) => e.target.style.border = '2px solid black'}  // Add border on focus
    onBlur={(e) => e.target.style.border = '1px solid transparent'}  // Remove border when focus is lost
  />
</td>
<td style={tdStyles}>
  <input
    type="text"
    value={item.leaderBoardScore}
    onChange={(e) => handleChange(e, index, 'leaderBoardScore')}
    style={{
      width: '74px',
      height: '23px',
      border: '1px solid transparent',  // Start with a transparent border
      outline: 'none',
      backgroundColor: 'transparent',
      color: 'inherit',
      textAlign: 'center',
      boxSizing: 'border-box',  // Ensure border doesn't affect size
    }}
    onFocus={(e) => e.target.style.border = '2px solid black'}  // Add border on focus
    onBlur={(e) => e.target.style.border = '1px solid transparent'}  // Remove border when focus is lost
  />
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
               <button
                    style={buttonStyles}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(70, 70, 72)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(16, 28, 52)'}
                    onClick={() => updateData(item)}  // Call the update function when clicked
              >
               Update
              </button>
              </td>   

    <td className='table-data'>
  <button
    style={buttonStyles}
    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(70, 70, 72)'}
    onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(16, 28, 52)'}
    onClick={() => handleDelete(item._id)}  // Pass the item's _id here
  >
    Delete
  </button>
</td>
          
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ padding: "10px", textAlign: "center" }}>No results found.</td>
            </tr>
          )}
        </tbody>
      </table>
       {/* Pagination Controls */}
       <div style={{ marginLeft: "1200px" }}>
        {/* Previous button */}
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} style={{ height: "27px", fontSize: "14px", marginBottom: "4px" }}>
            Previous
          </button>
        )}

        <span style={{ whiteSpace: "nowrap" }}>
          Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
        </span>

        {/* Next button */}
        {currentPage < Math.ceil(filteredData.length / rowsPerPage) && (
          <button onClick={handleNextPage} style={{ height: "27px", fontSize: "14px", marginBottom: "12px" }}>
            Next
          </button>
        )}
      </div>
    </div>
  );
};
export default SnakeCounterData;