
// import React, { useState, useEffect } from 'react';
// import "../styles/LudoSnakePlay.scss";

// function LudoSnakePlay({ user }) { // Accept user as a prop
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         if (user && user.userId) { // Ensure user is passed and has userId
//           const response = await fetch(`http://147.93.27.170:3001/matchTrackData/matchtrack/${user.userId}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch match data');
//           }
//           const data = await response.json();
//           setMatches(data); // Set the fetched data to state
//           setLoading(false); // Stop loading once data is fetched
//         }
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchMatches();
//   }, [user]); // Re-fetch when user changes

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="neevss">
//       <h3 className="fii">Snake Game Play</h3>
//       <table className="table-style-k">
//         <thead>
//           <tr>
//             <th className="th-style-k">Match ID</th>
//             <th className="th-style-k">Game</th>
//             <th className="th-style-k">Entry Fee</th>
//             <th className="th-style-k">Status</th>
//             <th className="th-style-k">Date</th>
//             <th className="th-style-k">User 1 Info</th>
//             <th className="th-style-k">User 2 Info</th>
//           </tr>
//         </thead>
//         <tbody>
//           {matches.length > 0 ? (
//             matches.map((match, index) => (
//               <tr key={index}>
//                 <td className="td-style-k">{match.matchId}</td>
//                 <td className="td-style-k">{match.game}</td>
//                 <td className="td-style-k">{match.entryFee}</td>
//                 <td className="td-style-k">{match.status}</td>
//                 <td className="td-style-k">{new Date(match.cd).toLocaleString()}</td>
                
//                 {/* User 1 Details */}
//                 <td className="td-style-k">
//                   {match.users && match.users[0] ? (
//                     <>
//                       UID: {match.users[0].uid || '_'}, <br />
//                       Mobile: {match.users[0].mobile_no || '_'}, <br />
//                       Username: {match.users[0].un || '_'}
//                     </>
//                   ) : (
//                     '_'
//                   )}
//                 </td>

//                 {/* User 2 Details */}
//                 <td className="td-style-k">
//                   {match.users && match.users[1] ? (
//                     <>
//                       UID: {match.users[1].uid || '_'}, <br />
//                       Mobile: {match.users[1].mobile_no || '_'}, <br />
//                       Username: {match.users[1].un || '_'}
//                     </>
//                   ) : (
//                     '_'
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td className="no-results-cell-k" colSpan="7">No results found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default LudoSnakePlay;





// import React, { useState, useEffect } from 'react';
// import "../styles/LudoSnakePlay.scss";

// function LudoSnakePlay({ userId }) { // Accept userId as a prop
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         if (userId) { // Ensure userId is passed
//           const response = await fetch(`http://147.93.27.170:3001/matchTrackData/matchtrack/${userId}`);
//           if (!response.ok) {
//             throw new Error('Failed to fetch match data');
//           }
//           const data = await response.json();
//           setMatches(data); // Set the fetched data to state
//           setLoading(false); // Stop loading once data is fetched
//         }
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     fetchMatches();
//   }, [userId]); // Re-fetch when userId changes

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="neevss-s">
//       <h3 className="fii-s">Ludo Game Play</h3>
//       <table className="table-style-k-s">
//         <thead>
//           <tr>
//             <th className="th-style-k-s">Match ID</th>
//             <th className="th-style-k-s">Game</th>
//             <th className="th-style-k-s">Entry Fee</th>
//             <th className="th-style-k-s">Status</th>
//             <th className="th-style-k-s">Winner Id</th>
//             <th className="th-style-k-s">Win Amount</th>
//             <th className="th-style-k-s">User 1 Info</th>
//             <th className="th-style-k-s">User 2 Info</th>
//           </tr>
//         </thead>
//         <tbody>
//           {matches.length > 0 ? (
//             matches.map((match, index) => (
//               <tr key={index}>
//                 <td className="td-style-k-s">{match.matchId}</td>
//                 <td className="td-style-k-s">{match.game}</td>
//                 <td className="td-style-k-s">{match.entryFee}</td>
//                 <td className="td-style-k-s">{match.status}</td>
//                 <td className="td-style-k-s">{match.winnerIds}</td>
//                 <td className="td-style-k-s">{match.winAmount}</td>
                
//                 {/* User 1 Details */}
//                 <td className="td-style-k-s">
//                   {match.users && match.users[0] ? (
//                     <>
//                       {/* UID: {match.users[0].uid || '_'}, <br /> */}
//                       Mobile: {match.users[0].mobile_no || '_'} <br />
//                       {/* Username: {match.users[0].un || '_'} */}
//                     </>
//                   ) : (
//                     '_'
//                   )}
//                 </td>

//                 {/* User 2 Details */}
//                 <td className="td-style-k-s">
//                   {match.users && match.users[1] ? (
//                     <>
//                       {/* UID: {match.users[1].uid || '_'}, <br /> */}
//                       Mobile: {match.users[1].mobile_no || '_'} <br />
//                       {/* Username: {match.users[1].un || '_'} */}
//                     </>
//                   ) : (
//                     '_'
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td className="no-results-cell-k-s" colSpan="7">No results found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default LudoSnakePlay;



import React, { useState, useEffect } from 'react';
import "../styles/LudoSnakePlay.scss";

function LudoSnakePlay({ userId }) { 
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [rowsPerPage, setRowsPerPage] = useState(6); // Rows per page

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (userId) { 
          const response = await fetch(`http://147.93.27.170:3001/matchTrackData/matchtrack/${userId}`);
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

  // Handle Next Page
  const handleNextPage = () => {
    if (currentPage < Math.ceil(matches.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle Previous Page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate the rows for the current page
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = matches.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(matches.length / rowsPerPage);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="neevss-s">
      <h3 className="fii-s">Ludo Game Play</h3>
      <table className="table-style-k-s">
        <thead>
          <tr>
            <th className="th-style-k-s">Match ID</th>
            <th className="th-style-k-s">Game</th>
            <th className="th-style-k-s">Entry Fee</th>
            <th className="th-style-k-s">Status</th>
            <th className="th-style-k-s">Winner Id</th>
            <th className="th-style-k-s">Win Amount</th>
            <th className="th-style-k-s">User 1 Info</th>
            <th className="th-style-k-s">User 2 Info</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((match, index) => (
              <tr key={index}>
                <td className="td-style-k-s">{match.matchId}</td>
                <td className="td-style-k-s">{match.game}</td>
                <td className="td-style-k-s">{match.entryFee}</td>
                <td className="td-style-k-s">{match.status}</td>
                <td className="td-style-k-s">{match.winnerIds}</td>
                <td className="td-style-k-s">{match.winAmount}</td>
                
                {/* User 1 Details */}
                <td className="td-style-k-s">
                  {match.users && match.users[0] ? (
                    <>
                      Mobile: {match.users[0].mobile_no || '_'} <br />
                    </>
                  ) : (
                    '_'
                  )}
                </td>

                {/* User 2 Details */}
                <td className="td-style-k-s">
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
              <td className="no-results-cell-k-s" colSpan="8">No results found.</td>
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
                marginLeft: "1220px",
              }}
            >
              Previous
            </button>
          )}

          {/* Page Number Info */}
          <span style={{ marginLeft: "1220px", marginTop: "3px" }}>
            Page {currentPage} of {totalPages}
          </span>

          {/* Next Button */}
          {currentPage < totalPages && (
            <button
              onClick={handleNextPage}
              style={{
                padding: "8px 16px",
                fontSize: "12px",
                width: "6vw",
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

export default LudoSnakePlay;
