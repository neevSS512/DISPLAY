
import React, { useEffect, useState } from 'react';
import "../styles/userdatam.scss";

const UserData = ({ user, handleClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setLoading(false);  // Set loading to false once user data is available
    } else {
      setError('No user data available');
      setLoading(false);
    }
  }, [user]);

  // If no user or closed, don't render
  if (!user) {
    return null; 
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Styling for table and columns
  const tableStyles = {
    width: "82vw",
    borderCollapse: "collapse",
    marginTop: "20px ",
    marginBottom:"20px",
    marginLeft:"230px"
  };

  const thStyles = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  };

  const tdStyles = {
    padding: "4px",
    textAlign: "left",
    borderBottom: "1px solid #ddd"
  };

  const tdsStyles = {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    color: "rgb(103, 103, 249)"
  };

  return (
    <div className='neev'>
      <h3 className='ugm'>
        More Info About The Game User
        <button 
           className='go-back-btn'
           style={{ marginLeft: '510px' }} 
           onClick={() => handleClose()}
        >
        Go Back
        </button>
      </h3>

      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Deposit</th>
            <th style={thStyles}>Winning</th>
            <th style={thStyles}>Bonus</th>
            <th style={thStyles}>Total_Cash</th>
            <th style={thStyles}>Payment_Counter</th>
            <th style={thStyles}>Withdraw_Counter</th>
            <th style={thStyles}>Referal_Count</th>
            <th style={thStyles}>Total_Referal_Earning</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyles}>{user.deposit || 'N/A'}</td>
            <td style={tdStyles}>{user.Winning || 'N/A'}</td>
            <td style={tdsStyles}>{user.Bonus || 'N/A'}</td>
            <td style={tdStyles}>{user.totalcash || 'N/A'}</td>
            <td style={tdStyles}>{user.PaymentCounter || 'N/A'}</td>
            <td style={tdStyles}>{user.WithdrawCounter || 'N/A'}</td>
            <td style={tdStyles}>{user.referalCount || 'N/A'}</td>
            <td style={tdStyles}>{user.totalReferalEarning || 'N/A'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
