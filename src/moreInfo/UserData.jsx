



// import React, { useState, useEffect } from 'react';
// import "../styles/userdatam.scss";
// import WithdrawMore from "../sidebarData/WithdrawMore";
// import DepositeMore from "../sidebarData/DepositeMore";
// import LudoSnakePlay from '../sidebarData/LudoSnakePlay';

// const UserData = ({ user, handleClose }) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showWithdrawTable, setShowWithdrawTable] = useState(false);
//   const [showRechargeTable, setShowRechargeTable] = useState(false);
//   const [showKycData, setShowKycData] = useState(false);
//   const [showMoreData,setShowMoreData] =useState(false);
//   const [showludoPlay,setShowLudoPlay]=useState(false);

//   useEffect(() => {
//     if (user) {
//       setLoading(false);
//     } else {
//       setError('No user data available');
//       setLoading(false);
//     }
//   }, [user]);
//   const toggleWithdrawTable = () => {
//     // Hide all other sections before showing withdraw section
//     setShowWithdrawTable(true);
//     setShowRechargeTable(false);
//     setShowKycData(false);
//     setShowMoreData(false);
//     setShowLudoPlay(false)
//   };

//   const toggleRechargeTable = () => {
//     // Hide all other sections before showing recharge section
//     setShowWithdrawTable(false);
//     setShowRechargeTable(true);
//     setShowKycData(false);
//     setShowMoreData(false);
//     setShowLudoPlay(false)
//   };

//   const toggleKycData = () => {
//     // Hide all other sections before showing KYC data
//     setShowWithdrawTable(false);
//     setShowRechargeTable(false);
//     setShowKycData(true);
//     setShowMoreData(false);
//     setShowLudoPlay(false)
//   };
//   const toggleMoreData = () => {
//     // Hide all other sections before showing More data
//     setShowWithdrawTable(false);
//     setShowRechargeTable(false);
//     setShowMoreData(true);
//     setShowKycData(false);
//     setShowLudoPlay(false)
//   };
//   const toggleLudoPlayData = () => {
//     // Hide all other sections before showing LudoPlay data
//     setShowWithdrawTable(false);
//     setShowRechargeTable(false);
//     setShowMoreData(false);
//     setShowKycData(false);
//     setShowLudoPlay(true)
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
//               <th className="th-stylegm">Deposit</th>
//               <th className="th-stylegm">Winning</th>
//               <th className="th-stylegm">Bonus</th>
//               <th className="th-stylegm">Total_Cash</th>
//               <th className="th-stylegm">Withdraw_Counter</th>
//               <th className="th-stylegm">Referral_Count</th>
//               <th className="th-stylegm">Total_Referral_Earning</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="td-stylegm">{user.deposit || '_'}</td>
//               <td className="td-stylegm">{user.Winning || '_'}</td>
//               <td className="td-stylegm">{user.Bonus || '_'}</td>
//               <td className="td-stylegm">{user.totalcash || '_'}</td>
//               <td className="td-stylegm">{user.counters.withdrawCounter|| '_'}</td>
//               <td className="td-stylegm">{user.totalGameOfReferedUser || '_'}</td>
//               <td className="td-stylegm">{user.totalReferalEarning || '_'}</td>
//             </tr>
//           </tbody>
//         </table>

//         <div className="button-container">
//           <button 
//             onClick={toggleWithdrawTable} 
//             className="w-btn"
//           >
//             {/* {showWithdrawTable ? 'Hide Withdrawal' : 'Show Withdrawal'} */}
//             {showWithdrawTable ? 'Withdrawal Data' : 'Withdrawal Data'}
//           </button>
//           <button 
//             onClick={toggleRechargeTable} 
//             className="r-btn"
//           >
//             {showRechargeTable ? 'Recharge Data' : 'Recharge Data'}
//           </button>

//           <button 
//             onClick={toggleKycData} 
//             className="k-btn"
//           >
//             {showKycData ? 'KYC Data' : 'KYC Data'}
//           </button>
//           <button 
//             onClick={toggleMoreData} 
//             className="m-btn"
//           >
//             {showKycData ? 'More Data' : 'More Data'}
//           </button>
//           <button 
//             onClick={toggleLudoPlayData} 
//             className="l-btn"
//           >
//             {showludoPlay ? 'ludo Game Play' : 'ludo Game Play'}
//           </button>
//           <button 
//             onClick={toggleMoreData} 
//             className="s-btn"
//           >
//             {showKycData ? 'Snake Game Play' : 'Snake Game Play'}
//           </button>
//           <button 
//             onClick={toggleMoreData} 
//             className="rm-btn"
//           >
//             {showKycData ? 'Rummy Game Play' : 'Rummy Game Play'}
//           </button>
//         </div>

//         {showWithdrawTable && <WithdrawMore phoneNumber={user.mobile_no} />}
//         {showRechargeTable && <DepositeMore user={user} />}
//         {showludoPlay && <LudoSnakePlay user={user} />}


//         {showKycData && (
//           <div className="kyc-table">
//             <h3 className='ugm'>KYC Details</h3>
//             <table className='table-stylegm'>
//               <thead>
//                 <tr>
//                   <th className="th-stylegm">user_kyc_name</th>
//                   <th className="th-stylegm">Pan Number</th>
//                   <th className="th-stylegm">pan_verified</th>
//                   <th className="th-stylegm">aadhar Number</th>
//                   <th className="th-stylegm">aadhar_verified</th>
//                   <th className="th-stylegm">State</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="td-stylegm">{user.user_kyc_name || '-'}</td>
//                   <td className="td-stylegm">{user.panNumber || '_'}</td>
//                   <td className="td-stylegm">{user.isPanVerified ? 'Yes' : 'No'}</td>
//                   <td className="td-stylegm">{user.aadharNumber || '_'}</td>
//                   <td className="td-stylegm">{user.isAadharVerified ? 'Yes' : 'No'}</td> 
//                   <td className="td-stylegm">{user.state || '-'}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}





//        {showMoreData && (
//           <div className="kyc-table">
//             <h3 className='ugm'>More Details</h3>
//             <table className='table-stylegm'>
//               <thead>
//                 <tr>
//                   <th className="th-stylegm">User_name</th>
//                   <th className="th-stylegm">Mobile_no</th>
//                   <th className="th-stylegm">Cd_ist</th>
//                   <th className="th-stylegm">State</th>
//                   <th className="th-stylegm">Det</th>
//                   <th className="th-stylegm">Payment_counter</th>
//                   <th className="th-stylegm">Yearly_Paymne_Counter</th>
                  

//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="td-stylegm">{user.un || '-'}</td>
//                   <td className="td-stylegm">{user.mobile_no|| '_'}</td>
//                   <td className="td-stylegm">{user.cd_ist || '_'}</td>
//                   <td className="td-stylegm">{user.state || '-'}</td>
//                   <td className="td-stylegm">{user.det|| '-'}</td>
//                   <td className="td-stylegm">{user.counters.paymnetcounter || '_'}</td>
//                   <td className="td-stylegm">{user.counters.yearlyPaymnetcounter || '-'}</td>
           
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default UserData;






// import React, { useState, useEffect } from 'react';
// import "../styles/userdatam.scss";
// import WithdrawMore from "../sidebarData/WithdrawMore";
// import DepositeMore from "../sidebarData/DepositeMore";
// import LudoSnakePlay from '../sidebarData/LudoSnakePlay';

// const UserData = ({ user, handleClose }) => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showWithdrawTable, setShowWithdrawTable] = useState(false);
//   const [showRechargeTable, setShowRechargeTable] = useState(false);
//   const [showKycData, setShowKycData] = useState(false);
//   const [showMoreData, setShowMoreData] = useState(false);
//   const [showLudoPlay, setShowLudoPlay] = useState(false);

//   useEffect(() => {
//     if (user) {
//       setLoading(false);
//     } else {
//       setError('No user data available');
//       setLoading(false);
//     }
//   }, [user]);

//   const toggleWithdrawTable = () => {
//     setShowWithdrawTable(true);
//     setShowRechargeTable(false);
//     setShowKycData(false);
//     setShowMoreData(false);
//     setShowLudoPlay(false);
//   };

//   const toggleRechargeTable = () => {
//     setShowWithdrawTable(false);
//     setShowRechargeTable(true);
//     setShowKycData(false);
//     setShowMoreData(false);
//     setShowLudoPlay(false);
//   };

//   const toggleKycData = () => {
//     setShowWithdrawTable(false);
//     setShowRechargeTable(false);
//     setShowKycData(true);
//     setShowMoreData(false);
//     setShowLudoPlay(false);
//   };

//   const toggleMoreData = () => {
//     setShowWithdrawTable(false);
//     setShowRechargeTable(false);
//     setShowMoreData(true);
//     setShowKycData(false);
//     setShowLudoPlay(false);

//   };

//   const toggleLudoPlayData = () => {
//     setShowWithdrawTable(false);
//     setShowRechargeTable(false);
//     setShowMoreData(false);
//     setShowKycData(false);
//     setShowLudoPlay(true);
    
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
//               <th className="th-stylegm">Deposit</th>
//               <th className="th-stylegm">Winning</th>
//               <th className="th-stylegm">Bonus</th>
//               <th className="th-stylegm">Total_Cash</th>
//               <th className="th-stylegm">Withdraw_Counter</th>
//               <th className="th-stylegm">Referral_Count</th>
//               <th className="th-stylegm">Total_Referral_Earning</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="td-stylegm">{user.deposit || '_'}</td>
//               <td className="td-stylegm">{user.Winning || '_'}</td>
//               <td className="td-stylegm">{user.Bonus || '_'}</td>
//               <td className="td-stylegm">{user.totalcash || '_'}</td>
//               <td className="td-stylegm">{user.counters.withdrawCounter || '_'}</td>
//               <td className="td-stylegm">{user.totalGameOfReferedUser || '_'}</td>
//               <td className="td-stylegm">{user.totalReferalEarning || '_'}</td>
//             </tr>
//           </tbody>
//         </table>

//         <div className="button-container">
//           <button onClick={toggleWithdrawTable} className="w-btn">
//             Withdrawal Data
//           </button>
//           <button onClick={toggleRechargeTable} className="r-btn">
//             Recharge Data
//           </button>

//           <button onClick={toggleKycData} className="k-btn">
//             KYC Data
//           </button>

//           <button onClick={toggleMoreData} className="m-btn">
//             More Data
//           </button>

//           <button onClick={toggleLudoPlayData} className="l-btn">
//             Ludo Game Play
//           </button>
//         </div>

//         {showWithdrawTable && <WithdrawMore phoneNumber={user.mobile_no} />}
//         {showRechargeTable && <DepositeMore user={user} />}
        
//         {showLudoPlay && <LudoSnakePlay userId={user._id} />}


//         {showKycData && (
//           <div className="kyc-table">
//             <h3 className="ugm">KYC Details</h3>
//             <table className="table-stylegm">
//               <thead>
//                 <tr>
//                   <th className="th-stylegm">User KYC Name</th>
//                   <th className="th-stylegm">Pan Number</th>
//                   <th className="th-stylegm">Pan Verified</th>
//                   <th className="th-stylegm">Aadhar Number</th>
//                   <th className="th-stylegm">Aadhar Verified</th>
//                   <th className="th-stylegm">State</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="td-stylegm">{user.user_kyc_name || '-'}</td>
//                   <td className="td-stylegm">{user.panNumber || '_'}</td>
//                   <td className="td-stylegm">{user.isPanVerified ? 'Yes' : 'No'}</td>
//                   <td className="td-stylegm">{user.aadharNumber || '_'}</td>
//                   <td className="td-stylegm">{user.isAadharVerified ? 'Yes' : 'No'}</td> 
//                   <td className="td-stylegm">{user.state || '-'}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}

//         {showMoreData && (
//           <div className="kyc-table">
//             <h3 className="ugm">More Details</h3>
//             <table className="table-stylegm">
//               <thead>
//                 <tr>
//                   <th className="th-stylegm">User Name</th>
//                   <th className="th-stylegm">Mobile No</th>
//                   <th className="th-stylegm">CD IST</th>
//                   <th className="th-stylegm">State</th>
//                   <th className="th-stylegm">Details</th>
//                   <th className="th-stylegm">Payment Counter</th>
//                   <th className="th-stylegm">Yearly Payment Counter</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td className="td-stylegm">{user.un || '-'}</td>
//                   <td className="td-stylegm">{user.mobile_no || '_'}</td>
//                   <td className="td-stylegm">{user.cd_ist || '_'}</td>
//                   <td className="td-stylegm">{user.state || '-'}</td>
//                   <td className="td-stylegm">{user.det || '-'}</td>
//                   <td className="td-stylegm">{user.counters.paymentcounter || '_'}</td>
//                   <td className="td-stylegm">{user.counters.yearlyPaymnetcounter || '-'}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default UserData;








import React, { useState, useEffect } from 'react';
import "../styles/userdatam.scss";
import WithdrawMore from "../sidebarData/WithdrawMore";
import DepositeMore from "../sidebarData/DepositeMore";
import LudoSnakePlay from '../sidebarData/LudoSnakePlay';
import SnakePlayData from "../sidebarData/SnakePlayData";
import RummyPlayData from '../sidebarData/RummyPlayData';

const UserData = ({ user, handleClose }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showWithdrawTable, setShowWithdrawTable] = useState(false);
  const [showRechargeTable, setShowRechargeTable] = useState(false);
  const [showKycData, setShowKycData] = useState(false);
  const [showMoreData, setShowMoreData] = useState(false);
  const [showLudoPlay, setShowLudoPlay] = useState(false);
  const [showSnakePlay, setShowSnakePlay] = useState(false);
  const [showRummyPlay, setShowRummyPlay] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(false);
    } else {
      setError('No user data available');
      setLoading(false);
    }
  }, [user]);

  const toggleWithdrawTable = () => {
    setShowWithdrawTable(true);
    setShowRechargeTable(false);
    setShowKycData(false);
    setShowRummyPlay(false);
    setShowMoreData(false);
    setShowLudoPlay(false);
    setShowSnakePlay(false);
  };

  const toggleRechargeTable = () => {
    setShowWithdrawTable(false);
    setShowRechargeTable(true);
    setShowKycData(false);
    setShowMoreData(false);
    setShowLudoPlay(false);
    setShowRummyPlay(false);
    setShowSnakePlay(false);
  };

  const toggleKycData = () => {
    setShowWithdrawTable(false);
    setShowRechargeTable(false);
    setShowKycData(true);
    setShowMoreData(false);
    setShowLudoPlay(false);
    setShowRummyPlay(false);
    setShowSnakePlay(false);
  };

  const toggleMoreData = () => {
    setShowWithdrawTable(false);
    setShowRechargeTable(false);
    setShowMoreData(true);
    setShowKycData(false);
    setShowLudoPlay(false);
    setShowSnakePlay(false);
    setShowRummyPlay(false);
  };

  const toggleLudoPlayData = () => {
    setShowWithdrawTable(false);
    setShowRechargeTable(false);
    setShowMoreData(false);
    setShowKycData(false);
    setShowLudoPlay(true);
    setShowSnakePlay(false);
    setShowRummyPlay(false);
  };
  const toggleSnakePlayData = () => {
    setShowWithdrawTable(false);
    setShowRechargeTable(false);
    setShowMoreData(false);
    setShowKycData(false);
    setShowLudoPlay(false);
    setShowSnakePlay(true);
    setShowRummyPlay(false);
  };
  const toggleRummyPlayData = () => {
    setShowWithdrawTable(false);
    setShowRechargeTable(false);
    setShowMoreData(false);
    setShowKycData(false);
    setShowLudoPlay(false);
    setShowSnakePlay(false);
    setShowRummyPlay(true);
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
              <td className="td-stylegm">{user.counters.withdrawCounter || '_'}</td>
              <td className="td-stylegm">{user.totalGameOfReferedUser || '_'}</td>
              <td className="td-stylegm">{user.totalReferalEarning || '_'}</td>
            </tr>
          </tbody>
        </table>

        <div className="button-container">
          <button onClick={toggleWithdrawTable} className="w-btn">
            Withdrawal Data
          </button>
          <button onClick={toggleRechargeTable} className="r-btn">
            Recharge Data
          </button>

          <button onClick={toggleKycData} className="k-btn">
            KYC Data
          </button>

          <button onClick={toggleMoreData} className="m-btn">
            More Data
          </button>

          <button onClick={toggleLudoPlayData} className="l-btn">
            Ludo Game Play
          </button>

          <button onClick={toggleSnakePlayData} className="l-btn">
            Snake Game Play
          </button>
          <button onClick={toggleRummyPlayData} className="l-btn">
            Rummy Game Play
          </button>
        </div>

        {showWithdrawTable && <WithdrawMore phoneNumber={user.mobile_no} />}
        {showRechargeTable && <DepositeMore user={user} />}
        {showLudoPlay && <LudoSnakePlay userId={user._id} />}
        {showSnakePlay && <SnakePlayData userId={user._id} />}
        {showRummyPlay && <RummyPlayData userId={user._id} />}

        {showKycData && (
          <div className="kyc-table">
            <h3 className="ugm">KYC Details</h3>
            <table className="table-stylegm">
              <thead>
                <tr>
                  <th className="th-stylegm">User KYC Name</th>
                  <th className="th-stylegm">Bank Account</th>
                  <th className="th-stylegm">Pan Number</th>
                  <th className="th-stylegm">Pan Verified</th>
                  <th className="th-stylegm">Aadhar Number</th>
                  <th className="th-stylegm">Aadhar Verified</th>
                  <th className="th-stylegm">State</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-stylegm">{user.user_kyc_name || '-'}</td>
                  <td className="td-stylegm">{user.bankAccount || '-'}</td>
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
            <h3 className="ugm">More Details</h3>
            <table className="table-stylegm">
              <thead>
                <tr>
                  <th className="th-stylegm">User Name</th>
                  <th className="th-stylegm">Mobile No</th>
                  <th className="th-stylegm">CD IST</th>
                  <th className="th-stylegm">State</th>
                  <th className="th-stylegm">Details</th>
                  <th className="th-stylegm">Payment Counter</th>
                  <th className="th-stylegm">Yearly Payment Counter</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="td-stylegm">{user.un || '-'}</td>
                  <td className="td-stylegm">{user.mobile_no || '_'}</td>
                  <td className="td-stylegm">{user.cd_ist || '_'}</td>
                  <td className="td-stylegm">{user.state || '-'}</td>
                  <td className="td-stylegm">{user.det || '-'}</td>
                  <td className="td-stylegm">{user.counters.paymentcounter || '_'}</td>
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
