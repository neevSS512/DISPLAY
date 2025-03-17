

import React, { useState, useEffect } from 'react';
import "../styles/RummyPlayData.scss";

function RummyPlayData({ userId }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (userId) {
          const response = await fetch(`http://localhost:3001/rummyMatchTrackdata/rummymatchtrack/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch match data');
          }
          const data = await response.json();
          setMatches(data);
          setLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMatches();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(matches.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = matches.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(matches.length / rowsPerPage);
  
  return (
    <div className="neevss-r">
      <h3 className="fii-r">Rummy Game Play</h3>
          
      {/* Dropdown to change rows per page */}
      <div className="rows-per-page " style={{visibility:"hidden"}}>
        <label>Rows per page:</label>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))} // Update rowsPerPage dynamically
        >
          <option value={6}>6</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>
      <table className="table-style-k-r">
        <thead>
          <tr>
            <th className="th-style-k-r">Match ID</th>
            <th className="th-style-k-r">Game</th>
            <th className="th-style-k-r">Entry Fee</th>
            <th className="th-style-k-r">Player Count</th>
            <th className="th-style-k-r">Status</th>
            <th className="th-style-k-s">Winner Id</th>
            <th className="th-style-k-s">Win Amount</th>
            <th className="th-style-k-r">User 1 Info</th>
            <th className="th-style-k-r">User 2 Info</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((match, index) => (
              <tr key={index}>
                <td className="td-style-k-r">{match.matchId}</td>
                <td className="td-style-k-r">{match.game}</td>
                <td className="td-style-k-r">{match.entryFee}</td>
                <td className="td-style-k-r">{match.playerCount}</td>
                <td className="td-style-k-r">{match.status}</td>
                <td className="td-style-k-s">{match.winnerIds}</td>
                <td className="td-style-k-s">{match.winAmount}</td>
                
                {/* User 1 Details */}
                <td className="td-style-k-r">
                  {match.users && match.users[0] ? (
                    <>
                      Mobile: {match.users[0].mobile_no || '_'} <br />
                    </>
                  ) : (
                    '_'
                  )}
                </td>

                {/* User 2 Details */}
                <td className="td-style-k-r">
                  {match.users && match.users[1] ? (
                    <>
                      Mobile: {match.users[1].mobile_no || '_'} <br />
                    </>
                  ) : (
                    '_'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="no-results-cell-k-r" colSpan="9">No results found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {matches.length > rowsPerPage && (
        <div className="pagination" style={{ textAlign: "center", marginTop: "10px" }}>
          {/* Previous Button */}
          {currentPage > 1 && (
            <button
              onClick={handlePreviousPage}
              style={{
                padding: "8px 16px",
                fontSize: "12px",
                width: "6vw",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                marginLeft: "1201px",
              }}
            >
              Previous
            </button>
          )}

          {/* Page Number Info */}
          <span style={{ marginLeft: "1200px", marginTop: "3px" }}>
            Page {currentPage} of {totalPages}
          </span>

          {/* Next Button */}
          {currentPage < totalPages && (
            <button
              onClick={handleNextPage}
              style={{
                padding: "6px 13px",
                fontSize: "12px",
                width: "4vw",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                marginLeft: "1220px",
              }}
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default RummyPlayData;



