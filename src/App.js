
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from "./pages/HomePage";
// // import RegisterPage from "./pages/RegisterPage";
// import LoginPage from "./pages/LoginPage";
// import Sidebar from './components/Sidebar'; // Assuming Sidebar component is here
// import WithdrawData from './sidebarData/WithdrawData'; // Import the WithdrawData component
// import GameUserData from "./sidebarData/GameUserData";
// import RechargeData from "./sidebarData/RechargeData";
// import BankInfoData from "./sidebarData/BankInfoData";
// import KycData from './sidebarData/KycData';


// function App() {
//   return (
//     <>
    
//     <Router>

//       <div className="app-container">
//         <Sidebar /> {/* Sidebar component */}
//         <HomePage></HomePage>
//         <div className="content">
//           <Routes>
//           {/* <Route path="/register" element={<RegisterPage />} /> */}
//           <Route path="/login" element={<LoginPage />} />
//             <Route path="/Withdraw" element={<WithdrawData />} />
//             <Route path="/Recharge" element={<RechargeData />} />
//             <Route path="/UserData" element={<GameUserData />} />
//             <Route path="/BankData" element={<BankInfoData />} />
//             <Route path="/KycVerification" element={<KycData />} />
//             {/* Add other routes here */}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//     </>
//   );
// }

// export default App;











import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Sidebar from './components/Sidebar';
import WithdrawData from './sidebarData/WithdrawData';
import GameUserData from './sidebarData/GameUserData';
import RechargeData from './sidebarData/RechargeData';
import BankInfoData from './sidebarData/BankInfoData';
import PlayingData from './sidebarData/PlayingData';
import PoolData from './sidebarData/PoolData'
import DealData from './sidebarData/DealData'
import KycData from './sidebarData/KycData';
import LudoPublic from './sidebarData/LudoPublic';
// import LudoPublicMoreData from './moreInfo/LudoPublicMoreData'
import LudoCounter from './sidebarData/LudoCounter'
import SnakeCounter from './sidebarData/SnakeCounter'
import LudoScore from './sidebarData/LudoScore'
import SnakeScore from './sidebarData/SnakeScore'
import SnakePublic from './sidebarData/SnakePublic';
import TransactionData from './sidebarData/TransactionData';
import ConfigData from './sidebarData/ConfigData'
import AdminData from './sidebarData/AdminData'


import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.user); // Get the user data from Redux

  return (
    <Router>
      <div className="app-container">
        {user && <Sidebar />} {/* Show Sidebar only if the user is logged in */}
        <HomePage />
        <div className="content">
          <Routes>
            {!user && <Route path="/login" element={<LoginPage />} />} {/* Only render LoginPage if not logged in */}
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/Withdraw" element={<WithdrawData />} />
            <Route path="/Recharge" element={<RechargeData />} />
            <Route path="/UserData" element={<GameUserData />} />
            <Route path="/BankData" element={<BankInfoData />} />
            <Route path="/KycVerification" element={<KycData />} />
            <Route path="/PoolData" element={<PoolData />} />
            <Route path="/DealData" element={<DealData />} />
            <Route path="/PlayingData" element={<PlayingData />} />
            {/* <Route path ="/ludopublic" element={<LudoPublicMoreData />} /> */}


            <Route path="/LudoPublicMoreData" element={<LudoPublic />} />
            <Route path='/admin' element ={<admindatadash />} />
            <Route path="/snakepublic" element={<SnakePublic />} />
            <Route path="/ludocounter" element={<LudoCounter />} />
            <Route path="/snakecounter" element={<SnakeCounter />} />
            <Route path="/ludoscore" element={<LudoScore />} />
            <Route path="/snakescore" element={<SnakeScore />} />
            <Route path="/Transaction" element={<TransactionData />} />
            <Route path="/gameConfigurations" element={<ConfigData/>} />
           <Route path="/Admin" element={<AdminData/>} />
        
            

          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;




// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// import Sidebar from './components/Sidebar';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import WithdrawData from './sidebarData/WithdrawData';
// import GameUserData from './sidebarData/GameUserData';
// import RechargeData from './sidebarData/RechargeData';
// import BankInfoData from './sidebarData/BankInfoData';
// import PlayingData from './sidebarData/PlayingData';
// import PoolData from './sidebarData/PoolData';
// import DealData from './sidebarData/DealData';
// import KycData from './sidebarData/KycData';
// import LudoPublic from './sidebarData/LudoPublic';
// import LudoCounter from './sidebarData/LudoCounter';
// import SnakeCounter from './sidebarData/SnakeCounter';
// import LudoScore from './sidebarData/LudoScore';
// import SnakeScore from './sidebarData/SnakeScore';
// import SnakePublic from './sidebarData/SnakePublic';
// import TransactionData from './sidebarData/TransactionData';
// import ConfigData from './sidebarData/ConfigData';
// import AdminData from './sidebarData/AdminData'

// function App() {
//   const user = useSelector((state) => state.user); // Get the user data from Redux

//   return (
//     <Router>
//       <div className="app-container">
//         {user && <Sidebar />} {/* Show Sidebar only if the user is logged in */}
//         <div className="content">
//           <Routes>
//             {!user && <Route path="/login" element={<LoginPage />} />}
//             <Route path="/" element={<HomePage />} />
//             <Route path="/Withdraw" element={<WithdrawData />} />
//             <Route path="/Recharge" element={<RechargeData />} />
//             <Route path="/UserData" element={<GameUserData />} />
//             <Route path="/BankData" element={<BankInfoData />} />
//             <Route path="/Admin" element={<AdminData/>} />
//             <Route path="/KycVerification" element={<KycData />} />
//             <Route path="/PoolData" element={<PoolData />} />
//             <Route path="/DealData" element={<DealData />} />
//             <Route path="/PlayingData" element={<PlayingData />} />
//             <Route path="/LudoPublicMoreData" element={<LudoPublic />} />
//             <Route path="/snakepublic" element={<SnakePublic />} />
//             <Route path="/ludocounter" element={<LudoCounter />} />
//             <Route path="/snakecounter" element={<SnakeCounter />} />
//             <Route path="/ludoscore" element={<LudoScore />} />
//             <Route path="/snakescore" element={<SnakeScore />} />
//             <Route path="/Transaction" element={<TransactionData />} />
//             <Route path="/gameConfigurations" element={<ConfigData />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
