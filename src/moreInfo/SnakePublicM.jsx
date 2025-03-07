
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/snakepublicm.scss";

const SnakePublicM = ({ user, handleClose }) => {
   const [filteredData, setFilteredData] = useState([]); // Store filtered data based on search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
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
      setError('No user data available');
      setLoading(false);
    }
  }, [user]);
  



  

  // Update field values when user changes the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
    // Toggle function for Yes/No fields
    const handleToggle = (e) => {
      const { name } = e.target;
      setUpdatedUser(prevState => ({
        ...prevState,
        [name]: !prevState[name]
      }));
    };
  
  // Handle Update Data button click
  const handleUpdate = async (updatedUser) => {
    try {
      // Update the user data on the backend
      const response = await axios.patch(`http://localhost:3001/snakepublic/snakepublicctg/${updatedUser._id}`, updatedUser);
  
      if (response.status === 200) {
        alert('Data updated successfully!');
        
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
      console.error('Error updating data:', error);
      alert('Error updating data');
      setError('Error updating data'); 
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
    tableLayout: "fixed", // Ensure the table layout is fixed
  };
  

  const thStyles = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
    width: "10%",  // Set a fixed width for the header cells
  };
  
  const tdStyles = {
    padding: "1px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    width: "10%", // Set a fixed width for the table data cells
  };
  
  return (
    <div className="neev">
      <h3 className="spm">
        More Info About The Ludo Public
        <button 
          className="go-back-btn"
          style={{ marginLeft: '510px' }} 
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
                name="online_player"
                value={updatedUser.online_player || '_'}
                onChange={handleChange}
                style={{
                border: 'none',
                outline: 'none',
                transition: 'border 0.3s ease',
                 }}
           
               
                onBlur={(e) => e.target.style.border = 'none'} 
                />
            </td>
          
<td style={tdStyles}>
  <input
    type="text"
    name="isdelete"
    value={updatedUser.isdelete !== undefined ? updatedUser.isdelete : ''}
    onChange={handleChange}
    style={{
      border: 'none',
      outline: 'none',
      transition: 'border 0.3s ease',
    }}
    onBlur={(e) => e.target.style.border = 'none'} 
  />
</td>





<td style={tdStyles}>
  <input
    type="text"
    name="_ip"
    value={updatedUser._ip ? 'Yes' : 'No'}  // Convert to string
 
    style={{
      border: 'none',
      width: '60px',
      height: "25px",
      borderRadius:"6px",
      textAlign: 'center',
      backgroundColor: updatedUser._ip ? 'green' : 'red', 
      outline: 'none',
      transition: 'border 0.3s ease',
    }}
    onClick={handleToggle }
    onBlur={(e) => e.target.style.border = 'none'}
  />
</td>

           
            <td style={tdStyles}>
            <input
                type="text"
                name="gst"
                value={updatedUser.gst || ''}
                onChange={handleChange}
                style={{
                border: 'none',
                outline: 'none',
                transition: 'border 0.3s ease',
                 }}
                // onFocus={(e) => e.target.style.border = '2px solid #3498db'} // Add border on focus
                onBlur={(e) => e.target.style.border = 'none'} // Remove border when focus is lost
                />

            </td>
           
            <td style={tdStyles}>
  <input
    type="text"
    name="play_store"
    value={updatedUser.play_store ? 'Yes' : 'No'}  // Convert to string
   
    style={{
      border: 'none',
      width: '60px',
      height: "25px",
      borderRadius:"6px",
      textAlign: 'center',
      backgroundColor: updatedUser.play_store ? 'green' : 'red', // Set background color based on value
      outline: 'none',
      transition: 'border 0.3s ease',
    }}
    onClick={handleToggle }
    onBlur={(e) => e.target.style.border = 'none'}
  />
</td>
          
 
<td style={tdStyles}>
  <input
    type="text"
    name="first_game"
    value={updatedUser.first_game ? 'Yes' : 'No'}  // Convert to string
   
    style={{
      border: 'none',
      width: '60px',
      height: "25px",
      borderRadius:"6px",
      textAlign: 'center',
      backgroundColor: updatedUser.first_game ? 'green' : 'red', // Set background color based on value
      outline: 'none',
      transition: 'border 0.3s ease',
    }}
    onClick={handleToggle }
    onBlur={(e) => e.target.style.border = 'none'}
  />
</td>
           
            <td style={tdStyles}>
            <input
                type="text"
                name="order"
                value={updatedUser.order|| ''}
                onChange={handleChange}
                style={{
                border: 'none',
                outline: 'none',
                transition: 'border 0.3s ease',
                 }}
                // onFocus={(e) => e.target.style.border = '2px solid #3498db'} // Add border on focus
                onBlur={(e) => e.target.style.border = 'none'} // Remove border when focus is lost
                />

            </td>
    

<td style={tdStyles}>
  <input
    type="text"
    name="winAmount"
    value={updatedUser.winAmount !== undefined ? updatedUser.winAmount : ''}  // Make sure isdelete is a number or a string
    onChange={handleChange}
    style={{
      border: 'none',
      outline: 'none',
      transition: 'border 0.3s ease',
    }}
    onBlur={(e) => e.target.style.border = 'none'} 
  />
</td>

            <td style={tdStyles}>
  <input
    type="text"
    name="freeWinGame"
    value={updatedUser.freeWinGame? 'Yes' : 'No'}  // Convert to string
   
    style={{
     
      border: 'none',
      width: '60px',
      height: "25px",
      borderRadius:"6px",
      textAlign: 'center',
      backgroundColor: updatedUser.freeWinGame ? 'green' : 'red', // Set background color based on value
      outline: 'none',
      transition: 'border 0.3s ease',
    }}
    onClick={handleToggle }

    onBlur={(e) => e.target.style.border = 'none'}
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
    transition: "background-color 0.3s ease"
  }}
  onClick={() => handleUpdate(updatedUser)}  // Pass updatedUser, not the event
>
  Update data
</button>


          </tr>
        </tbody>
      </table>

    </div>
  );
};

export default SnakePublicM;
