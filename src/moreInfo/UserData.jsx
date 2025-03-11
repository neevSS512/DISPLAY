
// // import React, { useEffect, useState } from 'react';
// // import "../styles/userdatam.scss";

// // const UserData = ({ user, handleClose }) => {
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     if (user) {
// //       setLoading(false);  
// //     } else {
// //       setError('No user data available');
// //       setLoading(false);
// //     }
// //   }, [user]);

// //   // If no user or closed, don't render
// //   if (!user) {
// //     return null; 
// //   }

// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   if (error) {
// //     return <div>{error}</div>;
// //   }


// //   return (
// //     <div className='neev'>
// //       <h3 className='ugm'>
// //         More Info About The Game User
// //         <button 
// //            className='go-back-btn'
// //            style={{ marginLeft: '510px' }} 
// //            onClick={() => handleClose()}
// //         >
// //         Go Back
// //         </button>
// //       </h3>

// //       <table className='table-stylegm'>
// //         <thead>
// //           <tr>
// //             <th className="th-stylegm">Deposit</th>
// //             <th className="th-stylegm">Winning</th>
// //             <th className="th-stylegm">Bonus</th>
// //             <th className="th-stylegm">Total_Cash</th>
// //             <th className="th-stylegm">Payment_Counter</th>
// //             <th className="th-stylegm">Withdraw_Counter</th>
// //             <th className="th-stylegm">Referal_Count</th>
// //             <th className="th-stylegm">Total_Referal_Earning</th>

// //           </tr>
// //         </thead>
// //         <tbody>
// //           <tr>
// //           <td className="td-stylegm">{user.deposit || '_'}</td>
// //           <td className="td-stylegm">{user.Winning || '_'}</td>
// //           <td className="tds-stylegm">{user.Bonus || '_'}</td>
// //           <td className="td-stylegm">{user.totalcash || '_'}</td>
// //           <td className="td-stylegm">{user.counters.paymnetcounter || '_'}</td>
// //           <td className="td-stylegm">{user.counters.withdrawCounter || '_'}</td>
// //           <td className="td-stylegm">{user.totalGameOfReferedUser || '_'}</td>
// //           <td className="td-stylegm">{user.totalReferalEarning || '_'}</td>

// //           </tr>
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default UserData;










// import React, { useState, useEffect } from 'react';
// import { RxCross2 } from 'react-icons/rx';
// import "../styles/userdatam.scss";
// import WithdrawMore from "../sidebarData/WithdrawMore";
// import DepositeMore from "../sidebarData/DepositeMore";

// const UserData = ({ user, handleClose }) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [depositDetails, setDepositDetails] = useState([]);
//   const [fetchingDepositDetails, setFetchingDepositDetails] = useState(false);
//   const [showDepositCount, setShowDepositCount] = useState(false);
//   const [showWithdrawTable, setShowWithdrawTable] = useState(false);
//   const [showRechargeTable, setShowRechargeTable] = useState(false);
//   const [showKycData, setShowKycData] = useState(false);  // state to handle KYC visibility
//   const [activeSection, setActiveSection] = useState(null); // Can be 'withdraw', 'recharge', 'kyc'


//   useEffect(() => {
//     if (user) {
//       setLoading(false);
//     } else {
//       setError('No user data available');
//       setLoading(false);
//     }
//   }, [user]);

//   const fetchDepositDetails = async () => {
//     if (!user || !user.mobile_no) {
//       return setError('Mobile number is missing');
//     }

//     setFetchingDepositDetails(true);
//     try {
//       const response = await fetch(`http://localhost:3001/recharge/depositDetailsById/${user.mobile_no}`);
//       const data = await response.json();
//       if (response.ok) {
//         setDepositDetails(data.rechargeDetails);
//         setError('');
//         setShowDepositCount(true);
//       } else {
//         setError(data.message);
//         setDepositDetails([]);
//         setShowDepositCount(false);
//       }
//     } catch (err) {
//       setError('An error occurred while fetching deposit details');
//       setDepositDetails([]);
//       setShowDepositCount(false);
//     } finally {
//       setFetchingDepositDetails(false);
//     }
//   };

//   const handleClearDepositCount = () => {
//     setShowDepositCount(false);
//   };

//   const toggleDepositDetails = () => {
//     if (showDepositCount) {
//       setShowDepositCount(false);
//     } else {
//       fetchDepositDetails();
//     }
//   };

//   const toggleWithdrawTable = () => {
//     setShowWithdrawTable((prev) => !prev);
//   };

//   const toggleRechargeTable = () => {
//     setShowRechargeTable((prev) => !prev);
//   };
//   //   // KYC Data Button Click Handler
//   const toggleKycData = () => {
//     setShowKycData(!showKycData);
//   };

//   if (!user) {
//     return null;
//   }

//   if (loading) {
//     return <div className="loading-message">Loading...</div>;
//   }

//   if (error) {
//     return <div className="error-message">{error}</div>;
//   }
//   const toggleWithdrawTable = () => {
//     setActiveSection(activeSection === 'withdraw' ? null : 'withdraw');
//   };
  
//   const toggleRechargeTable = () => {
//     setActiveSection(activeSection === 'recharge' ? null : 'recharge');
//   };
  
//   const toggleKycData = () => {
//     setActiveSection(activeSection === 'kyc' ? null : 'kyc');
//   };
  

//   return (
//     <>
//       <div className="neev">
//         <h3 className="ugm">
//           More Info About The Game User
//           <button 
//             className="go-back-btn"
//             style={{ marginLeft: '510px' }} 
//             onClick={() => handleClose()}
//           >
//             Go Back
//           </button>
//         </h3>

//         <table className="table-stylegm">
//           <thead>
//             <tr>
//               <th className="th-stylegm">
//                 <button 
//                   className="display-btn"
//                   onClick={toggleDepositDetails}
//                   disabled={fetchingDepositDetails}
//                 >
//                   {fetchingDepositDetails ? 'Fetching Details...' : showDepositCount ? 'Deposite' : 'Deposite'}
//                 </button>
//               </th>
//               <th className="th-stylegm">Winning</th>
//               <th className="th-stylegm">Bonus</th>
//               <th className="th-stylegm">Total_Cash</th>
//               <th className="th-stylegm">Payment_Counter</th>
//               <th className="th-stylegm">Withdraw_Counter</th>
//               <th className="th-stylegm">Referral_Count</th>
//               <th className="th-stylegm">Total_Referral_Earning</th>
//               <th className="th-stylegm"></th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="td-stylegm">{user.deposit || '_'}</td>
//               <td className="td-stylegm">{user.Winning || '_'}</td>
//               <td className="td-stylegm">{user.Bonus || '_'}</td>
//               <td className="td-stylegm">{user.totalcash || '_'}</td>
//               <td className="td-stylegm">{user.counters.paymentCounter || '_'}</td>
//               <td className="td-stylegm">{user.counters.withdrawCounter || '_'}</td>
//               <td className="td-stylegm">{user.totalGameOfReferedUser || '_'}</td>
//               <td className="td-stylegm">{user.totalReferalEarning || '_'}</td>
//             </tr>
//           </tbody>
//         </table>


       

//         {showDepositCount && depositDetails.length > 0 && (
//           <div className="neevr">
//             <table className="table-stylegmr">
//               <thead>
//                 <tr>
//                   <th className="th-stylegmr">Amount</th>
//                   <th className="th-stylegmr">Transaction Date</th>
//                   <th className="th-stylegmr">Status</th>
//                   <th className="th-stylegmr">
//                     <div className="clear" onClick={handleClearDepositCount}>
//                       <RxCross2 />
//                     </div>
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {depositDetails.map((detail) => (
//                   <tr key={detail._id}>
//                     <td className="td-stylegmr">{detail.amount}</td>
//                     <td className="td-stylegmrs">{new Date(detail.transDate).toLocaleString()}</td>
//                     <td className={`td-stylegmr ${detail.txStatus === 'PENDING' ? 'status-pending' : 'status-success'}`}>
//                       {detail.txStatus}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         <div className="button-container">
//           <button onClick={toggleWithdrawTable} className="w-btn">
//             {showWithdrawTable ? 'Hide Withdrawal' : 'Show Withdrawal'}
//           </button>
//           <button onClick={toggleRechargeTable} className="r-btn">
//             {showRechargeTable ? 'Hide Recharge' : 'Show Recharge'}
//           </button>

//           <button
//           className="k-btn"
//           onClick={toggleKycData}  // Toggle KYC Table visibility
//         >
//           {showKycData ? 'Hide KYC Data' : 'Show KYC Data'}
//         </button>



        

//         </div>

//         {showWithdrawTable && <WithdrawMore phoneNumber={user.mobile_no} />}
//         {showRechargeTable && <DepositeMore user={user} />}



//         {/* Conditional Rendering for KYC Data Table */}
         
//       {showKycData && (
//         <div className="kyc-table">
//           <h3 className='ugm'>KYC Details</h3>
//           <table className='table-stylegm'>
//             <thead>
//               <tr>
               
//                 <th className="th-stylegm">user_kyc_name</th>
//                 <th className="th-stylegm">Pan Number</th>
//                 <th className="th-stylegm">pan_verified</th>
//                 <th className="th-stylegm">aadhar Number</th>
//                 <th className="th-stylegm">aadhar_verified</th>
//                 <th className="th-stylegm">State</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
              
//                 <td className="td-stylegm">{user.user_kyc_name || '-'}</td>
//                 <td className="td-stylegm">{user.panNumber || '_'}</td>
//                 <td className="td-stylegm">{user.isPanVerified ? 'Yes' : 'No'}</td>
//                 <td className="td-stylegm">{user.aadharNumber || '_'}</td>
//                 <td className="td-stylegm">{user.isAadharVerified ? 'Yes' : 'No'}</td> 
//                 <td className="td-stylegm">{user.state || '-'}</td>

//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}
//       </div>


//     </>
//   );
// };

// export default UserData;










import React, { useState, useEffect } from 'react';
import "../styles/userdatam.scss";
import WithdrawMore from "../sidebarData/WithdrawMore";
import DepositeMore from "../sidebarData/DepositeMore";

const UserData = ({ user, handleClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showWithdrawTable, setShowWithdrawTable] = useState(false);
  const [showRechargeTable, setShowRechargeTable] = useState(false);
  const [showKycData, setShowKycData] = useState(false);
  const [showMoreData,setShowMoreData] =useState(false);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setError('No user data available');
      setLoading(false);
    }
  }, [user]);
  const toggleWithdrawTable = () => {
    // Hide all other sections before showing withdraw section
    setShowWithdrawTable(true);
    setShowRechargeTable(false);
    setShowKycData(false);
    setShowMoreData(false);
  };

  const toggleRechargeTable = () => {
    // Hide all other sections before showing recharge section
    setShowWithdrawTable(false);
    setShowRechargeTable(true);
    setShowKycData(false);
    setShowMoreData(false);
  };

  const toggleKycData = () => {
    // Hide all other sections before showing KYC data
    setShowWithdrawTable(false);
    setShowRechargeTable(false);
    setShowKycData(true);
    setShowMoreData(false);
  };
  const toggleMoreData = () => {
    // Hide all other sections before showing KYC data
    setShowWithdrawTable(false);
    setShowRechargeTable(false);
    setShowMoreData(true);
    setShowKycData(false);
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
      <div className="neev">
        <h3 className="ugm">
          More Info About The Game User
          <button 
            className="go-back-btn"
            style={{ marginLeft: '510px' }} 
            onClick={() => handleClose()}
          >
            Go Back
          </button>
        </h3>

        <table className="table-stylegm">
          <thead>
            <tr>
              <th className="th-stylegm">Deposit</th>
              <th className="th-stylegm">Winning</th>
              <th className="th-stylegm">Bonus</th>
              <th className="th-stylegm">Total_Cash</th>
              <th className="th-stylegm">Withdraw_Counter</th>
              <th className="th-stylegm">Referral_Count</th>
              <th className="th-stylegm">Total_Referral_Earning</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="td-stylegm">{user.deposit || '_'}</td>
              <td className="td-stylegm">{user.Winning || '_'}</td>
              <td className="td-stylegm">{user.Bonus || '_'}</td>
              <td className="td-stylegm">{user.totalcash || '_'}</td>
              <td className="td-stylegm">{user.counters.withdrawCounter|| '_'}</td>
              <td className="td-stylegm">{user.totalGameOfReferedUser || '_'}</td>
              <td className="td-stylegm">{user.totalReferalEarning || '_'}</td>
            </tr>
          </tbody>
        </table>

        <div className="button-container">
          <button 
            onClick={toggleWithdrawTable} 
            className="w-btn"
          >
            {/* {showWithdrawTable ? 'Hide Withdrawal' : 'Show Withdrawal'} */}
            {showWithdrawTable ? 'Withdrawal Data' : 'Withdrawal Data'}
          </button>
          <button 
            onClick={toggleRechargeTable} 
            className="r-btn"
          >
            {showRechargeTable ? 'Recharge Data' : 'Recharge Data'}
          </button>

          <button 
            onClick={toggleKycData} 
            className="k-btn"
          >
            {showKycData ? 'KYC Data' : 'KYC Data'}
          </button>
          <button 
            onClick={toggleMoreData} 
            className="m-btn"
          >
            {showKycData ? 'More Data' : 'More Data'}
          </button>
          <button 
            onClick={toggleMoreData} 
            className="l-btn"
          >
            {showKycData ? 'ludo Game Play' : 'ludo Game Play'}
          </button>
          <button 
            onClick={toggleMoreData} 
            className="s-btn"
          >
            {showKycData ? 'Snake Game Play' : 'Snake Game Play'}
          </button>
          <button 
            onClick={toggleMoreData} 
            className="rm-btn"
          >
            {showKycData ? 'Rummy Game Play' : 'Rummy Game Play'}
          </button>
        </div>

        {showWithdrawTable && <WithdrawMore phoneNumber={user.mobile_no} />}
        {showRechargeTable && <DepositeMore user={user} />}

        {showKycData && (
          <div className="kyc-table">
            <h3 className='ugm'>KYC Details</h3>
            <table className='table-stylegm'>
              <thead>
                <tr>
                  <th className="th-stylegm">user_kyc_name</th>
                  <th className="th-stylegm">Pan Number</th>
                  <th className="th-stylegm">pan_verified</th>
                  <th className="th-stylegm">aadhar Number</th>
                  <th className="th-stylegm">aadhar_verified</th>
                  <th className="th-stylegm">State</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-stylegm">{user.user_kyc_name || '-'}</td>
                  <td className="td-stylegm">{user.panNumber || '_'}</td>
                  <td className="td-stylegm">{user.isPanVerified ? 'Yes' : 'No'}</td>
                  <td className="td-stylegm">{user.aadharNumber || '_'}</td>
                  <td className="td-stylegm">{user.isAadharVerified ? 'Yes' : 'No'}</td> 
                  <td className="td-stylegm">{user.state || '-'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}





       {showMoreData && (
          <div className="kyc-table">
            <h3 className='ugm'>More Details</h3>
            <table className='table-stylegm'>
              <thead>
                <tr>
                  <th className="th-stylegm">User_name</th>
                  <th className="th-stylegm">Mobile_no</th>
                  <th className="th-stylegm">Cd_ist</th>
                  <th className="th-stylegm">State</th>
                  <th className="th-stylegm">Det</th>
                  <th className="th-stylegm">Payment_counter</th>
                  <th className="th-stylegm">Yearly_Paymne_Counter</th>
                  

                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-stylegm">{user.un || '-'}</td>
                  <td className="td-stylegm">{user.mobile_no|| '_'}</td>
                  <td className="td-stylegm">{user.cd_ist || '_'}</td>
                  <td className="td-stylegm">{user.state || '-'}</td>
                  <td className="td-stylegm">{user.det|| '-'}</td>
                  <td className="td-stylegm">{user.counters.paymnetcounter || '_'}</td>
                  <td className="td-stylegm">{user.counters.yearlyPaymnetcounter || '-'}</td>
           
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default UserData;
