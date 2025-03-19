

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/BankData.scss";
import { Search, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import variables from "../styles/variables.scss";

const BankInfoData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState("");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Rows per page

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
          (item) => item.details.number && item.details.number.toLowerCase().startsWith(query.toLowerCase())
        )
      );
    } else {
      setFilteredData(data);
    }
    setCurrentPage(1); // Reset pagination when search is changed
  };

  const handleClearSearch = () => {
    setSearch("");
    setFilteredData(data); // Show all data again
    setCurrentPage(1); // Reset pagination when search is cleared
    navigate("/BankData"); // Navigate to the /BankData path
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

      {/* Table for Bank Info Data */}
      <table className="table-container">
        <thead>
          <tr>
            <th className="table-header">Type</th>
            <th className="table-header">Account Holder Name</th>
            <th className="table-header">Account Number</th>
            <th className="table-header">IFSC Code</th>
            <th className="table-header">Is Verified</th>
            <th className="table-header">Is Rejected</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((item, index) => (
              <tr key={index} className={index % 2 === 0 ? "table-row-even-b" : "table-row-odd-b"}>
                <td className="table-data">{item.type || 'N/A'}</td>
                <td className="table-data">{item.details.a_h_name || 'N/A'}</td>
                <td className="table-data">{item.details.number || 'N/A'}</td>
                <td className="table-data">{item.details.IFSC || 'N/A'}</td>
                <td className="table-data">
                  <span className={item.isVerify ? 'yes-status' : 'no-status'}>
                    {item.isVerify ? 'Yes' : 'No'}
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
              <td colSpan="6" className="table-data">No results found.</td>
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

export default BankInfoData;
