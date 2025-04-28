



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
          `http://147.93.27.170:3001/recharge/depositDetailsById/${user.mobile_no}`,
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
