// import React, { useState, useEffect } from 'react';
// import "../styles/LudoSnakePlay.scss";
// function LudoSnakePlay() {
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

// export default LudoSnakePlay;


















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
//           const response = await fetch(`http://localhost:3001/matchTrackData/matchtrack/${user.userId}`);
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





import React, { useState, useEffect } from 'react';
import "../styles/LudoSnakePlay.scss";

function LudoSnakePlay({ userId }) { // Accept userId as a prop
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (userId) { // Ensure userId is passed
          const response = await fetch(`http://localhost:3001/matchTrackData/matchtrack/${userId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch match data');
          }
          const data = await response.json();
          setMatches(data); // Set the fetched data to state
          setLoading(false); // Stop loading once data is fetched
        }
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMatches();
  }, [userId]); // Re-fetch when userId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="neevss">
      <h3 className="fii">Ludo Game Play</h3>
      <table className="table-style-k">
        <thead>
          <tr>
            <th className="th-style-k">Match ID</th>
            <th className="th-style-k">Game</th>
            <th className="th-style-k">Entry Fee</th>
            <th className="th-style-k">Status</th>
            <th className="th-style-k">Date</th>
            <th className="th-style-k">User 1 Info</th>
            <th className="th-style-k">User 2 Info</th>
          </tr>
        </thead>
        <tbody>
          {matches.length > 0 ? (
            matches.map((match, index) => (
              <tr key={index}>
                <td className="td-style-k">{match.matchId}</td>
                <td className="td-style-k">{match.game}</td>
                <td className="td-style-k">{match.entryFee}</td>
                <td className="td-style-k">{match.status}</td>
                <td className="td-style-k">{new Date(match.cd).toLocaleString()}</td>
                
                {/* User 1 Details */}
                <td className="td-style-k">
                  {match.users && match.users[0] ? (
                    <>
                      UID: {match.users[0].uid || '_'}, <br />
                      Mobile: {match.users[0].mobile_no || '_'}, <br />
                      Username: {match.users[0].un || '_'}
                    </>
                  ) : (
                    '_'
                  )}
                </td>

                {/* User 2 Details */}
                <td className="td-style-k">
                  {match.users && match.users[1] ? (
                    <>
                      UID: {match.users[1].uid || '_'}, <br />
                      Mobile: {match.users[1].mobile_no || '_'}, <br />
                      Username: {match.users[1].un || '_'}
                    </>
                  ) : (
                    '_'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="no-results-cell-k" colSpan="7">No results found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default LudoSnakePlay;
