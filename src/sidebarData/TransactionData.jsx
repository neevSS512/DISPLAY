import React, { useState, useEffect } from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import { Clear, Search } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
import variables from "../styles/variables.scss";
import "../styles/transaction.scss";

const TransactionData = () => {
  const [data, setData] = useState([]); // Store all fetched data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data based on search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(""); // The search query
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [rowsPerPage, setRowsPerPage] = useState(8); // Rows per page

  // Fetch game user data
  useEffect(() => {
    const fetchGameuserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/transaction/transactionData"
        );
        setData(response.data); // Store full data
        setFilteredData(response.data); // Initially set filtered data to all data
      } catch (err) {
        setError("Error fetching gameuser data");
      } finally {
        setLoading(false);
      }
    };
    fetchGameuserData();
  }, []);


// Handle search input change
const handleSearchChange = (e) => {
  const query = e.target.value.trim(); // Trim any extra spaces around the query
  setSearch(query);

  if (query) {
    setFilteredData(
      data.filter(
        (item) =>
          (item.mobile_no && item.mobile_no.trim().toLowerCase() === query.toLowerCase()) || // Normalize and compare exactly
          (item.tbid && item.tbid.trim().toLowerCase() === query.toLowerCase()) // Normalize and compare exactly
      )
    );
  } else {
    setFilteredData(data); // Show all data if no search query
  }
  setCurrentPage(1); // Reset to first page on new search
};


  // Handle pagination navigation
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
      <h3 className="ut">Transaction Details</h3>
      <div className="navbar_search" style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search User by Mobile No     or Username..."
          value={search}
          onChange={handleSearchChange}
          className="input-std-t"
          style={{
            border: "2px solid #ccc", // Light gray border color
            borderRadius: "20px", // Optional: rounded corners for the border
            padding: "8px 12px", // Optional: for better padding inside the input
          }}
        />

        <IconButton
          disabled={search === ""}
          onClick={() => {
            setSearch(""); // Clear search query
            setFilteredData(data); // Show all data
            setCurrentPage(1); // Reset pagination to the first page
          }}
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
          // onClick={() => {
          //   navigate(`/UserData`);
          // }}
          style={{ marginLeft: "8px" }}
        >
          <Search sx={{ color: variables.pinkred }} />
        </IconButton>
      </div>

      {search && filteredData.length === 0 && (
        <p
          className="notfound-message"
          style={{ color: "#ff3b3b", marginLeft: "13rem", fontWeight: "bold" }}
        >
          No users found matching your search.
        </p>
      )}

      {search && filteredData.length > 0 && (
        <p
          className="found-message"
          style={{ color: "#4CAF50", marginLeft: "13rem", fontWeight: "bold" }}
        >
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

      {/* Display the table */}
      <table className="tableStyles">
        <thead>
          <tr>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              Mobile_No
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              Tbid
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              Previous Cash
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              Amount
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              transection_purpose
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              contact_support
            </th>
           
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              Cd_Ist
            </th>
            <th
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "10px",
                textAlign: "left",
                borderBottom: "2px solid #ddd",
              }}
            >
              Transaction Status
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((item, index) => (
            <tr
              key={item.Id || index}
              style={{
                backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
              }}
            >
              <td
                style={{
                  padding: "16px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {item.mobile_no}
              </td>
              <td
                style={{
                  padding: "16px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {item.tbid}
              </td>
              <td
                style={{
                  padding: "16px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {item.previous_cash}
              </td>
              <td
                style={{
                  padding: "16px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {item.amount}
              </td>
              <td
                style={{
                  padding: "16px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {item.transection_purpose}
              </td>
              <td
                style={{
                  padding: "16px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {item.current_total_cash}
              </td>
              <td
                style={{
                  padding: "7px",
                  textAlign: "left",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {item.cd_ist}
              </td>
              <td className="table-data">
                <button
                  style={{
                    color: "white",
                    padding: "3px 8px",
                    borderRadius: "5px",
                    textAlign: "center",
                    minWidth: "28px",
                    display: "inline-block",
                    fontSize: "15px",
                    margin: "12px",
                    borderBottom: "1px solid #ddd",
                    backgroundColor: "rgb(101, 216, 101)",
                  }}
                >
                  {item.transaction_status}
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination Controls */}
      <div
        className="pagination"
        style={{ textAlign: "center", marginTop: "10px" }}
      >
        {currentPage > 1 && (
          <button
            onClick={handlePreviousPage}
            style={{
              padding: "8px 16px",
              marginLeft: "1201px",
              fontSize: "12px",
              width: "6vw",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>
        )}
        <span style={{ marginLeft: "1180px", marginTop: "3px" }}>
          Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage === Math.ceil(filteredData.length / rowsPerPage)
          }
          style={{
            padding: "6px 13px",
            fontSize: "12px",
            width: "4vw",
            marginLeft: "1220px",
            cursor:
              currentPage === Math.ceil(filteredData.length / rowsPerPage)
                ? "not-allowed"
                : "pointer",
            display:
              currentPage === Math.ceil(filteredData.length / rowsPerPage)
                ? "none"
                : "inline-block", // Hide if no next page
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default TransactionData;




