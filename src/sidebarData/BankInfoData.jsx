
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/BankData.scss";
import { Search, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import variables from "../styles/variables.scss";

const BankInfoData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBankInfoData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/bankdata/bankData');
        setData(response.data);
        setFilteredData(response.data); // Initially set filtered data to all data
      } catch (err) {
        setError('Error fetching bank data');
      } finally {
        setLoading(false);
      }
    };

    fetchBankInfoData();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.trim();
    setSearch(query);
    // Filter the data based on search query
    if (query) {
      setFilteredData(
        data.filter(
          (item) =>
            (item.verificationDetails?.phn && item.verificationDetails.phn.toLowerCase().startsWith(query.toLowerCase())) ||
            (item.verificationDetails?.accountHolderName && item.verificationDetails.accountHolderName.toLowerCase().startsWith(query.toLowerCase())) ||
            (item.verificationDetails?.accountNumber && item.verificationDetails.accountNumber.toLowerCase().startsWith(query.toLowerCase())) ||
            (item.verificationDetails?.bankName && item.verificationDetails.bankName.toLowerCase().startsWith(query.toLowerCase()))
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
    navigate("/BankData"); // Navigate to the /BankData path
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="neev">
      <h3 className="ub">Bank Details About The User</h3>

      {/* Search bar with clear and search icons */}
      <div className="navbar_search" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search Bank Users..."
          value={search}
          onChange={handleSearchChange}
          className='input-std-b'
          style={{
            border: "2px solid #ccc", // Light gray border color
            borderRadius: "20px", // Optional: rounded corners for the border
            padding: "8px 12px", // Optional: for better padding inside the input
          }}
        />

        {/* Clear Icon */}
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

     {/* Display message when no results are found */}
           {search && filteredData.length === 0 && (
           <p className="no-results-message-b">
              No users found matching your search.
          </p>
          )}


      {/* Display message when results are found */}
        {search && filteredData.length > 0 && (
         <p className="found-message-b">
          Found {filteredData.length} {filteredData.length === 1 ? "user" : "users"} matching your search.
        </p>
        )}


      {/* Table for Bank Info Data */}
      <table className="table-container">
        <thead>
          <tr>
            <th className="table-header">Mobile No</th>
            <th className="table-header">Account Holder Name</th>
            <th className="table-header">Account Number</th>
            <th className="table-header">Bank Name</th>
            <th className="table-header">IFSC Code</th>
            <th className="table-header">Is Verified</th>
            <th className="table-header">Is Rejected</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "table-row-even-b" : "table-row-odd-b"}>
                <td className="table-data">{item.verificationDetails?.phn || 'N/A'}</td>
                <td className="table-data">{item.verificationDetails?.accountHolderName || 'N/A'}</td>
                <td className="table-data">{item.verificationDetails?.accountNumber || 'N/A'}</td>
                <td className="table-data">{item.verificationDetails?.bankName || 'N/A'}</td>
                <td className="table-data">{item.verificationDetails?.IFSCCode || 'N/A'}</td>
                <td className="table-data">
                  <span className={item.isVerified ? 'yes-status' : 'no-status'}>
                    {item.isVerified ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="table-data">
                  <span className={item.isRejected ? 'yes-status' : 'no-status'}>
                    {item.isRejected ? 'Yes' : 'No'}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="table-data">No results found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BankInfoData;




