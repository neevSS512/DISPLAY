
// import React, { useEffect, useState } from 'react';
// import "../styles/userdatam.scss";

// const UserData = ({ user, handleClose }) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     if (user) {
//       setLoading(false);  
//     } else {
//       setError('No user data available');
//       setLoading(false);
//     }
//   }, [user]);

//   // If no user or closed, don't render
//   if (!user) {
//     return null; 
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }


//   return (
//     <div className='neev'>
//       <h3 className='ugm'>
//         More Info About The Game User
//         <button 
//            className='go-back-btn'
//            style={{ marginLeft: '510px' }} 
//            onClick={() => handleClose()}
//         >
//         Go Back
//         </button>
//       </h3>

//       <table className='table-stylegm'>
//         <thead>
//           <tr>
//             <th className="th-stylegm">Deposit</th>
//             <th className="th-stylegm">Winning</th>
//             <th className="th-stylegm">Bonus</th>
//             <th className="th-stylegm">Total_Cash</th>
//             <th className="th-stylegm">Payment_Counter</th>
//             <th className="th-stylegm">Withdraw_Counter</th>
//             <th className="th-stylegm">Referal_Count</th>
//             <th className="th-stylegm">Total_Referal_Earning</th>

//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//           <td className="td-stylegm">{user.deposit || '_'}</td>
//           <td className="td-stylegm">{user.Winning || '_'}</td>
//           <td className="tds-stylegm">{user.Bonus || '_'}</td>
//           <td className="td-stylegm">{user.totalcash || '_'}</td>
//           <td className="td-stylegm">{user.counters.paymnetcounter || '_'}</td>
//           <td className="td-stylegm">{user.counters.withdrawCounter || '_'}</td>
//           <td className="td-stylegm">{user.totalGameOfReferedUser || '_'}</td>
//           <td className="td-stylegm">{user.totalReferalEarning || '_'}</td>

//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserData;









// import React, { useEffect, useState } from 'react';
// import "../styles/userdatam.scss";
// import { RxCross2 } from "react-icons/rx";

// const UserData = ({ user, handleClose }) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [depositCount, setDepositCount] = useState(null); // State to store deposit count
//   const [fetchingDeposit, setFetchingDeposit] = useState(false); // To show loading for deposit fetch
//   const [showDepositCount, setShowDepositCount] = useState(false); // State to control deposit card visibility

//   useEffect(() => {
//     if (user) {
//       setLoading(false);
//     } else {
//       setError('No user data available');
//       setLoading(false);
//     }
//   }, [user]);

//   // Fetch deposit count when the deposit button is clicked
//   const fetchDepositCount = async () => {
//     if (!user || !user.mobile_no) {
//       return setError('Mobile number is missing');
//     }

//     setFetchingDeposit(true);
//     try {
//       // const response = await fetch(`/depositCountById/${user.mobile_no}`);
//       const response = await fetch(`http://localhost:3001/recharge/depositCountById/${user.mobile_no}`);
      
      
//       const data = await response.json();
//       if (response.ok) {
//         setDepositCount(data.depositCount); // Set the fetched deposit count
//         setShowDepositCount(true); // Show the deposit card after fetching
//         setError(''); // Clear any previous error
//       } else {
//         setError(data.message); // Set any error message
//         setDepositCount(null); // Reset deposit count on error
//       }
//     } catch (err) {
//       console.error("Error fetching deposit count:", err);
//       setError('An error occurred while fetching deposit data');
//       setDepositCount(null); // Reset deposit count on error
//     } finally {
//       setFetchingDeposit(false);
//     }
//   };

//   // Function to hide the deposit count card
//   const handleClearDepositCount = () => {
//     setShowDepositCount(false); // Set the state to hide the deposit card
//   };

//   // If no user or closed, don't render
//   if (!user) {
//     return null; 
//   }

//   if (loading) {
//     return <div className="loading-message">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }

//   return (
//     <>
//       <div className='neev'>
//         <h3 className='ugm'>
//           More Info About The Game User
//           <button 
//             className='go-back-btn'
//             style={{ marginLeft: '510px' }} 
//             onClick={() => handleClose()}
//           >
//             Go Back
//           </button>
//         </h3>

//         {/* Deposit Button to fetch deposit count */}
//         {/* <button 
//           className="deposit-btn"
//           onClick={fetchDepositCount} 
//           disabled={fetchingDeposit} // Disable while fetching
//         >
//           {fetchingDeposit ? 'Fetching Deposit Count...' : 'Get Deposit Count'}
//         </button> */}

//         {/* Display deposit count only if showDepositCount is true
//         // {showDepositCount && depositCount !== null && (
//         //   <div className="deposit-card dep-cent">
//         //     <div className="clear" onClick={handleClearDepositCount}>
//         //       <RxCross2 />
//         //     </div>
//         //     <h4>Deposit Count: {depositCount}</h4>
//         //   </div>
//         // )} */}

//         <table className='table-stylegm'>
//           <thead>
//             <tr>
//               <th className="th-stylegm">
//               <button 
//           className="deposit-btn"
//           onClick={fetchDepositCount} 
//           disabled={fetchingDeposit} // Disable while fetching
//         >
//           {fetchingDeposit ? 'Fetching Deposit Count...' : 'Deposit'}
//         </button>
//               </th>
//               <th className="th-stylegm">Winning</th>
//               <th className="th-stylegm">Bonus</th>
//               <th className="th-stylegm">Total_Cash</th>
//               <th className="th-stylegm">Payment_Counter</th>
//               <th className="th-stylegm">Withdraw_Counter</th>
//               <th className="th-stylegm">Referral_Count</th>
//               <th className="th-stylegm">Total_Referral_Earning</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="td-stylegm">{user.deposit || '_'}</td>
//               <td className="td-stylegm">{user.Winning || '_'}</td>
//               <td className="tds-stylegm">{user.Bonus || '_'}</td>
//               <td className="td-stylegm">{user.totalcash || '_'}</td>
//               <td className="td-stylegm">{user.counters.paymentCounter || '_'}</td>
//               <td className="td-stylegm">{user.counters.withdrawCounter || '_'}</td>
//               <td className="td-stylegm">{user.totalGameOfReferedUser || '_'}</td>
//               <td className="td-stylegm">{user.totalReferalEarning || '_'}</td>
//             </tr>
//           </tbody>
//         </table>
//               {/* Display deposit count only if showDepositCount is true */}
//           {showDepositCount && depositCount !== null && (
//           <div className="deposit-card dep-cent">
//             <div className="clear" onClick={handleClearDepositCount}>
//               <RxCross2 />
//             </div>
//             <h4>Deposit Count: {depositCount}</h4>
//           </div>
//         )}
     
//       </div>


//     </>
//   );
// };

// export default UserData;






import React, { useEffect, useState } from 'react';
import "../styles/userdatam.scss";
import { RxCross2 } from "react-icons/rx";

const UserData = ({ user, handleClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [depositDetails, setDepositDetails] = useState([]);
  const [fetchingDepositDetails, setFetchingDepositDetails] = useState(false);
  const [showDepositCount, setShowDepositCount] = useState(false); // Controls visibility of the deposit details
  const [withdrawDetails, setWithdrawDetails] = useState([]);
  const [fetchingWithdrawDetails, setFetchingWithdrawDetails] = useState(false);
  const [showWithdrawCount, setShowWithdrawCount] = useState(false); // Controls visibility of the deposit details

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setError('No user data available');
      setLoading(false);
    }
  }, [user]);

  const fetchDepositDetails = async () => {
    if (!user || !user.mobile_no) {
      return setError('Mobile number is missing');
    }

    setFetchingDepositDetails(true);
    try {
      const response = await fetch(`http://localhost:3001/recharge/depositDetailsById/${user.mobile_no}`);
      const data = await response.json();
      if (response.ok) {
        setDepositDetails(data.rechargeDetails);  
        setError('');
        setShowDepositCount(true); // Show deposit details if the fetch is successful
      } else {
        setError(data.message);
        setDepositDetails([]); 
        setShowDepositCount(false); // Hide deposit details on error
      }
    } catch (err) {
      console.error("Error fetching deposit details:", err);
      setError('An error occurred while fetching deposit details');
      setDepositDetails([]);
      setShowDepositCount(false); // Hide deposit details on error
    } finally {
      setFetchingDepositDetails(false);
    }
  };

  const fetchWithdrawDetails = async () => {
    if (!user || !user.phn) {
      console.log('Error: Mobile number is missing');
      return setError('Mobile number is missing');
    }
  
    console.log('Fetching withdraw details for mobile number:', user.phn);
  
    setFetchingWithdrawDetails(true);
    try {
      const response = await fetch(`http://localhost:3001/withdraw/withdrawDetailsByMobile/${user.phn}`);
      const data = await response.json();
      console.log('API Response Data:', data); // Log the response data
  
      if (response.ok) {
        setWithdrawDetails(data.withdrawDetails);  // Ensure you're setting the correct data
        setError('');
        setShowWithdrawCount(true); // Show withdraw details if the fetch is successful
      } else {
        setError(data.message);
        setWithdrawDetails([]); 
        setShowWithdrawCount(false); // Hide withdraw details on error
      }
    } catch (err) {
      console.error("Error fetching withdraw details:", err);
      setError('An error occurred while fetching withdraw details');
      setWithdrawDetails([]);
      setShowWithdrawCount(false); // Hide withdraw details on error
    } finally {
      setFetchingWithdrawDetails(false);
    }
  
   
  };









  const handleClearDepositCount = () => {
    setShowDepositCount(false); // Hide the deposit details card
  };

  const toggleDepositDetails = () => {
    if (showDepositCount) {
      setShowDepositCount(false); // Hide the details if already visible
    } else {
      fetchDepositDetails(); // Fetch and show details if not already visible
    }
  };

  const handleClearWithdrawCount = () => {
    setShowWithdrawCount(false); // Hide the deposit details card
  };

  const toggleWithdrawDetails = () => {
    if (showWithdrawCount) {
      setShowWithdrawCount(false); // Hide the details if already visible
    } else {
      fetchWithdrawDetails(); // Fetch and show details if not already visible
    }
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
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
              <th className="th-stylegm">
                <button 
                  className="display-btn"
                  onClick={toggleDepositDetails}
                  disabled={fetchingDepositDetails}
                >
                  {fetchingDepositDetails ? 'Fetching Details...' : showDepositCount ? 'Deposite' : 'Deposite'}
                </button>
              </th>
              <th className="th-stylegm">Winning</th>
              <th className="th-stylegm">Bonus</th>
              <th className="th-stylegm">Total_Cash</th>
              <th className="th-stylegm">Payment_Counter</th>
              {/* <th className="th-stylegm">Withdraw_Counter</th> */}
              <th className="th-stylegm">
                <button 
                  className="display-btn"
                  onClick={toggleWithdrawDetails}
                  disabled={fetchingWithdrawDetails}
                >
                  {fetchingWithdrawDetails ? 'Fetching Details...' : showWithdrawCount ? 'Withdraw' : 'Withdraw'}
                </button>
              </th>
              <th className="th-stylegm">Referral_Count</th>
              <th className="th-stylegm">Total_Referral_Earning</th>
              <th className="th-stylegm"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="td-stylegm">{user.deposit || '_'}</td>
              <td className="td-stylegm">{user.Winning || '_'}</td>
              <td className="td-stylegm">{user.Bonus || '_'}</td>
              <td className="td-stylegm">{user.totalcash || '_'}</td>
              <td className="td-stylegm">{user.counters.paymentCounter || '_'}</td>
              <td className="td-stylegm">{user.counters.withdrawCounter || '_'}</td>
              <td className="td-stylegm">{user.totalGameOfReferedUser || '_'}</td>
              <td className="td-stylegm">{user.totalReferalEarning || '_'}</td>
            </tr>
          </tbody>
        </table>

        {/* Deposit details table */}
        {showDepositCount && depositDetails.length > 0 && (
          <div className="neevr">
            <table className="table-stylegmr">
              <thead>
                <tr>
                  <th className="th-stylegmr">Amount</th>
                  <th className="th-stylegmr">Transaction Date</th>
                  <th className="th-stylegmr">Status</th>
                  <th className="th-stylegmr">
                    <div className="clear" onClick={handleClearDepositCount}>
                      <RxCross2 />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {depositDetails.map((detail) => (
                  <tr key={detail._id}>
                    <td className="td-stylegmr">{detail.amount}</td>
                    <td className="td-stylegmrs">{new Date(detail.transDate).toLocaleString()}</td>
                    <td className={`td-stylegmr ${detail.txStatus === 'PENDING' ? 'status-pending' : 'status-success'}`}>
                     {detail.txStatus}
                    
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}






        {/* Deposit details table */}

        {showWithdrawCount && withdrawDetails.length > 0 && (
  <div className="neevr">
    <table className="table-stylegmr">
      <thead>
        <tr>
          <th className="th-stylegmr">Amount</th>
          <th className="th-stylegmr">
            <div className="clear" onClick={handleClearWithdrawCount}>
              <RxCross2 />
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {withdrawDetails.map((detail) => (
          <tr key={detail._id}>
            <td className="td-stylegmr">{detail.totalAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}




      </div>
    </>
  );
};

export default UserData;
