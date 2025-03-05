
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from './pages/LoginPage'; 
import AdminHkiData from './sidebarData/AdminHkiData'; 
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar'; 
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
function App() {
  const user = useSelector((state) => state.user); // Get the user data from Redux

  return (
    <Router>
      <React.Fragment>
        <Navbar />
        {user && <Sidebar />}
        <div className="content">
          <Routes>
            {/* If the user is not logged in, go to Login page */}
            {!user && <Route path="/login" element={<LoginPage />} />}
            
            {/* Default route: if the user is logged in, show AdminHkiData */}
            <Route
              path="/"
              element={user ? <AdminHkiData /> : <Navigate to="/login" />}
            />
            
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
      </React.Fragment>
    </Router>
  );
}

export default App;
