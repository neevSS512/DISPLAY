import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/RechargeData.scss";
import { Search, Clear } from "@mui/icons-material"; 
import { useNavigate } from "react-router-dom"; 
import { IconButton } from "@mui/material";
import variables from "../styles/variables.scss";

const RechargeData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState(""); // The search query
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchRechargeData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/recharge/rechargeData');
        setData(response.data); 
        setFilteredData(response.data); // Initially set filtered data to all data
      } catch (err) {
        setError('Error fetching recharge data');
      } finally {
        setLoading(false);
      }
    };

    fetchRechargeData();
  }, []); 

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
    // Filter the data based on search query
    if (query) {
      setFilteredData(
        data.filter(
          (item) =>
            (item.username && item.username.toLowerCase().includes(query.toLowerCase())) ||
            (item.mobile_no && item.mobile_no.toLowerCase().includes(query.toLowerCase()))
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
    navigate("/Recharge"); // Navigate to the /RechargeData path
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const tableStylees = {
    width: "82vw",
    borderCollapse: "collapse",
    marginTop: "20px ",
    marginBottom:"20px",
    marginLeft:"230px"
  };

  const thStylees = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd"
  };

  const tdsStylees = {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    color: "rgb(103, 103, 249)"
  };

  const tdStylees = {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    whiteSpace:"nowrap"
  };

  const ctcStyles = {
    
    color: 'white',
    padding: '3px 8px',
    borderRadius: '5px',
    textAlign: 'center',
    minWidth: '28px',
    display: 'inline-block',
    fontSize:'15px',
    margin: '12px',
    borderBottom: '1px solid #ddd',
    backgroundColor: 'rgb(101, 216, 101)',
  };

  return (
    <div className='neev'>
      <h3 className='ur'>Recharge Details</h3>

      {/* Search bar with clear and search icons */}
      <div className="navbar_search" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search Game Users..."
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
        <p style={{ textAlign: "center", color: "green", marginTop: "10px" }}>
          {/* {filteredData.length} user(s) found matching your search. */}
          Found {filteredData.length} {filteredData.length === 1 ? "user" : "users"}. matching your search.
        </p>
      )}

      {/* Recharge data table */}
      <table style={tableStylees}>
        <thead>
          <tr>
            <th style={thStylees}>Order Id</th>
            <th style={thStylees}>UserName</th>
            <th style={thStylees}>Mobile No</th>
            <th style={thStylees}>Amount</th>
            <th style={thStylees}>Amount After GSt</th>
            <th style={thStylees}>Inclusive GSt</th>
            <th style={thStylees}>Previous Cash</th>
            <th style={thStylees}>Total Cash</th>
            <th style={thStylees}>cd_ist</th>
            <th style={thStylees}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff" }}>
                <td style={tdStylees}>{item.orderId}</td>
                <td style={tdStylees}>{item.username}</td>
                <td style={tdStylees}>{item.mobile_no}</td>
                <td style={tdsStylees}>{item.amount}</td>
                <td style={tdsStylees}>{item.amountAfterGst}</td>
                <td style={tdsStylees}>{item.InclusiveGst}</td>
                <td style={tdStylees}>{item.previous_cash}</td>
                <td style={tdStylees}>{item.after_cash}</td>
                <td style={tdStylees}>{item.cd_ist}</td>
                <td className='table-data'><button style={ctcStyles}>{item.txStatus}</button></td>
           
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: "10px", textAlign: "center" }}>No results found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RechargeData;




