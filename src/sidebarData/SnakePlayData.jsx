
// import React, { useState, useEffect } from 'react';
// import "../styles/SnakePlayData.scss";

// function SnakePlayData({ userId }) { // Accept userId as a prop
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         if (userId) { // Ensure userId is passed
//           const response = await fetch(`http://localhost:3001/matchTrackData/matchtrackS/${userId}`);
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
//     <div className="neevss-e">
//       <h3 className="fii-e">Snake Game Play</h3>
//       <table className="table-style-k-e">
//         <thead>
//           <tr>
//             <th className="th-style-k-e">Match ID</th>
//             <th className="th-style-k-e">Game</th>
//             <th className="th-style-k-e">Entry Fee</th>
//             <th className="th-style-k-e">Status</th>
//             <th className="th-style-k-s">Winner Id</th>
//             <th className="th-style-k-s">Win Amount</th>
//             <th className="th-style-k-e">User 1 Info</th>
//             <th className="th-style-k-e">User 2 Info</th>
//           </tr>
//         </thead>
//         <tbody>
//           {matches.length > 0 ? (
//             matches.map((match, index) => (
//               <tr key={index}>
//                 <td className="td-style-k-e">{match.matchId}</td>
//                 <td className="td-style-k-e">{match.game}</td>
//                 <td className="td-style-k-e">{match.entryFee}</td>
//                 <td className="td-style-k-e">{match.status}</td>
//                 <td className="td-style-k-s">{match.winnerIds}</td>
//                 <td className="td-style-k-s">{match.winAmount}</td>
//                 {/* <td className="td-style-k-e">{new Date(match.cd).toLocaleString()}</td> */}
                
//                 {/* User 1 Details */}
//                 <td className="td-style-k-e">
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
//                 <td className="td-style-k-e">
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
//               <td className="no-results-cell-k-e" colSpan="7">No results found.</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default SnakePlayData;


import React, { useState, useEffect } from 'react';
import "../styles/SnakePlayData.scss";

function SnakePlayData({ userId }) {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedIds, setExpandedIds] = useState(new Set()); // Track which matchId's winnerId is expanded

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (userId) {
          const response = await fetch(`http://localhost:3001/matchTrackData/matchtrackS/${userId}`);
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

  // Function to toggle expanded state for winnerId
  const handleWinnerIdClick = (matchId) => {
    const newExpandedIds = new Set(expandedIds);
    if (newExpandedIds.has(matchId)) {
      newExpandedIds.delete(matchId); // Collapse it
    } else {
      newExpandedIds.add(matchId); // Expand it
    }
    setExpandedIds(newExpandedIds); // Update state
  };

  return (
    <div className="neevss-e">
      <h3 className="fii-e">Snake Game Play</h3>
      <table className="table-style-k-e">
        <thead>
          <tr>
            <th className="th-style-k-e">Match ID</th>
            <th className="th-style-k-e">Game</th>
            <th className="th-style-k-e">Entry Fee</th>
            <th className="th-style-k-e">Status</th>
            <th className="th-style-k-s">Winner Id</th>
            <th className="th-style-k-s">Win Amount</th>
            <th className="th-style-k-e">User 1 Info</th>
            <th className="th-style-k-e">User 2 Info</th>
          </tr>
        </thead>
        <tbody>
          {matches.length > 0 ? (
            matches.map((match, index) => (
              <tr key={index}>
                <td className="td-style-k-e">{match.matchId}</td>
                <td className="td-style-k-e">{match.game}</td>
                <td className="td-style-k-e">{match.entryFee}</td>
                <td className="td-style-k-e">{match.status}</td>

                {/* Winner ID Column with truncation and toggle */}
                <td
                  className="td-style-k-s winner-id"
                  onClick={() => handleWinnerIdClick(match.matchId)} // Toggle on click
                  title="Click to view full Winner Id"
                >
                  {expandedIds.has(match.matchId) ? (
                    match.winnerIds // Show full winner ID if expanded
                  ) : (
                    match.winnerIds.length > 10 ? `${match.winnerIds.slice(0, 10)}...` : match.winnerIds
                  )}
                </td>

                <td className="td-style-k-s">{match.winAmount}</td>

                {/* User 1 Details */}
                <td className="td-style-k-e">
                  {match.users && match.users[0] ? (
                    <>
                      Mobile: {match.users[0].mobile_no || '_'} <br />
                    </>
                  ) : (
                    '_'
                  )}
                </td>

                {/* User 2 Details */}
                <td className="td-style-k-e">
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
              <td className="no-results-cell-k-e" colSpan="7">No results found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SnakePlayData;
