
import React, { useEffect, useState } from 'react';
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (showUserData && selectedUser) {
    return <UserData user={selectedUser} handleClose={handleCloseUserData} />;
  }

    const handleUpdate = async (id, updatedData) => {
      try {
        const response = await axios.patch(`http://localhost:3001/gameuser/gameUsers/${id}`, updatedData);
        if (response.status === 200) {
          setFilteredData((prevData) =>
            prevData.map((item) => (item._id === id ? { ...item, ...updatedData } : item))
          );
        }
      } catch (err) {
        console.error('Error updating data:', err);
      }
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
               <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item.un}</td>
               <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd",whiteSpace:"nowrap" }}>{item.MobileNo}</td>
               <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd",whiteSpace:"nowrap" }}>{item.State}</td>
               <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item.isPanVerified }</td>
               <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item.isAadharVerified }</td>
               <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item.isBankVerified}</td>
               <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item.flags._isBlock}</td>
    
                
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
                    onClick={() => handleUpdate(item)} 
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






