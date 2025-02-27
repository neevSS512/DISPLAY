
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
    const query = e.target.value.trim();
    setSearch(query);
    // Filter the data based on search query
    if (query) {
      setFilteredData(
        data.filter(
          (item) =>
            (item.MobileNo && item.MobileNo.toLowerCase().startsWith(query.toLowerCase())) ||
            (item.UserName && item.UserName.toLowerCase().startsWith(query.toLowerCase()))
        )
      );
    } else {
      // If search is cleared, reset to show all data
      setFilteredData(data);
    }
  };

  const handleClearSearch = () => {
    setSearch(""); // Clear search field
    setFilteredData(data); // Show all data again
    navigate("/UserData"); // Navigate to the /UserData path
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


  const tabbleStylees={
    width: "82vw",
    borderCollapse: "collapse",
    marginTop: "20px ",
    marginBottom:"20px",
    marginLeft:"230px",
  }

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
        <p style={{ textAlign: "center", color: "gray", marginTop: "10px" }}>
          No users found matching your search.
        </p>
      )}

      {/* Display message if results are found */}
      {search && filteredData.length > 0 && (
        <p style={{ textAlign: "center", color: "green", marginTop: "10px", }}>
          Found {filteredData.length} {filteredData.length === 1 ? "user" : "users"}. matching your search.
        </p>
      )}

      <table style={tabbleStylees}>
        <thead>
          <tr>
            <th style={{ backgroundColor: "black", color: "white", padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Id</th>
            <th style={{ backgroundColor: "black", color: "white", padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Username</th>
            <th style={{ backgroundColor: "black", color: "white", padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>MobileNo</th>
            <th style={{ backgroundColor: "black", color: "white", padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>State</th>
            <th style={{ backgroundColor: "black", color: "white", padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Mobile_Verified</th>
            <th style={{ backgroundColor: "black", color: "white", padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Bank_Verified</th>
            <th style={{ backgroundColor: "black", color: "white", padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>Level</th>
            <th style={{ backgroundColor: "black", color: "white", padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}>B-Remarks</th>
            <th style={{ backgroundColor: "black", color: "white", padding: "10px", textAlign: "left", borderBottom: "2px solid #ddd" }}></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={item.Id} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff" }}>
                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item._id}</td>
                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item.UserName}</td>
                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd", whiteSpace: "nowrap" }}>{item.MobileNo}</td>
                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item.State}</td>
                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item.isMobileVerified ? 'Yes' : 'No'}</td>
                <td style={{ padding: "16px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item.isBankVerified ? 'Yes' : 'No'}</td>
                <td style={{ padding: "px", textAlign: "left", borderBottom: "1px solid #ddd" }}>{item.level}</td>
                <td className='table-data'> 
                <button
  style={{
    backgroundColor: item.BlockRemarks === "Yes" ? 'green' : 'red',
    color: 'white',
    padding: '3px 8px',
    borderRadius: '5px',
    textAlign: 'center',
    width: '48px', 
    minWidth: '28px',
    display: 'inline-block',
    fontSize: '15px',
    margin: '12px',
    borderBottom: '1px solid #ddd',
  }}
>
  {item.BlockRemarks}
</button>

                </td>
               <td className='table-data '>
               <button
                  style={{
                    padding: "4px",
                    width:"7vw",
                    textAlign: "center",
                    borderBottom: "1px solid #ddd",
                    color: "white",
                    borderRadius: "9px",
                    margin: "12px",
                    marginLeft: "2px",
                    marginRight:"1px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease"
                  }}
                  onClick={() => handleMoreInfo(item)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'rgb(70, 70, 72)'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'rgb(16, 28, 52)'}
                >
                  More Info
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
    </div>
  );
};

export default GameUserData;

