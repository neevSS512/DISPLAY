
import React, { useEffect, useState } from 'react';
import "../styles/userdatam.scss";

const UserData = ({ user, handleClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setLoading(false);  
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

      <table className='table-stylegm'>
        <thead>
          <tr>
            <th className="th-stylegm">Deposit</th>
            <th className="th-stylegm">Winning</th>
            <th className="th-stylegm">Bonus</th>
            <th className="th-stylegm">Total_Cash</th>
            <th className="th-stylegm">Payment_Counter</th>
            <th className="th-stylegm">Withdraw_Counter</th>
            <th className="th-stylegm">Referal_Count</th>
            <th className="th-stylegm">Total_Referal_Earning</th>

          </tr>
        </thead>
        <tbody>
          <tr>
          <td className="td-stylegm">{user.deposit || '_'}</td>
          <td className="td-stylegm">{user.Winning || '_'}</td>
          <td className="tds-stylegm">{user.Bonus || '_'}</td>
          <td className="td-stylegm">{user.totalcash || '_'}</td>
          <td className="td-stylegm">{user.counters.paymnetcounter || '_'}</td>
          <td className="td-stylegm">{user.counters.withdrawCounter || '_'}</td>
          <td className="td-stylegm">{user.totalGameOfReferedUser || '_'}</td>
          <td className="td-stylegm">{user.totalReferalEarning || '_'}</td>

          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserData;
