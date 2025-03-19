

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/RechargeData.scss";
import { Search, Clear } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import variables from "../styles/variables.scss";

const RechargeData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState(null); // State for toggling orderId view
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [rowsPerPage, setRowsPerPage] = useState(8); // Rows per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRechargeData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/recharge/rechargeData"
        );
        setData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        setError("Error fetching recharge data");
      } finally {
        setLoading(false);
      }
    };

    fetchRechargeData();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.trim();
    setSearch(query);

    if (query) {
      setFilteredData(
        data.filter(
          (item) =>
            (item.orderId &&
              item.orderId.toLowerCase().startsWith(query.toLowerCase())) ||
            (item.mobile_no &&
              item.mobile_no.toLowerCase().startsWith(query.toLowerCase())) ||
            (item.txStatus &&
              item.txStatus.toLowerCase().startsWith(query.toLowerCase()))
        )
      );
    } else {
      setFilteredData(data);
    }
    setCurrentPage(1); // Reset to the first page when a new search is made
  };

  const handleClearSearch = () => {
    setSearch("");
    setFilteredData(data); // Show all data again
    setCurrentPage(1); // Reset pagination to the first page
    navigate("/Recharge");
  };

  const handleToggleOrderId = (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null); // Collapse the orderId if already expanded
    } else {
      setExpandedOrderId(orderId); // Expand to show full orderId
    }
  };

  const getTruncatedOrderId = (orderId) => {
    if (orderId.length > 10) {
      // Check if the orderId is long enough to truncate
      const firstHalf = orderId.slice(0, orderId.length / 2);
      return `${firstHalf}...`;
    }
    return orderId; // If the orderId is short, no need to truncate
  };

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

  // Get the data to display on the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="neev">
      <h3 className="ur">Recharge Details</h3>

      {/* Search bar with clear and search icons */}
      <div className="navbar_search" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search Game Users..."
          value={search}
          onChange={handleSearchChange}
          className="input-std-r"
          style={{
            border: "2px solid #ccc", // Light gray border color
            borderRadius: "20px", // Optional: rounded corners for the border
            padding: "8px 12px", // Optional: for better padding inside the input
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
        <IconButton disabled={search === ""} style={{ marginLeft: "8px" }}>
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>

      {/* Display message if no users are found */}
      {search && filteredData.length === 0 && (
        <p className="no-results-r">No users found matching your search.</p>
      )}

      {/* Display message if results are found */}
      {search && filteredData.length > 0 && (
        <p className="search-result-r">
          Found {filteredData.length}{" "}
          {filteredData.length === 1 ? "user" : "users"} matching your search.
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

      {/* Recharge data table */}
      <table className="table-styles-r">
        <thead>
          <tr>
            <th className="th-styles-r">Order Id</th>
            <th className="th-styles-r">UserName</th>
            <th className="th-styles-r">Mobile No</th>
            <th className="th-styles-r">Amount</th>
            <th className="th-styles-r">Wallet Amount</th>
            <th className="th-styles-r">Previous Cash</th>
            <th className="th-styles-r">Updated Cash</th>
            <th className="th-styles-r">cd_ist</th>
            <th className="th-styles-r">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((item, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "table-row-even-r" : "table-row-odd-r"
                }
              >
                <td className="td-styles-r">
                  <span
                    onClick={() => handleToggleOrderId(item.orderId)}
                    style={{ cursor: "pointer" }}
                  >
                    {expandedOrderId === item.orderId
                      ? item.orderId
                      : getTruncatedOrderId(item.orderId)}
                  </span>
                </td>
                <td className="td-styles-r">
                  <span
                    onClick={() => handleToggleOrderId(item.username)}
                    style={{ cursor: "pointer" }}
                  >
                    {expandedOrderId === item.username
                      ? item.username
                      : getTruncatedOrderId(item.username)}
                  </span>
                </td>
                <td className="td-styles-r">{item.mobile_no}</td>
                <td className="tds-styles-r">{item.amount}</td>
                <td className="tds-styles-r">{item.amountAfterGst}</td>
                <td className="td-styles-r">{item.previous_cash}</td>
                <td className="td-styles-r">{item.after_cash}</td>
                <td className="td-styles-r">
                  <span
                    onClick={() => handleToggleOrderId(item.cd_ist)}
                    style={{ cursor: "pointer" }}
                  >
                    {expandedOrderId === item.cd_ist
                      ? item.cd_ist
                      : getTruncatedOrderId(item.cd_ist)}
                  </span>
                </td>
                <td className="table-data">
                  <button
                    className={`ctc-styles-r ${
                      item.txStatus.toLowerCase() === "pending"
                        ? "pending-status"
                        : item.txStatus.toLowerCase() === "failed"
                        ? "failed-status"
                        : ""
                    }`}
                  >
                    {item.txStatus}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="no-results-cell-r">
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>



       {/* Pagination Controls */}
       <div style={{marginLeft:"1200px",}}>
        {/* Conditionally render Previous button */}
        {currentPage > 1 && (
          <button onClick={handlePreviousPage}
          style={{height:"27px",fontSize:"14px",marginBottom:"4px"}}
          >Previous</button>
        )}
        
        <span style={{whiteSpace:"nowrap",}}>
          Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
        </span>

        {/* Conditionally render Next button */}
        {currentPage < Math.ceil(filteredData.length / rowsPerPage) && (
          <button onClick={handleNextPage} style={{height:"27px",fontSize:"14px",marginBottom:"12px"}}>Next</button>
        )}
      </div>
    </div>
  );
};

export default RechargeData;
