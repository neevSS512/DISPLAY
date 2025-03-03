
// import React, { useEffect, useState } from 'react';
// import '../styles/AdminData.scss';
// export default function AdminHkiData() {
//   const [transactionData, setTransactionData] = useState({
//     totalTransaction: 0,
//     successfulRecharge: 0,
//     pendingWithdrawal: 0,
//     totalUsers: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTransactionData = async () => {
//       try {
//         setTransactionData({
//           totalTransaction: 5000, // Simulated value
//           successfulRecharge: 12, // Simulated value
//         });

//         const userResponse = await fetch("http://localhost:3001/gameuser/total-users");
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
//           setTransactionData((prevData) => ({
//             ...prevData,
//             totalUsers: userData.totalUsers,
//           }));
//         } else {
//           throw new Error('Failed to fetch total users');
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError('Error loading data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactionData();
//   }, []);

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h2>Details about the particular items of HKI</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p style={{ color: 'red' }}>{error}</p>
//       ) : (
//         <div className="card-container">
//           <div className="card">
//             {/* <div className="icon-container">
//               <i className="fas fa-users"></i>
//             </div> */}
//             <h3 className="circle">{transactionData.totalUsers}</h3>
//             <p>Registered Players</p>
//           </div>
//           <div className="card">
//             {/* <div className="icon-container">
//               <i className="fas fa-bolt"></i>
//             </div> */}
            
//             <h3 className="circle">{transactionData.successfulRecharge}</h3>
//             <p>Total Deposite</p>
//           </div>
//           <div className="card">
//             {/* <div className="icon-container">
//               <i className="fas fa-bolt"></i>
//             </div> */}
            
//             <h3 className="circle">{transactionData.successfulRecharge}</h3>
//             <p>Total Withdraw</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import '../styles/AdminData.scss';

// export default function AdminHkiData() {
//   const [transactionData, setTransactionData] = useState({
//     totalTransaction: 0,
//     successfulRecharge: 0,
//     pendingWithdrawal: 0,
//     totalUsers: 0,
//     totalAmount: 0, // Added totalAmount field
//     totalWithdraw:0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTransactionData = async () => {
//       try {
//         // Simulating values for total transactions and successful recharges
//         setTransactionData((prevData) => ({
//           ...prevData,
//           totalTransaction: 5000, // Simulated value
//           successfulRecharge: 12, // Simulated value
//         }));

//         // Fetching the total users
//         const userResponse = await fetch("http://localhost:3001/gameuser/total-users");
//         if (userResponse.ok) {
//           const userData = await userResponse.json();
//           setTransactionData((prevData) => ({
//             ...prevData,
//             totalUsers: userData.totalUsers,
//           }));
//         } else {
//           throw new Error('Failed to fetch total users');
//         }
     

//         // Fetching the total amount
//         const amountResponse = await fetch("http://localhost:3001/recharge/totalAmount");
//         if (amountResponse.ok) {
//           const amountData = await amountResponse.json();
//           setTransactionData((prevData) => ({
//             ...prevData,
//             totalAmount: amountData.totalAmount, // Update totalAmount
//           }));
//         } else {
//           throw new Error('Failed to fetch total amount');
//         }
        
//       } catch (error) {
//         console.error('Detailed error:', error);  // Log the error
//         setError(`Error loading data: ${error.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTransactionData();
//   }, []);

//   return (
//     <div style={{ textAlign: 'center' }}>
//       <h2>Details about the particular items of HKI</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p style={{ color: 'red' }}>{error}</p>
//       ) : (
//         <div className="card-container">
//           <div className="card">
//             <h3 className="circle">{transactionData.totalUsers}</h3>
//             <p>Registered Players</p>
//           </div>
//           <div className="card">
//             <h3 className="circle">{transactionData.totalAmount}</h3>
//             <p>Total Deposit</p> {/* Added new card for Total Amount */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import '../styles/AdminData.scss';

// export default function AdminHkiData() {
//   const [transactionData, setTransactionData] = useState({
//     totalTransaction: 0,
//     successfulRecharge: 0,
//     pendingWithdrawal: 0,
//     totalUsers: 0,
//     totalAmount: 0,
//     totalWithdraw: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTransactionData = async () => {
//       try {
//         // Simulating values for total transactions and successful recharges
//         setTransactionData((prevData) => ({
//           ...prevData,
//           totalTransaction: 5000,
//           successfulRecharge: 12,
//         }));

//         // Fetching the total users, amount, and totalWithdraw in parallel
//         const [userResponse, amountResponse, withdrawResponse] = await Promise.all([
//           fetch("http://localhost:3001/gameuser/total-users"),
//           fetch("http://localhost:3001/recharge/totalAmount"),
//           fetch("http://localhost:3001/withdraw/totalWithdraw"),
//         ]);

//         // Check if all responses are successful
//         if (userResponse.ok && amountResponse.ok && withdrawResponse.ok) {
//           const [userData, amountData, withdrawData] = await Promise.all([
//             userResponse.json(),
//             amountResponse.json(),
//             withdrawResponse.json(),
//           ]);

//           setTransactionData((prevData) => ({
//             ...prevData,
//             totalUsers: userData.totalUsers,
//             totalAmount: amountData.totalAmount,
//             totalWithdraw: withdrawData.totalWithdraw,
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
//     <div style={{ textAlign: 'center' }}>
//       <h2>Details about the particular items of HKI</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p style={{ color: 'red' }}>{error}</p>
//       ) : (
//         <div className="card-container">
//           <div className="card">
//             <div className="icon-container">
//               <i className="fas fa-users"></i> {/* Font Awesome User Icon */}
//             </div>
//             <h3 className="circle">{transactionData.totalUsers}</h3>
//             <p>Registered Players</p>
//           </div>
//           <div className="card">
//             <div className="icon-container">
//               <i className="fas fa-sync-alt"></i> {/* Font Awesome Recharge Icon */}
//             </div>
//             <h3 className="circle">{transactionData.totalAmount}</h3>
//             <p>Total Deposit</p>
//           </div>
//           <div className="card">
//             <div className="icon-container">
//               <i className="fas fa-arrow-alt-circle-down"></i> {/* Font Awesome Withdraw Icon */}
//             </div>
//             <h3 className="circle">{transactionData.totalWithdraw}</h3>
//             <p>Total Withdrawals</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


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
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchTransactionData = async () => {
//       try {
//         // Simulating values for total transactions and successful recharges
//         setTransactionData((prevData) => ({
//           ...prevData,
//           totalTransaction: 5000,
//           successfulRecharge: 12,
//         }));

//         // Fetching the total users, amount, and totalWithdraw in parallel
//         const [userResponse, amountResponse, withdrawResponse] = await Promise.all([
//           fetch("http://localhost:3001/gameuser/total-users"),
//           fetch("http://localhost:3001/recharge/totalAmount"),
//           fetch("http://localhost:3001/withdraw/totalWithdraw"),
//         ]);

//         // Check if all responses are successful
//         if (userResponse.ok && amountResponse.ok && withdrawResponse.ok) {
//           const [userData, amountData, withdrawData] = await Promise.all([
//             userResponse.json(),
//             amountResponse.json(),
//             withdrawResponse.json(),
//           ]);

//           setTransactionData((prevData) => ({
//             ...prevData,
//             totalUsers: userData.totalUsers,
//             totalAmount: amountData.totalAmount,
//             totalWithdraw: withdrawData.totalWithdraw,
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
//           </div>
//           <div className="card-third">
//             <div className="icon-container">
//               <FaArrowAltCircleDown size={40} color="#dc3545" />
//             </div>
//             <h3 className="circle">{transactionData.totalWithdraw}</h3>
//             <p className="card-text">Total Withdrawals</p>
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
    totalPending: 0,  // Added these two values
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
        const [userResponse, amountResponse, withdrawResponse, txStatusResponse] = await Promise.all([
          fetch("http://localhost:3001/gameuser/total-users"),
          fetch("http://localhost:3001/recharge/totalAmount"),
          fetch("http://localhost:3001/withdraw/totalWithdraw"),
          fetch("http://localhost:3001/recharge/txStatusCounts"),  // Fetch totalSuccess and totalPending
        ]);

        // Check if all responses are successful
        if (userResponse.ok && amountResponse.ok && withdrawResponse.ok && txStatusResponse.ok) {
          const [userData, amountData, withdrawData, txStatusData] = await Promise.all([
            userResponse.json(),
            amountResponse.json(),
            withdrawResponse.json(),
            txStatusResponse.json(),  // Extract the success and pending counts
          ]);

          setTransactionData((prevData) => ({
            ...prevData,
            totalUsers: userData.totalUsers,
            totalAmount: amountData.totalAmount,
            totalWithdraw: withdrawData.totalWithdraw,
            totalSuccess: txStatusData.totalSuccess,  // Set totalSuccess
            totalPending: txStatusData.totalPending,  // Set totalPending
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
          </div>
        </div>
      )}
    </div>
  );
}
