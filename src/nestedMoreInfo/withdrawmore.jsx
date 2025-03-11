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
      <h2>Withdrawal Details</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Bank Account</th>
            <th>Transfer Mode</th>
            <th>Transfer ID</th>
            <th>Created At</th>
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
      <h1>User Withdrawal Details</h1>
      <WithdrawalTable phoneNumber={phoneNumber} />
    </div>
  );
};

export default App;
