
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import LoginPage from './pages/LoginPage';
// import Sidebar from './components/Sidebar';
// import WithdrawData from './sidebarData/WithdrawData';
// import GameUserData from './sidebarData/GameUserData';
// import RechargeData from './sidebarData/RechargeData';
// import BankInfoData from './sidebarData/BankInfoData';
// import PlayingData from './sidebarData/PlayingData';
// import PoolData from './sidebarData/PoolData'
// import DealData from './sidebarData/DealData'
// import KycData from './sidebarData/KycData';
// import LudoPublic from './sidebarData/LudoPublic';
// import LudoCounter from './sidebarData/LudoCounter'
// import SnakeCounter from './sidebarData/SnakeCounter'
// import LudoScore from './sidebarData/LudoScore'
// import SnakeScore from './sidebarData/SnakeScore'
// import SnakePublic from './sidebarData/SnakePublic';
// import TransactionData from './sidebarData/TransactionData';
// import ConfigData from './sidebarData/ConfigData'
// import AdminHkiData from './sidebarData/AdminHkiData';


// import { useSelector } from 'react-redux';

// function App() {
//   const user = useSelector((state) => state.user); // Get the user data from Redux

//   return (
//     <Router>
//       <div className="app-container">
//         {user && <Sidebar />} {/* Show Sidebar only if the user is logged in */}
//         <HomePage />
//         <div className="content">
//           <Routes>
//             {!user && <Route path="/login" element={<LoginPage />} />} {/* Only render LoginPage if not logged in */}
//             {/* <Route path="/" element={<HomePage />} /> */}
//             <Route path="/Withdraw" element={<WithdrawData />} />
//             <Route path="/Recharge" element={<RechargeData />} />
//             <Route path="/UserData" element={<GameUserData />} />
//             <Route path="/BankData" element={<BankInfoData />} />
//             <Route path="/KycVerification" element={<KycData />} />
//             <Route path="/PoolData" element={<PoolData />} />
//             <Route path="/DealData" element={<DealData />} />
//             <Route path="/PlayingData" element={<PlayingData />} />


//             <Route path="/LudoPublicMoreData" element={<LudoPublic />} />
//             <Route path='/admin' element ={<admindatadash />} />
//             <Route path="/snakepublic" element={<SnakePublic />} />
//             <Route path="/ludocounter" element={<LudoCounter />} />
//             <Route path="/snakecounter" element={<SnakeCounter />} />
//             <Route path="/ludoscore" element={<LudoScore />} />
//             <Route path="/snakescore" element={<SnakeScore />} />
//             <Route path="/Transaction" element={<TransactionData />} />
//             <Route path="/gameConfigurations" element={<ConfigData/>} />
//             <Route path="/Admin" element={<AdminHkiData />} />
     
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;




import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar'; // Assuming you have a Navbar component
import WithdrawData from './sidebarData/WithdrawData';
import GameUserData from './sidebarData/GameUserData';
import RechargeData from './sidebarData/RechargeData';
import BankInfoData from './sidebarData/BankInfoData';
import PlayingData from './sidebarData/PlayingData';
import PoolData from './sidebarData/PoolData';
import DealData from './sidebarData/DealData';
import KycData from './sidebarData/KycData';
import LudoPublic from './sidebarData/LudoPublic';
import LudoCounter from './sidebarData/LudoCounter';
import SnakeCounter from './sidebarData/SnakeCounter';
import LudoScore from './sidebarData/LudoScore';
import SnakeScore from './sidebarData/SnakeScore';
import SnakePublic from './sidebarData/SnakePublic';
import TransactionData from './sidebarData/TransactionData';
import ConfigData from './sidebarData/ConfigData';
import AdminHkiData from './sidebarData/AdminHkiData';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.user); // Get the user data from Redux

  return (
    <Router>
      <div className="app-container">
        {/* Always show Navbar */}
        <Navbar />

        {/* Sidebar only visible if the user is logged in */}
        {user && <Sidebar />}

        <div className="content">
          <Routes>
            Route for LoginPage if user is not logged in
            {!user && <Route path="/login" element={<LoginPage />} />}
            
            {/* Default route */}
            {/* <Route path="/" element={<HomePage />} /> */}
            
            {/* Sidebar data routes */}
            <Route path="/Withdraw" element={<WithdrawData />} />
            <Route path="/Recharge" element={<RechargeData />} />
            <Route path="/UserData" element={<GameUserData />} />
            <Route path="/BankData" element={<BankInfoData />} />
            <Route path="/KycVerification" element={<KycData />} />
            <Route path="/PoolData" element={<PoolData />} />
            <Route path="/DealData" element={<DealData />} />
            <Route path="/PlayingData" element={<PlayingData />} />
            
            {/* Ludo and Snake data routes */}
            <Route path="/LudoPublicMoreData" element={<LudoPublic />} />
            <Route path="/snakepublic" element={<SnakePublic />} />
            <Route path="/ludocounter" element={<LudoCounter />} />
            <Route path="/snakecounter" element={<SnakeCounter />} />
            <Route path="/ludoscore" element={<LudoScore />} />
            <Route path="/snakescore" element={<SnakeScore />} />
            
            {/* Transaction and Config routes */}
            <Route path="/Transaction" element={<TransactionData />} />
            <Route path="/gameConfigurations" element={<ConfigData />} />
            
            {/* Admin route */}
            <Route path="/Admin" element={<AdminHkiData />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
