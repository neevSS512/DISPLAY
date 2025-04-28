

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Withdraw.scss";
import { Search, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import variables from "../styles/variables.scss";

const WithdrawData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // The search query
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [rowsPerPage, setRowsPerPage] = useState(8); // Rows per page
  const navigate = useNavigate();

  // Fetch withdraw data from the server
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get("http://147.93.27.170:3001/withdraw/withdrawData");
        setData(response.data);
        setFilteredData(response.data); // Set filtered data to all initially
      } catch (err) {
        setError("Error fetching withdraw data");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, []);

  // Handle search query change
  const handleSearchChange = (e) => {
    const query = e.target.value.trim();
    setSearch(query);

    if (query) {
      setFilteredData(
        data.filter(
          (item) =>
            item.phn.toLowerCase().startsWith(query.toLowerCase()) || // Filter by Mobile No
            item.bankAccount.toLowerCase().startsWith(query.toLowerCase()) ||
            item.transferid.toLowerCase().startsWith(query.toLowerCase()) ||
            item.uid.toLowerCase().startsWith(query.toLowerCase())
        )
      );
    } else {
      setFilteredData(data);
    }
    setCurrentPage(1); // Reset to the first page when search is applied
  };

  // Clear the search input and reset filtered data
  const handleClearSearch = () => {
    setSearch(""); // Clear search
    setFilteredData(data); // Show all data
    setCurrentPage(1); // Reset to the first page
    navigate("/Withdraw");
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

  // Table styles
  const ttableStyles = {
    width: "82vw",
    borderCollapse: "collapse",
    marginTop: "20px ",
    marginBottom: "20px",
    marginLeft: "230px",
  };

  const tthStyles = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  };

  const ttdStyles = {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  };

  return (
    <div className="neev">
      <h3 className="uw">Withdraw details</h3>

      {/* Search bar */}
      <div className="navbar_search" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search Game Users..."
          value={search}
          onChange={handleSearchChange}
          className="input-std-w"
          style={{
            border: "2px solid #ccc",
            borderRadius: "20px",
            padding: "8px 12px",
          }}
        />
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
        <IconButton
          disabled={search === ""}
          onClick={() => {}}
          style={{ marginLeft: "8px" }}
        >
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>

      {/* Display message when no results are found */}
      {search && filteredData.length === 0 && (
        <p className="no-results-message-i">No users found matching your search.</p>
      )}

      {/* Display message when results are found */}
      {search && filteredData.length > 0 && (
        <p className="found-message-x">
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


      {/* Withdraw data table */}
      <table style={ttableStyles}>
        <thead>
          <tr>
            <th style={tthStyles}>UserName</th>
            <th style={tthStyles}>Mobile No</th>
            <th style={tthStyles}>Bank Account</th>
            <th style={tthStyles}>IFSC Code</th>
            <th style={tthStyles}>Amount</th>
            <th style={tthStyles}>Transaction ID</th>
            <th style={tthStyles}>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((item, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                }}
              >
                <td style={ttdStyles}>{item.un}</td>
                <td style={ttdStyles}>{item.phn}</td>
                <td style={ttdStyles}>{item.bankAccount}</td>
                <td style={ttdStyles}>{item.ifsc}</td>
                <td style={ttdStyles}>{item.amount}</td>
                <td style={ttdStyles}>{item.transferid}</td>
                <td className="table-data">
                  <button
                    className={`ctc-styles-r ${
                      item.status.toLowerCase() === "pending" ? "pending-status" : ""
                    }`}
                  >
                    {item.status}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ padding: "10px", textAlign: "center" }}>
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginLeft: "1200px" }}>
        {currentPage > 1 && (
          <button
            onClick={handlePreviousPage}
            style={{ height: "27px", fontSize: "14px", marginBottom: "4px" }}
          >
            Previous
          </button>
        )}
        <span style={{ whiteSpace: "nowrap" }}>
          Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
        </span>
        {currentPage < Math.ceil(filteredData.length / rowsPerPage) && (
          <button
            onClick={handleNextPage}
            style={{ height: "27px", fontSize: "14px", marginBottom: "12px" }}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default WithdrawData;
