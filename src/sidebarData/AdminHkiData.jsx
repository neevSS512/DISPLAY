

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
//     totalPending: 0,
//     totalFailed: 0,
//     totalSuccessW: 0,
//     totalPendingW: 0,
//     newUsersLast7Days: 0, // This will store the count of users created in the last 7 days
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

//         // Fetching the total users, amount, withdraw, success/pending counts, and new users in last 7 days in parallel
//         const [
//           userResponse,
//           amountResponse,
//           withdrawResponse,
//           txStatusResponse,
//           StatusResponseW,
//           newUsersLast7DaysResponse, // Add this line for the new API endpoint
//         ] = await Promise.all([
//           fetch("http://localhost:3001/gameuser/total-users"),
//           fetch("http://localhost:3001/recharge/totalAmount"),
//           fetch("http://localhost:3001/withdraw/totalWithdraw"),
//           fetch("http://localhost:3001/recharge/txStatusCounts"),
//           fetch("http://localhost:3001/withdraw/StatusCounts"),
//           fetch("http://localhost:3001/gameuser/newUsersCountLast7Days"), // Fetch count of users created in last 7 days
//         ]);

//         if (
//           userResponse.ok &&
//           amountResponse.ok &&
//           withdrawResponse.ok &&
//           txStatusResponse.ok &&
//           StatusResponseW.ok &&
//           newUsersLast7DaysResponse.ok // Check if the new response is successful
//         ) {
//           const [
//             userData,
//             amountData,
//             withdrawData,
//             txStatusData,
//             StatusDataW,
//             newUsersLast7DaysData, // Handle the new response
//           ] = await Promise.all([
//             userResponse.json(),
//             amountResponse.json(),
//             withdrawResponse.json(),
//             txStatusResponse.json(),
//             StatusResponseW.json(),
//             newUsersLast7DaysResponse.json(),
//           ]);

//           setTransactionData((prevData) => ({
//             ...prevData,
//             totalUsers: userData.totalUsers,
//             totalAmount: amountData.totalAmount,
//             totalWithdraw: withdrawData.totalWithdraw,
//             totalSuccess: txStatusData.totalSuccess,
//             totalPending: txStatusData.totalPending,
//             totalFailed: txStatusData.totalFailed,
//             totalSuccessW: StatusDataW.totalSuccessW,
//             totalPendingW: StatusDataW.totalPendingW,
//             newUsersLast7Days: newUsersLast7DaysData.newUsersCountLast7Days, // Set the new count
//           }));
//         } else {
//           throw new Error("Failed to fetch one or more data");
//         }
//       } catch (error) {
//         console.error("Detailed error:", error);
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
//         <p style={{ color: "red" }}>{error}</p>
//       ) : (
//         <div className="card-container">
//           {/* Updated card-first to show users created in the last 7 days */}
//           <div className="card-first">
//             <div className="icon-container">
//               <FaUsers size={40} color="#007bff" />
//             </div>
//            <h3 className="circle">{transactionData.totalUsers}</h3>
//             <p className="card-text">Registered Players</p>
//             <h3 className="circle-two">{transactionData.newUsersLast7Days}</h3> {/* Display last 7 days users here */}
//             <p className="card-text-two">Users in Last 7 Days</p>
//           </div>

//           {/* Other cards */}
//           <div className="card-second">
//             <div className="icon-container">
//               <FaMoneyBillWave size={40} color="#28a745" />
//             </div>
//             <h3 className="circle">{transactionData.totalAmount}</h3>
//             <p className="card-text">Total Deposit</p>
//             <div className="status-info">
//               <p className="s-d">Successful Deposit: {transactionData.totalSuccess}</p>
//               <p className="s-p">Pending Deposit: {transactionData.totalPending}</p>
//               <p className="s-p">Failed Deposit: {transactionData.totalFailed}</p>
//             </div>
//           </div>
//           <div className="card-third">
//             <div className="icon-container">
//               <FaArrowAltCircleDown size={40} color="#dc3545" />
//             </div>
//             <h3 className="circle">{transactionData.totalWithdraw}</h3>
//             <p className="card-text">Total Withdrawals</p>
//             <div className="status-info">
//               <p className="s-d">Successful Withdraw: {transactionData.totalSuccessW}</p>
//               <p className="s-p">Pending Withdraw: {transactionData.totalPendingW}</p>
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
    totalWithdraw: 0,  // For totalWithdraw
    totalSuccess: 0,
    totalPending: 0,
    totalFailed: 0,
    totalSuccessW: 0,
    totalPendingW: 0,
    newUsersLast7Days: 0,
    totalWithdrawLast7Days: 0, // For totalWithdrawLast7Days
    totalRechargeLast7Days: 0, // For totalWithdrawLast7Days
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

        // Fetch data in parallel
        const [
          userResponse,
          amountResponse,
          withdrawResponse,
          txStatusResponse,
          StatusResponseW,
          newUsersLast7DaysResponse,
          withdrawLast7DaysResponse, // Fetch totalWithdrawLast7Days here
          rechargeLast7DaysResponse, // Fetch totalWithdrawLast7Days here
        ] = await Promise.all([
          fetch("http://localhost:3001/gameuser/total-users"),
          fetch("http://localhost:3001/recharge/totalAmount"),
          fetch("http://localhost:3001/withdraw/totalWithdraw"),
          fetch("http://localhost:3001/recharge/txStatusCounts"),
          fetch("http://localhost:3001/withdraw/StatusCounts"),
          fetch("http://localhost:3001/gameuser/newUsersCountLast7Days"),
          fetch("http://localhost:3001/withdraw/totalWithdrawLast7Days"), // Add this API endpoint
          fetch("http://localhost:3001/recharge/totalRechargeLast7Days"), // Add this API endpoint
        ]);

        // Check if all responses are successful
        if (
          userResponse.ok &&
          amountResponse.ok &&
          withdrawResponse.ok &&
          txStatusResponse.ok &&
          StatusResponseW.ok &&
          newUsersLast7DaysResponse.ok &&
          withdrawLast7DaysResponse.ok && // Ensure this request is successful
          rechargeLast7DaysResponse.ok // Ensure this request is successful
        ) {
          // Parse all responses to JSON
          const [
            userData,
            amountData,
            withdrawData,
            txStatusData,
            StatusDataW,
            newUsersLast7DaysData,
            withdrawLast7DaysData, // Handle withdraw data in last 7 days
            rechargeLast7DaysData, 
          ] = await Promise.all([
            userResponse.json(),
            amountResponse.json(),
            withdrawResponse.json(),
            txStatusResponse.json(),
            StatusResponseW.json(),
            newUsersLast7DaysResponse.json(),
            withdrawLast7DaysResponse.json(),
            rechargeLast7DaysResponse.json(),
          ]);

          // Update the state with the fetched data
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
            newUsersLast7Days: newUsersLast7DaysData.newUsersCountLast7Days,
            totalWithdrawLast7Days: withdrawLast7DaysData.totalWithdraw, // Set the totalWithdraw from the API response
            totalRechargeLast7Days: rechargeLast7DaysData.totalRecharge, // Set the totalWithdraw from the API response
          }));
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
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
          {/* First Row: 3 Cards with Data */}

          
          <div className="card-gepo " >
            <div className="icon-container-gepo">
              <FaUsers size={40} color="#007bff" />
            </div>
            <h3 className="circle-g" style={{marginTop:"30px"}}>{transactionData.totalUsers}</h3>
            <p className="card-text-g" style={{marginTop:"8px"}}>Registered Players</p>
            <h3 className="circle-g" >{transactionData.newUsersLast7Days}</h3>
            <p className="card-text-g" style={{marginBottom:"115px"}}>Users in Last 7 Days</p>
          </div>
         
         



          <div className="card-depo">
            <div className="icon-container-depo">
              <FaMoneyBillWave size={40} color="#28a745" />
            </div>
            <h3 className="circle-d"  style={{marginTop:"40px"}}>{transactionData.totalAmount}</h3>
            <p className="card-text-d" >Total Deposit</p>
            <h3 className="circle-d" >{transactionData.totalRechargeLast7Days}</h3>
            <p className="card-text-d"  >Deposit in last 7 days</p>
            <div className="status-info" style={{paddingBottom:"2px"}}>
              <p className="s-d-d">Successful Deposit: {transactionData.totalSuccess}</p>
              <p className="s-p-d">Pending Deposit: {transactionData.totalPending}</p>
              <p className="s-p-d">Failed Deposit: {transactionData.totalFailed}</p>
            </div>
          </div> 

          <div className="card">
            <div className="icon-container">
              <FaArrowAltCircleDown size={40} color="#dc3545" />
            </div>
            <h3 className="circle-w" style={{marginTop:"40px"}}>{transactionData.totalWithdraw}</h3>
            <p className="card-text-w">Total Withdrawals</p>
            <h3 className="circle-w">{transactionData.totalWithdrawLast7Days}</h3>
            <p className="card-text-w" style={{marginBottom:"34px"}}>Withdraw in Last 7 Days</p>
            <div className="status-info-w" style={{paddingBottom:"2px"}}>
              <p className="s-d-w">Successful Withdraw: {transactionData.totalSuccessW}</p>
              <p className="s-p-w">Pending Withdraw: {transactionData.totalPendingW}</p>
            </div>
          </div>


        </div>
      )}
    </div>
  );
}