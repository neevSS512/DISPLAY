import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/WithdrawMore.scss";
const WithdrawalTable = ({ phoneNumber }) => {
  const [withdrawDetails, setWithdrawDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWithdrawDetails = async () => {
      try {
        // Fetch data from your API
        const response = await axios.get(`http://localhost:3001/withdraw/withdrawDetailsByMobile/${phoneNumber}`);
        setWithdrawDetails(response.data.withdrawDetails); // Set data to state
        setLoading(false);
      } catch (err) {
        setError('Error fetching withdrawal details.');
        setLoading(false);
      }
    };

    fetchWithdrawDetails();
  }, [phoneNumber]); // Re-fetch data when phoneNumber changes

  // Loading spinner while waiting for data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error handling
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* <h2 className='w-more'>Withdrawal Details</h2> */}
      <h3 className='ugm'>Withdrawal Details</h3>
      <table border="1" style={{ width: '1215px', borderCollapse: 'collapse',marginLeft:"235px" }}>
        <thead>
          <tr>
            <th style={{backgroundColor:"black",color:"white",padding:"10px 0px"}}>Transaction ID</th>
            <th style={{backgroundColor:"black",color:"white",padding:"10px 0px"}}>Amount</th>
            <th style={{backgroundColor:"black",color:"white",padding:"10px 0px"}}>Status</th>
            <th style={{backgroundColor:"black",color:"white",padding:"10px 0px"}}>Bank Account</th>
            <th style={{backgroundColor:"black",color:"white"}}>Transfer Mode</th>
            <th style={{backgroundColor:"black",color:"white"}}>Transfer ID</th>
            <th style={{backgroundColor:"black",color:"white"}}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {withdrawDetails.map((withdrawal, index) => (
            <tr key={withdrawal._id}>
              <td>{withdrawal.transferid || 'N/A'}</td>
              <td>{withdrawal.amount}</td>
              <td>{withdrawal.status}</td>
              <td>{withdrawal.bankAccount}</td>
              <td>{withdrawal.transfermode}</td>
              <td>{withdrawal.transferid}</td>
              <td>{new Date(withdrawal.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const phoneNumber = '9310479568'; // You can replace this with dynamic phone number as needed

  return (
    <div>
      <WithdrawalTable phoneNumber={phoneNumber} />
    </div>
  );
};

export default App;




// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import "../styles/WithdrawMore.scss";

// const WithdrawMore = ({ user }) => {
//   const [withdrawDetails, setWithdrawDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Use a ref to handle API call cancellation
//   const abortControllerRef = useRef(new AbortController());

//   useEffect(() => {
//     if (!user || !user.mobile_no) {
//       setError('Mobile number is missing');
//       setLoading(false);
//       return;
//     }

//     // Function to fetch withdrawal details
//     const fetchWithdrawDetails = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Make the API call using axios
//         const response = await axios.get(
//           `http://localhost:3001/withdraw/withdrawDetailsByMobile/${user.mobile_no}`,
//           { signal: abortControllerRef.current.signal }
//         );

//         // Check if response data is valid and contains withdrawal details
//         if (response.data && response.data.withdrawDetails) {
//           setWithdrawDetails(response.data.withdrawDetails);
//         } else {
//           setError('No withdrawal details found.');
//         }

//         setLoading(false);
//       } catch (err) {
//         if (err.name !== 'CanceledError') {
//           setError('Error fetching withdrawal details.');
//         }
//         setLoading(false);
//       }
//     };

//     fetchWithdrawDetails();

//     // Cleanup on unmount or when user changes
//     return () => {
//       abortControllerRef.current.abort();
//       abortControllerRef.current = new AbortController(); // Reset for next request
//     };
//   }, [user]); // Refetch when `user` changes

//   // Display loading state
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Display error state
//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2 className="w-more">Withdrawal Details</h2>
//       <table className="table-w" border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//           <tr>
//             <th>Transaction ID</th>
//             <th>Amount</th>
//             <th>Status</th>
//             <th>Bank Account</th>
//             <th>Transfer Mode</th>
//             <th>Transfer ID</th>
//             <th>Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {withdrawDetails.map((withdrawal) => (
//             <tr key={withdrawal._id}>
//               <td>{withdrawal.transferid || 'N/A'}</td>
//               <td>{withdrawal.amount}</td>
//               <td>{withdrawal.status}</td>
//               <td>{withdrawal.bankAccount}</td>
//               <td>{withdrawal.transfermode}</td>
//               <td>{withdrawal.transferid}</td>
//               <td>{new Date(withdrawal.createdAt).toLocaleString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default WithdrawMore;





