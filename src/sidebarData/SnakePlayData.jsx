// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const SnakePlayData = () => {
//   const [matchData, setMatchData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   useEffect(() => {

//     axios
//       .get("http://localhost:3001/matchTrackData/matchtrack") 
//       .then((response) => {
//         setMatchData(response.data); 
//         setLoading(false); 
//       })
//       .catch((err) => {
//         setError("Failed to fetch data");
//         setLoading(false); 
//       });
//   }, []);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h2>Snake Game Play</h2>
//       <table border="1" cellPadding="10" cellSpacing="0">
//         <thead>
//           <tr>
//             <th>Match ID</th>
//             <th>Status</th>
//             <th>Players</th>
//             <th>Winner</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {matchData.map((match, index) => (
//             <tr key={index}>
//               <td>{match.matchId}</td>
//               <td>{match.status}</td>
//               <td>{match.usersIds.join(", ")}</td> 
//               <td>{match.winnerIds.join(", ")}</td> 
//               <td>{new Date(match.cd).toLocaleString()}</td> {/* Formatting date */}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SnakePlayData;



// import React, { useState, useEffect } from 'react';
// import "../styles/SnakePlayData.scss";
// function SnakePlayData() {
//   const [matches, setMatches] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         const response = await fetch('http://localhost:3001/matchTrackData/matchtrack'); 
//         if (!response.ok) {
//           throw new Error('Failed to fetch match data');
//         }
//         const data = await response.json();
//         setMatches(data); // Set the fetched data to state
//         setLoading(false); // Stop loading once data is fetched
//       } catch (error) {
//         setError(error.message); 
//         setLoading(false);
//       }
//     };

//     fetchMatches();
//   }, []);
//   // Render the component
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (

//      <div className="neevss">
//           <h3 className="fii">ludo game play</h3>
//           <table className="table-style-k">
//             <thead>
//               <tr>
//              <th className="th-style-k">Match ID</th>
//              <th className="th-style-k">Game</th>
//              <th className="th-style-k">Status</th>
//              <th className="th-style-k">Winner IDs</th>
//              <th className="th-style-k">Entry Fee</th>
//              <th className="th-style-k">Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               {matches.length > 0 ? (
//                 matches.map((match, index) => (
//                   <tr>
//                <td className="td-style-k">{match.matchId}</td>
//                <td className="td-style-k">{match.game}</td>
//                <td className="td-style-k">{match.status}</td>
//                <td className="td-style-k">{match.winnerIds.join(', ')}</td>
//                <td className="td-style-k">{match.entryFee}</td>
//               <td className="td-style-k">{new Date(match.cd).toLocaleString()}</td> {/* Formatting the date */}

//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td className="no-results-cell-k ">No results found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//   );
// }

// export default SnakePlayData;







