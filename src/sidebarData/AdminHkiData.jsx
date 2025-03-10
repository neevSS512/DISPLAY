
// import React, { useEffect, useState } from 'react';
// import { FaUsers, FaMoneyBillWave, FaArrowAltCircleDown } from 'react-icons/fa';
// import '../styles/AdminData.scss';

// export default function AdminHkiData() {
//   const [transactionData, setTransactionData] = useState({
//     totalTransaction: 0,
//     successfulRecharge: 0,
//     pendingWithdrawal: 0,
//     totalUsers: 0,
//     totalAmount: 0,
//     totalWithdraw: 0,
//     totalSuccess: 0,
//     totalPending: 0,  // Added these two values
//     totalFailed: 0,  // Added these two values
//     totalSuccessW: 0,
//     totalPendingW: 0,  // Added these two values
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTransactionData = async () => {
//       try {
//         // Initially set mock data while loading
//         setTransactionData((prevData) => ({
//           ...prevData,
//           totalTransaction: 5000,
//           successfulRecharge: 12,
//         }));

//         // Fetching the total users, amount, withdraw, and success/pending counts in parallel
//         const [userResponse, amountResponse, withdrawResponse, txStatusResponse,StatusResponseW] = await Promise.all([
//           fetch("http://localhost:3001/gameuser/total-users"),
//           fetch("http://localhost:3001/recharge/totalAmount"),
//           fetch("http://localhost:3001/withdraw/totalWithdraw"),
//           fetch("http://localhost:3001/recharge/txStatusCounts"),  // Fetch totalSuccess and totalPending
//           fetch("http://localhost:3001/withdraw/StatusCounts"),  // Fetch totalSuccess and totalPending
//         ]);

//         // Check if all responses are successful
//         if (userResponse.ok && amountResponse.ok && withdrawResponse.ok && txStatusResponse.ok && StatusResponseW.ok) {
//           const [userData, amountData, withdrawData, txStatusData,StatusDataW] = await Promise.all([
//             userResponse.json(),
//             amountResponse.json(),
//             withdrawResponse.json(),
//             txStatusResponse.json(),  // Extract the success and pending counts
//             StatusResponseW.json(),
//           ]);

//           setTransactionData((prevData) => ({
//             ...prevData,
//             totalUsers: userData.totalUsers,
//             totalAmount: amountData.totalAmount,
//             totalWithdraw: withdrawData.totalWithdraw,
//             totalSuccess: txStatusData.totalSuccess,  // Set totalSuccess
//             totalPending: txStatusData.totalPending,  // Set totalPending
//             totalFailed: txStatusData.totalFailed,  // Set totalPending
//             totalSuccessW:StatusDataW.totalSuccessW,
//             totalPendingW:StatusDataW.totalPendingW

//           }));
//         } else {
//           throw new Error('Failed to fetch one or more data');
//         }
//       } catch (error) {
//         console.error('Detailed error:', error);
//         setError(`Error loading data: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactionData();
//   }, []);

//   return (
//     <div className="admin-container">
//       <h2>Details about the particular items of HKI</h2>
//       {loading ? (
//         <div className="loading">Loading...</div>
//       ) : error ? (
//         <p style={{ color: 'red' }}>{error}</p>
//       ) : (
//         <div className="card-container">
//           <div className="card-first">
//             <div className="icon-container">
//               <FaUsers size={40} color="#007bff" />
//             </div>
//             <h3 className="circle">{transactionData.totalUsers}</h3>
//             <p className="card-text">Registered Players</p>
//           </div>
//           <div className="card-second">
//             <div className="icon-container">
//               <FaMoneyBillWave size={40} color="#28a745" />
//             </div>
//             <h3 className="circle">{transactionData.totalAmount}</h3>
//             <p className="card-text">Total Deposit</p>
//             {/* Displaying the success and pending counts here */}
//             <div className="status-info">
//               <p className='s-d'> Successful Deposit: {transactionData.totalSuccess}</p>
//               <p className='s-p'>Pending Deposit: {transactionData.totalPending}</p>
//               <p className='s-p'>Failed Deposit: {transactionData.totalFailed}</p>
//             </div>
//           </div>
//           <div className="card-third">
//             <div className="icon-container">
//               <FaArrowAltCircleDown size={40} color="#dc3545" />
//             </div>
//             <h3 className="circle">{transactionData.totalWithdraw}</h3>
//             <p className="card-text">Total Withdrawals</p>
//               {/* Displaying the success and pending counts here */}
//               <div className="status-info">
//               <p className='s-d'> Successful Withdraw: {transactionData.totalSuccessW}</p>
//               <p className='s-p'>Pending Withdraw: {transactionData.totalPendingW}</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }




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
    totalPending: 0,
    totalFailed: 0,
    totalSuccessW: 0,
    totalPendingW: 0,
    newUsersLast7Days: 0, // This will store the count of users created in the last 7 days
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

        // Fetching the total users, amount, withdraw, success/pending counts, and new users in last 7 days in parallel
        const [
          userResponse,
          amountResponse,
          withdrawResponse,
          txStatusResponse,
          StatusResponseW,
          newUsersLast7DaysResponse, // Add this line for the new API endpoint
        ] = await Promise.all([
          fetch("http://localhost:3001/gameuser/total-users"),
          fetch("http://localhost:3001/recharge/totalAmount"),
          fetch("http://localhost:3001/withdraw/totalWithdraw"),
          fetch("http://localhost:3001/recharge/txStatusCounts"),
          fetch("http://localhost:3001/withdraw/StatusCounts"),
          fetch("http://localhost:3001/gameuser/newUsersCountLast7Days"), // Fetch count of users created in last 7 days
        ]);

        if (
          userResponse.ok &&
          amountResponse.ok &&
          withdrawResponse.ok &&
          txStatusResponse.ok &&
          StatusResponseW.ok &&
          newUsersLast7DaysResponse.ok // Check if the new response is successful
        ) {
          const [
            userData,
            amountData,
            withdrawData,
            txStatusData,
            StatusDataW,
            newUsersLast7DaysData, // Handle the new response
          ] = await Promise.all([
            userResponse.json(),
            amountResponse.json(),
            withdrawResponse.json(),
            txStatusResponse.json(),
            StatusResponseW.json(),
            newUsersLast7DaysResponse.json(),
          ]);

          setTransactionData((prevData) => ({
            ...prevData,
            totalUsers: userData.totalUsers,
            totalAmount: amountData.totalAmount,
            totalWithdraw: withdrawData.totalWithdraw,
            totalSuccess: txStatusData.totalSuccess,
            totalPending: txStatusData.totalPending,
            totalFailed: txStatusData.totalFailed,
            totalSuccessW: StatusDataW.totalSuccessW,
            totalPendingW: StatusDataW.totalPendingW,
            newUsersLast7Days: newUsersLast7DaysData.newUsersCountLast7Days, // Set the new count
          }));
        } else {
          throw new Error("Failed to fetch one or more data");
        }
      } catch (error) {
        console.error("Detailed error:", error);
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
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <div className="card-container">
          {/* Updated card-first to show users created in the last 7 days */}
          <div className="card-first">
            <div className="icon-container">
              <FaUsers size={40} color="#007bff" />
            </div>
           <h3 className="circle">{transactionData.totalUsers}</h3>
            <p className="card-text">Registered Players</p>
            <h3 className="circle-two">{transactionData.newUsersLast7Days}</h3> {/* Display last 7 days users here */}
            <p className="card-text-two">Users in Last 7 Days</p>
          </div>

          {/* Other cards */}
          <div className="card-second">
            <div className="icon-container">
              <FaMoneyBillWave size={40} color="#28a745" />
            </div>
            <h3 className="circle">{transactionData.totalAmount}</h3>
            <p className="card-text">Total Deposit</p>
            <div className="status-info">
              <p className="s-d">Successful Deposit: {transactionData.totalSuccess}</p>
              <p className="s-p">Pending Deposit: {transactionData.totalPending}</p>
              <p className="s-p">Failed Deposit: {transactionData.totalFailed}</p>
            </div>
          </div>
          <div className="card-third">
            <div className="icon-container">
              <FaArrowAltCircleDown size={40} color="#dc3545" />
            </div>
            <h3 className="circle">{transactionData.totalWithdraw}</h3>
            <p className="card-text">Total Withdrawals</p>
            <div className="status-info">
              <p className="s-d">Successful Withdraw: {transactionData.totalSuccessW}</p>
              <p className="s-p">Pending Withdraw: {transactionData.totalPendingW}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
