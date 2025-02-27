import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/Kyc.scss";
import { Search, Clear } from "@mui/icons-material"; // Import Clear icon
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import variables from "../styles/variables.scss";

export default function KycData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKycData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/kyc/kycData');
        if (response.data && Array.isArray(response.data)) {
          setData(response.data);
          setFilteredData(response.data); // Initialize filtered data
        } else {
          setError('No data found');
        }
      } catch (err) {
        setError('Error fetching KYC data');
      } finally {
        setLoading(false);
      }
    };

    fetchKycData();
  }, []);

  // Handle Search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    if (query) {
      setFilteredData(
        data.filter((item) =>
          (item?.phn && item.phn.toLowerCase().includes(query.toLowerCase())) ||
          item.details.name_on_card.toLowerCase().includes(query.toLowerCase()) || 
          item.details.fathers_name.toLowerCase().includes(query.toLowerCase()) || 
          item.id_number.toLowerCase().includes(query.toLowerCase()) // Add any other search conditions here
        )
      );
    } else {
      setFilteredData(data); // If search is cleared, show all data
    }
  };

  // Clear Search functionality
  const handleClearSearch = () => {
    setSearch('');
    setFilteredData(data); // Reset to show all data
  };

  // Loading and error handling
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const tabbleStyles = {
    width: "82vw",
    borderCollapse: "collapse",
    marginTop: "20px ",
    marginBottom:"20px",
    marginLeft:"230px"
  };

  const thStyyles = {
    backgroundColor: "black",
    color: "white",
    padding: "4px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  };

  const tdStyyles = {
    padding: "18px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    verticalAlign: "middle",
    wordWrap: "break-word",
    whiteSpace: "nowrap",
  };

  const yesStyle = {
    color: 'white',
    backgroundColor:'green',
    padding: '3px 8px',
    borderRadius: '5px',
    textAlign: 'center',
    minWidth: '34px',
    display: 'inline-block',
   
  };

  const noStyle = {
    color: 'white',
    backgroundColor:'red',
    padding: '3px 8px',
    borderRadius: '5px',
    textAlign: 'center',
    minWidth: '34px',
    display: 'inline-block',
  };

  const evenRowStyle = {
    backgroundColor: "#f2f2f2",
  };

  const oddRowStyle = {
    backgroundColor: "#ffffff",
  };

  return (
    <div className='neev'>
      <h3 className='fi'>KYC Details About The User</h3>

      {/* Search bar with clear and search icons */}
      <div className="navbar_search" style={{ position: 'relative', width: '50%', marginLeft: '200px' }}>
        <input
          type="text"
          placeholder="Search Game Users..."
          value={search}
          onChange={handleSearchChange}
          style={{
            padding: "10px 12px",
            fontSize: "14px",
            width: "50%",
            backgroundColor: "#f4f4f4",
            color: "#333",
            borderRadius: "20px",
            border: "1px solid #ddd",
            marginLeft:"1px"
          }}
        />

        {/* Clear Icon Button */}
        <IconButton
          disabled={search === ""}
          onClick={handleClearSearch}
          style={{
            position: "absolute",
            right: "60px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Clear sx={{ color: variables.pinkred }} />
        </IconButton>

        {/* Search Icon Button */}
        <IconButton
          disabled={search === ""}
          onClick={() => { navigate(`/properties/search/${search}`); }}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
          }}
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
        <p style={{ textAlign: "center", color: "green", marginTop: "10px" }}>
          Found {filteredData.length} {filteredData.length === 1 ? "user" : "users"} matching your search.
        </p>
      )}

      {/* KYC data table */}
      <table style={tabbleStyles}>
        <thead>
          <tr>
            <th style={thStyyles}>Id</th>
            <th style={thStyyles}>Mobile No</th>
            <th style={thStyyles}>Type</th>
            <th style={thStyyles}>Name On Card</th>
            <th style={thStyyles}>Father's Name</th>
            <th style={thStyyles}>Id Number</th>
            <th style={thStyyles}>CD IST</th>
            <th style={thStyyles}>Is Verified</th>
            <th style={thStyyles}>Is Rejected</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr
                key={index}
                style={index % 2 === 0 ? evenRowStyle : oddRowStyle}
              >
                <td style={tdStyyles}>{item.id || 'N/A'}</td>
                <td style={tdStyyles}>{item.phn || 'N/A'}</td>
                <td style={tdStyyles}>{item.type || 'N/A'}</td>
                <td style={tdStyyles}>{item.details.name_on_card || 'N/A'}</td>
                <td style={tdStyyles}>{item.details.fathers_name || 'N/A'}</td>
                <td style={tdStyyles}>{item.id_number || 'N/A'}</td>
                <td style={tdStyyles}>{item.cd_ist || 'N/A'}</td>
                <td style={tdStyyles}>
                  <span style={item.isVerified ? yesStyle : noStyle}>
                    {item.isVerified ? 'Yes' : 'No'}
                  </span>
                </td>
                <td style={tdStyyles}>
                  <span style={item.isRejected ? yesStyle : noStyle}>
                    {item.isRejected ? 'Yes' : 'No'}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ padding: "10px", textAlign: "center" }}>
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
