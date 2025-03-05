import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Withdraw.scss";
import { Search, Clear } from "@mui/icons-material"; // Import both Search and Clear icons
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import variables from "../styles/variables.scss";

const WithdrawData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // The search query
  const navigate = useNavigate();

  // Fetch withdraw data from the server
  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/withdraw/withdrawData"
        );
        setData(response.data);
        setFilteredData(response.data); // Set the filtered data to all data initially
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

    // Filter data based on search query
    if (query) {
      setFilteredData(
        data.filter(
          (item) =>
            item.phn.toLowerCase().startsWith(query.toLowerCase()) || // Filter by Mobile No
            item.bankAccount.toLowerCase().startsWith(query.toLowerCase()) ||
            item.transferid.toLowerCase().startsWith(query.toLowerCase())
        )
      );
    } else {
      // If search is cleared, show all data
      setFilteredData(data);
    }
  };

  // Clear the search input and reset filtered data
  const handleClearSearch = () => {
    setSearch(""); // Clear the search field
    setFilteredData(data); // Show all data again
    navigate("/Withdraw");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Table styles (same as RechargeData)
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

      {/* Search bar (same as RechargeData) */}
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
          onClick={() => {
            navigate(`/properties/search/${search}`);
          }}
          style={{ marginLeft: "8px" }}
        >
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>

         {/* Display message when no results are found */}
         {search && filteredData.length === 0 && (
           <p className="no-results-message-i">
              No users found matching your search.
          </p>
          )}


      {/* Display message when results are found */}
        {search && filteredData.length > 0 && (
         <p className="found-message-x">
          Found {filteredData.length} {filteredData.length === 1 ? "user" : "users"} matching your search.
        </p>
        )}


      {/* Withdraw data table */}
      <table style={ttableStyles}>
        <thead>
          <tr>
            <th style={tthStyles}>Id</th>
            <th style={tthStyles}>Mobile No</th>
            <th style={tthStyles}>Bank Account</th>
            <th style={tthStyles}>IFSC Code</th>
            <th style={tthStyles}>Bank</th>
            <th style={tthStyles}>Amount</th>
            <th style={tthStyles}>Transaction ID</th>
            <th style={tthStyles}>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                }}
              >
                <td style={ttdStyles}>{item.Id}</td>
                <td style={ttdStyles}>{item.phn}</td>
                <td style={ttdStyles}>{item.bankAccount}</td>
                <td style={ttdStyles}>{item.ifsc}</td>
                <td style={ttdStyles}>{item.bank}</td>
                <td style={ttdStyles}>{item.amount}</td>
                <td style={ttdStyles}>{item.transferid}</td>
                <td className="table-data">
                  <button
                    className={`ctc-styles-r ${
                      item.status.toLowerCase() === "pending"
                        ? "pending-status"
                        : ""
                    }`}
                  >
                    {item.status}
                  </button>
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
};

export default WithdrawData;
