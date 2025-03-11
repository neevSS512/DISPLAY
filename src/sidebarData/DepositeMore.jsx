// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import "../styles/DepositeMore.scss";
// const RechargeTable = ({ phoneNumber }) => {
//   const [rechargeDetails, setRechargeDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchWithdrawDetails = async () => {
//       try {
//         // Fetch data from your API
//         const response = await axios.get(`http://localhost:3001/recharge/depositDetailsById/${phoneNumber}`);
//         setRechargeDetails(response.data.rechargeDetails); // Set data to state
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching recharge details.');
//         setLoading(false);
//       }
//     };

//     fetchWithdrawDetails();
//   }, [phoneNumber]); // Re-fetch data when phoneNumber changes


//   // Loading spinner while waiting for data
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Error handling
//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div>
//       <h2 className='r-more'>Recharge Details</h2>
//       <table className='table-r' border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
//         <thead>
//         <tr>
//                 <th>Order ID</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//                 <th>Transaction Date</th>
//                 <th>Response</th>
//                 <th>Invoice ID</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rechargeDetails.map((detail) => (
//                 <tr key={detail._id}>
//                   <td>{detail.orderId}</td>
//                   <td>{detail.amount}</td>
//                   <td>{detail.txStatus}</td>
//                   <td>{new Date(detail.transDate).toLocaleString()}</td>
//                   <td>{JSON.parse(detail.response).message}</td>
//                   <td>{detail.invoiceId || 'N/A'}</td>
//                 </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const App = () => {
//   const phoneNumber = '9310479568'; 
//   return (
//     <div>
//       <RechargeTable phoneNumber={phoneNumber} />
//     </div>
//   );
// };

// export default App;






import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import "../styles/DepositeMore.scss";

const RechargeTable = ({ user }) => {
  const [rechargeDetails, setRechargeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use a ref to hold the AbortController, this will ensure it doesn't change between renders.
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => {
    if (!user || !user.mobile_no) {
      setError('Mobile number is missing');
      setLoading(false);
      return;
    }

    // Function to fetch recharge details
    const fetchRechargeDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch data using the AbortController signal to cancel the request if needed
        const response = await axios.get(
          `http://localhost:3001/recharge/depositDetailsById/${user.mobile_no}`,
          { signal: abortControllerRef.current.signal }
        );
        
        // Check if response data is valid
        if (response.data && response.data.rechargeDetails) {
          setRechargeDetails(response.data.rechargeDetails);
        } else {
          setError('No recharge details found.');
        }

        setLoading(false);
      } catch (err) {
        if (err.name !== 'CanceledError') {
          // Only set error if it's not caused by the request being canceled
          setError('Error fetching recharge details.');
        }
        setLoading(false);
      }
    };

    fetchRechargeDetails();

    // Clean up the previous request if the user changes
    return () => {
      abortControllerRef.current.abort();
      abortControllerRef.current = new AbortController(); // Reset the abort controller for the next request
    };
  }, [user]); // No need for abortControllerRef in the dependency array

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
      <h3 className='ugm'>Deposite Details</h3>
      <table className="table-r" border="1" style={{ width: '1220px', borderCollapse: 'collapse',marginLeft:"225px" }}>
        <thead>
          <tr>
            <th style={{backgroundColor:"black",color:"white"}}>Order ID</th>
            <th style={{backgroundColor:"black",color:"white"}}>Amount</th>
            <th style={{backgroundColor:"black",color:"white"}}>Status</th>
            <th style={{backgroundColor:"black",color:"white"}}>Transaction Date</th>
            <th style={{backgroundColor:"black",color:"white"}}>Response</th>
            <th style={{backgroundColor:"black",color:"white"}}>Invoice ID</th>
          </tr>
        </thead>
        <tbody>
          {rechargeDetails.map((detail) => (
            <tr key={detail._id}>
              <td>{detail.orderId}</td>
              <td>{detail.amount}</td>
              <td>{detail.txStatus}</td>
              <td>{new Date(detail.transDate).toLocaleString()}</td>
              <td>{detail.response ? JSON.parse(detail.response).message : 'No Response'}</td>
              <td>{detail.invoiceId || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RechargeTable;
