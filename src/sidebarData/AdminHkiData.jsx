

import React, { useEffect, useState } from 'react';
import { FaUsers, FaMoneyBillWave, FaArrowAltCircleDown } from 'react-icons/fa';
import '../styles/AdminData.scss';

export default function AdminHkiData() {
  const [transactionData, setTransactionData] = useState({
    totalTransaction: 0,
    successfulRecharge: 0,
    pendingWithdrawal: 0,
    totalUsers: 0,
    totalAmount: 0,
    totalWithdraw: 0,
    totalSuccess: 0,
    totalPending: 0,  // Added these two values
    totalSuccessW: 0,
    totalPendingW: 0,  // Added these two values
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        // Initially set mock data while loading
        setTransactionData((prevData) => ({
          ...prevData,
          totalTransaction: 5000,
          successfulRecharge: 12,
        }));

        // Fetching the total users, amount, withdraw, and success/pending counts in parallel
        const [userResponse, amountResponse, withdrawResponse, txStatusResponse,StatusResponseW] = await Promise.all([
          fetch("http://localhost:3001/gameuser/total-users"),
          fetch("http://localhost:3001/recharge/totalAmount"),
          fetch("http://localhost:3001/withdraw/totalWithdraw"),
          fetch("http://localhost:3001/recharge/txStatusCounts"),  // Fetch totalSuccess and totalPending
          fetch("http://localhost:3001/withdraw/StatusCounts"),  // Fetch totalSuccess and totalPending
        ]);

        // Check if all responses are successful
        if (userResponse.ok && amountResponse.ok && withdrawResponse.ok && txStatusResponse.ok && StatusResponseW.ok) {
          const [userData, amountData, withdrawData, txStatusData,StatusDataW] = await Promise.all([
            userResponse.json(),
            amountResponse.json(),
            withdrawResponse.json(),
            txStatusResponse.json(),  // Extract the success and pending counts
            StatusResponseW.json(),
          ]);

          setTransactionData((prevData) => ({
            ...prevData,
            totalUsers: userData.totalUsers,
            totalAmount: amountData.totalAmount,
            totalWithdraw: withdrawData.totalWithdraw,
            totalSuccess: txStatusData.totalSuccess,  // Set totalSuccess
            totalPending: txStatusData.totalPending,  // Set totalPending
            totalSuccessW:StatusDataW.totalSuccessW,
            totalPendingW:StatusDataW.totalPendingW

          }));
        } else {
          throw new Error('Failed to fetch one or more data');
        }
      } catch (error) {
        console.error('Detailed error:', error);
        setError(`Error loading data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, []);

  return (
    <div className="admin-container">
      <h2>Details about the particular items of HKI</h2>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div className="card-container">
          <div className="card-first">
            <div className="icon-container">
              <FaUsers size={40} color="#007bff" />
            </div>
            <h3 className="circle">{transactionData.totalUsers}</h3>
            <p className="card-text">Registered Players</p>
          </div>
          <div className="card-second">
            <div className="icon-container">
              <FaMoneyBillWave size={40} color="#28a745" />
            </div>
            <h3 className="circle">{transactionData.totalAmount}</h3>
            <p className="card-text">Total Deposit</p>
            {/* Displaying the success and pending counts here */}
            <div className="status-info">
              <p className='s-d'> Successful Deposit: {transactionData.totalSuccess}</p>
              <p className='s-p'>Pending Deposit: {transactionData.totalPending}</p>
            </div>
          </div>
          <div className="card-third">
            <div className="icon-container">
              <FaArrowAltCircleDown size={40} color="#dc3545" />
            </div>
            <h3 className="circle">{transactionData.totalWithdraw}</h3>
            <p className="card-text">Total Withdrawals</p>
              {/* Displaying the success and pending counts here */}
              <div className="status-info">
              <p className='s-d'> Successful Withdraw: {transactionData.totalSuccessW}</p>
              <p className='s-p'>Pending Withdraw: {transactionData.totalPendingW}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
