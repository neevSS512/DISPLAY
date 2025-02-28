import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/RechargeData.scss";
import { Search, Clear } from "@mui/icons-material"; 
import { useNavigate } from "react-router-dom"; 
import { IconButton } from "@mui/material";
import variables from "../styles/variables.scss";

const RechargeData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchRechargeData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/recharge/rechargeData');
        setData(response.data); 
        setFilteredData(response.data); 
      } catch (err) {
        setError('Error fetching recharge data');
      } finally {
        setLoading(false);
      }
    };

    fetchRechargeData();
  }, []); 

  const handleSearchChange = (e) => {
    const query = e.target.value.trim()
    setSearch(query);
   
    if (query) {
      setFilteredData(
        data.filter(
          (item) =>
            (item.orderId && item.orderId.toLowerCase().startsWith(query.toLowerCase())) ||
            (item.mobile_no && item.mobile_no.toLowerCase().startsWith(query.toLowerCase()))||
            (item.txStatus && item.txStatus.toLowerCase().startsWith(query.toLowerCase()))
        )
      );
    } else {
   
      setFilteredData(data);
    }
  };

  const handleClearSearch = () => {
    setSearch(""); 
    setFilteredData(data); // Show all data again
    navigate("/Recharge");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
          <p className="no-results-r">
             No users found matching your search.
          </p>
         )}

      {/* Display message if results are found */}
      {search && filteredData.length > 0 && (
          <p className="search-result-r">
          Found {filteredData.length} {filteredData.length === 1 ? "user" : "users"} matching your search.
          </p>
       )}


      {/* Recharge data table */}
<table className="table-styles-r">
  <thead>
    <tr>
      <th className="th-styles-r">Order Id</th>
      <th className="th-styles-r">UserName</th>
      <th className="th-styles-r">Mobile No</th>
      <th className="th-styles-r">Amount</th>
      <th className="th-styles-r">Amount After GSt</th>
      <th className="th-styles-r">Inclusive GSt</th>
      <th className="th-styles-r">Previous Cash</th>
      <th className="th-styles-r">Total Cash</th>
      <th className="th-styles-r">cd_ist</th>
      <th className="th-styles-r">Status</th>
    </tr>
  </thead>
  <tbody>
    {filteredData.length > 0 ? (
      filteredData.map((item, index) => (
        <tr key={index} className={index % 2 === 0 ? "table-row-even-r" : "table-row-odd-r"}>
          <td className="td-styles-r">{item.orderId}</td>
          <td className="td-styles-r">{item.username}</td>
          <td className="td-styles-r">{item.mobile_no}</td>
          <td className="tds-styles-r">{item.amount}</td>
          <td className="tds-styles-r">{item.amountAfterGst}</td>
          <td className="tds-styles-r">{item.InclusiveGst}</td>
          <td className="td-styles-r">{item.previous_cash}</td>
          <td className="td-styles-r">{item.after_cash}</td>
          <td className="td-styles-r">{item.cd_ist}</td>
          <td className="table-data">
            {/* <button className="ctc-styles-r">{item.txStatus}</button> */}
            <button
  className={`ctc-styles-r ${item.txStatus.toLowerCase() === "pending" ? "pending-status" : ""}`}
>
  {item.txStatus}
</button>

          </td>
        </tr>
            ))
          ) : (
            <tr>
  <td colSpan="7" className="no-results-cell-r">
    No results found.
  </td>
</tr>

          )}
        </tbody>
      </table>
    </div>
  );
};

export default RechargeData;




