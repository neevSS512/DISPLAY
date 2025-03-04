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
    const query = e.target.value.trim()
    setSearch(query);
    if (query) {
      setFilteredData(
        data.filter((item) =>
          (item?.phn && item.phn.toLowerCase().startsWith(query.toLowerCase())) ||
          item.details.name_on_card.toLowerCase().startsWith(query.toLowerCase()) || 
          item.id_number.toLowerCase().startsWith(query.toLowerCase()) // Add any other search conditions here
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
          <p className="no-results-k">
             No users found matching your search.
          </p>
         )}

      {/* Display message if results are found */}
      {search && filteredData.length > 0 && (
          <p className="search-result-k">
          Found {filteredData.length} {filteredData.length === 1 ? "user" : "users"} matching your search.
          </p>
       )}

      {/* KYC data table */}
      <table className='table-style-k' >
        <thead>
          <tr>
          <th className="th-style-k">Id</th>
          <th className="th-style-k">Mobile No</th>
<th className="th-style-k">Type</th>
<th className="th-style-k">Name On Card</th>
<th className="th-style-k">Father's Name</th>
<th className="th-style-k">Id Number</th>
<th className="th-style-k">CD IST</th>
<th className="th-style-k">Is Verified</th>
<th className="th-style-k">Is Rejected</th>

          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr
                key={index}
                style={index % 2 === 0 ? evenRowStyle : oddRowStyle}
              >
               <td className="td-style-k">{item.id || 'N/A'}</td>
<td className="td-style-k">{item.phn || 'N/A'}</td>
<td className="td-style-k">{item.type || 'N/A'}</td>
<td className="td-style-k">{item.details.name_on_card || 'N/A'}</td>
<td className="td-style-k">{item.details.fathers_name || 'N/A'}</td>
<td className="td-style-k">{item.id_number || 'N/A'}</td>
<td className="td-style-k">{item.cd_ist || 'N/A'}</td>
<td className="td-style-k">
  <span className={item.isVerified ? 'yes-style' : 'no-style'}>
    {item.isVerified ? 'Yes' : 'No'}
  </span>
</td>
<td className="td-style-k">
  <span className={item.isRejected ? 'yes-style' : 'no-style'}>
    {item.isRejected ? 'Yes' : 'No'}
  </span>
</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className='no-results-cell-k '>
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
