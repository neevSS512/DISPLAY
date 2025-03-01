
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/DealData.scss";

const DealData = () => {
  const [filteredData, setFilteredData] = useState([]);  // Store filtered data
  const [loading, setLoading] = useState(true);           // Loading state
  const [error, setError] = useState('');                 // Error state
  const [editedRow, setEditedRow] = useState(null);       // Track which row is being edited
  const [editedField, setEditedField] = useState("");     // Track which field is being edited
    const [editingBorder, setEditingBorder] = useState(null); // Track which input field has a border

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/dealctg/dealctgData');
        console.log('Fetched data:', response.data); // Log data to verify it
        setFilteredData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data: ' + err.message);
        console.error('Error fetching data:', err);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
   // Empty dependency array to fetch data once

  // Handle row updates
  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await axios.patch(`http://localhost:3001/dealctg/dealctgData/${id}`, updatedData);
      if (response.status === 200) {
        setFilteredData((prevData) =>
          prevData.map((item) => (item._id === id ? { ...item, ...updatedData } : item))
        );
      }
    } catch (err) {
      console.error('Error updating data:', err);
    }
  };


  const handleCreateRow = () => {
    const newRow = {
      entryFee: 0,
      reke: 0,
      bonus: 0,
      mode: 'cash',
      deals: 0,
      use_bot: false,
      online_player: 0,
      leaderBoardScore: 0,
      play_store: true,
      _ip: true,
      freeWinGame: false,
    };
  
    // setFilteredData((prevData) => [...prevData, newRow]);  // Add new row locally
    setFilteredData((prevData) => [newRow, ...prevData]);
  };
  


  const handleSaveData = async () => {
    try {
      // Collect the new rows that don't have an `_id` (assuming `_id` is set on rows from the DB)
      const newRows = filteredData.filter(item => !item._id);
  
      // Save each new row to the database
      await Promise.all(
        newRows.map(async (newRow) => {
          const response = await axios.post('http://localhost:3001/dealctg/dealctgData', newRow);
          if (response.status === 201) {
            // After saving, update the row with the `_id` from the backend
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


  const handleDelete = async (id) => {
    // Show a confirmation dialog
    const isConfirmed = window.confirm("Do you want to delete this row?");
  
    if (isConfirmed) {
      try {
        console.log(`Deleting row with id: ${id}`);
        
        // Send the delete request to the backend
        const response = await axios.delete(`http://localhost:3001/dealctg/dealctgData/${id}`);
  
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
  
  


  

  // Handle field edit
  const handleEdit = (index, field) => {
    setEditedRow(index);
    setEditedField(field);
  };

  // Handle input change
  const handleInputChange = (event, index, field) => {
    const updatedItem = { ...filteredData[index], [field]: event.target.value };
    const newFilteredData = [...filteredData];
    newFilteredData[index] = updatedItem;
    setFilteredData(newFilteredData);
  };

  // Handle saving the data after editing  for automatic save
  // const handleSave = (index, field) => {
  //   const updatedItem = filteredData[index];
  //   handleUpdate(updatedItem._id, updatedItem);
  //   setEditedRow(null);  // Exit edit mode
  //   setEditedField("");
  // };



  const handleSave = (index) => {
    const updatedItem = filteredData[index];
    handleUpdate(updatedItem._id, updatedItem); // Trigger the update
    setEditedRow(null);  // Exit edit mode
    setEditedField("");  // Clear the edited field state
  };
  
  

  // Handle toggling boolean fields
  const handleToggle = (index, field) => {
    const newFilteredData = [...filteredData];
    newFilteredData[index] = {
      ...newFilteredData[index],
      [field]: !newFilteredData[index][field],  // Toggle the boolean value
    };
    setFilteredData(newFilteredData);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Table styling
  const tableStyles = {
    width: "82vw",
    borderCollapse: "collapse",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "230px"
  };

  const thStyles = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
    whiteSpace: "nowrap",
  };

  const tdStyles = {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd"
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

const handleBlur = () => {
  setEditedRow(null);
  setEditedField("");
  setEditingBorder(null);
};

const handleMouseLeave = () => {
  setEditedRow(null);
  setEditedField(""); // Reset the edited field to null
  setEditingBorder(null); // Reset the border
};

  return (
    <div className="neev">
      <h3 className="upa">
        Deal Details
        <button className="btn-z" onClick={handleCreateRow}>Create Data</button>
        <button className="btn-v"  onClick={handleSaveData}>Save Data</button>
      </h3>

      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Entry Fee</th>
            <th style={thStyles}>Reke</th>
            <th style={thStyles}>Bonus</th>
            <th style={thStyles}>Mode</th>
            <th style={thStyles}>Deals</th>
            <th style={thStyles}>Use Bot</th>
            <th style={thStyles}>Online Players</th>
            <th style={thStyles}>Leaderboard Score</th>
            <th style={thStyles}>Play Store</th>
            <th style={thStyles}>IP</th>
            <th style={thStyles}>Free Win Game</th>
            <th style={thStyles}></th>
            <th style={thStyles}></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff" }}>
                <td style={tdStyles}>
                  {editedRow === index && editedField === "entryFee" ? (
                    <input
                      type="number"
                      value={item.entryFee || ''}
                      onChange={(e) => handleInputChange(e, index, 'entryFee')}
                      onBlur={handleBlur}  // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave}  // Trigger handleMouseLeave when the mouse leaves the input field
                      style={editingBorder === index ? { border: "2px solid blue" } : {}}
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "entryFee")}>{item.entryFee || 'N/A'}</span>
                  )}
                </td>

                <td style={tdStyles}>
                  {editedRow === index && editedField === "reke" ? (
                    <input
                      type="number"
                      value={item.reke || ''}
                      onChange={(e) => handleInputChange(e, index, 'reke')}
                      onBlur={handleBlur}  // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave}  // Trigger handleMouseLeave when the mouse leaves the input field
                      style={editingBorder === index ? { border: "2px solid blue" } : {}}
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "reke")}>{item.reke || 'N/A'}</span>
                  )}
                </td>

                <td style={tdStyles}>
                  {editedRow === index && editedField === "bonus" ? (
                    <input
                      type="number"
                      value={item.bonus || ''}
                      onChange={(e) => handleInputChange(e, index, 'bonus')}
                      onBlur={handleBlur}  // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave}  // Trigger handleMouseLeave when the mouse leaves the input field
                      style={editingBorder === index ? { border: "2px solid blue" } : {}}
                      
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "bonus")}>{item.bonus || 'N/A'}</span>
                  )}
                </td>

                
                <td style={tdStyles}>
                  {editedRow === index && editedField === "mode" ? (
                    <input
                      type="string"
                      value={item.mode || ''}
                      onChange={(e) => handleInputChange(e, index, 'mode')}
                      onBlur={handleBlur}  // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave}  // Trigger handleMouseLeave when the mouse leaves the input field
                      style={editingBorder === index ? { border: "2px solid blue" } : {}}
                      
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "mode")}>{item.mode || 'N/A'}</span>
                  )}
                </td>


                <td style={tdStyles}>
                  {editedRow === index && editedField === "deals" ? (
                    <input
                      type="number"
                      value={item.deals || ''}
                      onChange={(e) => handleInputChange(e, index, 'deals')}
                      onBlur={handleBlur}  // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave}  // Trigger handleMouseLeave when the mouse leaves the input field
                      style={editingBorder === index ? { border: "2px solid blue" } : {}}
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "deals")}>{item.deals || 'N/A'}</span>
                  )}
                </td>

                <td style={tdStyles}>
                  <span
                    style={{
                      backgroundColor: item.use_bot ? 'green' : 'red',
                      color: 'white',
                      padding: '3px 8px',
                      borderRadius: '5px',
                      textAlign: 'center',
                      minWidth: '34px',
                      display: 'inline-block',
                    }}
                    onClick={() => handleToggle(index, "use_bot")}
                    
                  >
                    {item.use_bot ? 'Yes' : 'No'}

                    
                  </span>
                </td>

                <td style={tdStyles}>
                  {editedRow === index && editedField === "online_player" ? (
                    <input
                      type="number"
                      value={item.online_player || ''}
                      onChange={(e) => handleInputChange(e, index, 'online_player')}
                      onBlur={handleBlur}  // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave}  // Trigger handleMouseLeave when the mouse leaves the input field
                      style={editingBorder === index ? { border: "2px solid blue" } : {}}
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "online_player")}>{item.online_player || 'N/A'}</span>
                  )}
                </td>

                <td style={tdStyles}>
                  {editedRow === index && editedField === "leaderBoardScore" ? (
                    <input
                      type="number"
                      value={item.leaderBoardScore || ''}
                      onChange={(e) => handleInputChange(e, index, 'leaderBoardScore')}
                      onBlur={handleBlur}  // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave}  // Trigger handleMouseLeave when the mouse leaves the input field
                      style={editingBorder === index ? { border: "2px solid blue" } : {}}
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "leaderBoardScore")}>{item.leaderBoardScore || 'N/A'}</span>
                  )}
                </td>

            


                <td style={tdStyles}>
                  <span
                    style={{
                      backgroundColor: item.play_store ? 'green' : 'red',
                      color: 'white',
                      padding: '3px 8px',
                      borderRadius: '5px',
                      textAlign: 'center',
                      minWidth: '34px',
                      display: 'inline-block',
                    }}
                    onClick={() => handleToggle(index, "play_store")}
                  >
                    {item.play_store ? 'Yes' : 'No'}
                  </span>
                </td>
                <td style={tdStyles}>
                  <span
                    style={{
                      backgroundColor: item._ip ? 'green' : 'red',
                      color: 'white',
                      padding: '3px 8px',
                      borderRadius: '5px',
                      textAlign: 'center',
                      minWidth: '34px',
                      display: 'inline-block',
                    }}
                    onClick={() => handleToggle(index, "_ip")}
                  >
                    {item._ip ? 'Yes' : 'No'}
                  </span>
                </td>


                <td style={tdStyles}>
                  <span
                    style={{
                      backgroundColor: item.freeWinGame ? 'green' : 'red',
                      color: 'white',
                      padding: '3px 8px',
                      borderRadius: '5px',
                      textAlign: 'center',
                      minWidth: '34px',
                      display: 'inline-block',
                    }}
                    onClick={() => handleToggle(index, "freeWinGame")}
                  >
                    {item.freeWinGame ? 'Yes' : 'No'}
                  </span>
                </td>

                <td className='table-data'>  
               <button
                    style={buttonStyles}
                    onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(70, 70, 72)'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(16, 28, 52)'}
                    onClick={() => handleSave(index)} 
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
              <td colSpan="12" style={{ textAlign: "center", padding: "20px" }}>
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DealData;

