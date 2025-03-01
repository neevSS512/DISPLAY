
// import PersonPinIcon from '@mui/icons-material/PersonPin';
// import SettingsIcon from '@mui/icons-material/Settings';
// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
// import AddCardIcon from '@mui/icons-material/AddCard';
// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
// import { LiaFantasyFlightGames } from "react-icons/lia";
// import { VscSnake } from "react-icons/vsc";
// import { GiPoolDive } from "react-icons/gi";
// import { FaIdeal } from "react-icons/fa";
// import { FaMoneyBillWave } from "react-icons/fa";
// import { FaGamepad } from 'react-icons/fa';


// import { IoLogoPlaystation } from "react-icons/io";
// import { FaUsers } from "react-icons/fa"; // Icon for Public Score
// import { MdTimer } from "react-icons/md"; // Icon for Counter
// import { FaWrench } from "react-icons/fa"; // Icon for Fix

// export const SidebarData = [
  
//     {
//         title: 'Members',
//         icon: <PersonPinIcon style={{ marginRight: '9px' }} />,
//         path: '/UserData',
//     },
//     {
//         title: 'Recharge',
//         icon: <AddCardIcon style={{ marginRight: '9px' }} />,
//         path: '/Recharge',
//     },
//     {
//         title: 'Bank Info',
//         icon: <AccountBalanceIcon style={{ marginRight: '9px' }} />,
//         path: '/BankData',
//     },
//     {
//         title: 'KYC Verification',
//         icon: <VerifiedUserIcon style={{ marginRight: '9px' }} />,
//         path: '/KycVerification',
//     },
//     {
//         title: 'Withdraw',
//         icon: <AccountBalanceWalletIcon style={{ marginRight: '9px' }} />,
//         path: '/Withdraw',
//     },
//     {
//         title: 'Transaction',
//         icon: <FaMoneyBillWave style={{ marginRight: '9px' }} />,
//         path: '/Transaction',
//     },
//     {
//         title: 'gameConfiguration',
//         icon: <FaGamepad  style={{ marginRight: '9px' }} />,
//         path: '/gameConfigurations',
//     },
//     {
//         title: 'Settings',
//         icon: <SettingsIcon style={{ marginRight: '9px' }} />,
//         path: '#Settings',
//         subItems: [
//             {
//                 title: 'Ludo',
//                 icon: <LiaFantasyFlightGames style={{ marginRight: '9px' }} />,
//                 path: '#ludo',
//                 subItems: [
//                   {
//                     title: 'Classic',
//                     icon: <FaUsers style={{ marginRight: '9px' }} />,
//                     path: '/LudoPublicMoreData',
//                   },
//                   {
//                     title: 'Rapid',
//                     icon: <MdTimer style={{ marginRight: '9px' }} />,
//                     path: '/ludocounter',
//                   },
//                   {
//                     title: 'Score',
//                     icon: <FaWrench style={{ marginRight: '9px' }} />,
//                     path: '/ludoscore',
//                   }
//                 ],
//               },
//             {
//                 title: 'Snake',
//                 icon: <VscSnake style={{ marginRight: '9px' }} />,
//                 path: '#Snake',
//                 subItems: [
//                     {
//                       title: 'Classic',
//                       icon: <FaUsers style={{ marginRight: '9px' }} />,
//                       path: '/snakepublic',
//                     },
//                     {
//                       title: 'Rapid',
//                       icon: <MdTimer style={{ marginRight: '9px' }} />,
//                       path: '/snakecounter',
//                     },
//                     {
//                       title: 'Score',
//                       icon: <FaWrench style={{ marginRight: '9px' }} />,
//                       path: '/snakescore',
//                     }
//                   ],
//             },
//             {
//                 title: 'Point',
//                 icon: <IoLogoPlaystation style={{ marginRight: '9px' }} />,
//                 path: '/PlayingData',
//             },
//             {
//                 title: 'Pool',
//                 icon: <GiPoolDive style={{ marginRight: '9px' }} />,
//                 path: '/PoolData',
//             },
//             {
//                 title: 'Deal',
//                 icon: <FaIdeal style={{ marginRight: '9px' }} />,
//                 path: '/DealData',
//             }
//         ],
//     },
//     {
//         title: 'Go To Website',
//         icon: <ExitToAppIcon style={{ marginRight: '9px' }} />,
//         path: '#GoToWebsite',
//     },
// ];
import React, { useState } from 'react';
import { RiAdminFill } from 'react-icons/ri'; // Import RiAdminFill icon
import PersonPinIcon from '@mui/icons-material/PersonPin';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddCardIcon from '@mui/icons-material/AddCard';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { LiaFantasyFlightGames } from "react-icons/lia";
import { VscSnake } from "react-icons/vsc";
import { GiPoolDive } from "react-icons/gi";
import { FaIdeal } from "react-icons/fa";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaGamepad } from 'react-icons/fa';
import { IoLogoPlaystation } from "react-icons/io";
import { FaUsers } from "react-icons/fa";
import { MdTimer } from "react-icons/md";
import { FaWrench } from "react-icons/fa";
import "../styles/sidebarData.scss";
// Sidebar Component
export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the sidebar open/close state
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="sidebar">
      {SidebarData.map((item, index) => (
        <div key={index} className={`sidebar-item ${isOpen ? "open" : "closed"}`}>
          <a href={item.path}>
            {item.icon(isOpen, toggleSidebar)} {/* Pass isOpen and toggleSidebar to each icon */}
          </a>
        </div>
      ))}
    </div>
  );
};

// SidebarData with Admin section and other sidebar items
export const SidebarData = [
  {
    title: 'Admin',
    icon: (isOpen, toggleSidebar) => (
      <div className={`admin ${isOpen ? "open" : "closed"}`} onClick={toggleSidebar}>
        <RiAdminFill className="icon" aria-label="Admin Section" />
        <span className="title">Admin</span>
        {isOpen && <span className="separator">|</span>}
        <span className="hki">HKI</span>
      </div>
    ),
    path: '/Admin',
  },
  {
    title: 'Members',
    icon: () => <PersonPinIcon style={{ marginRight: '9px' }} />,
    path: '/UserData',
  },
  {
    title: 'Recharge',
    icon: () => <AddCardIcon style={{ marginRight: '9px' }} />,
    path: '/Recharge',
  },
  {
    title: 'Bank Info',
    icon: () => <AccountBalanceIcon style={{ marginRight: '9px' }} />,
    path: '/BankData',
  },
  {
    title: 'KYC Verification',
    icon: () => <VerifiedUserIcon style={{ marginRight: '9px' }} />,
    path: '/KycVerification',
  },
  {
    title: 'Withdraw',
    icon: () => <AccountBalanceWalletIcon style={{ marginRight: '9px' }} />,
    path: '/Withdraw',
  },
  {
    title: 'Transaction',
    icon: () => <FaMoneyBillWave style={{ marginRight: '9px' }} />,
    path: '/Transaction',
  },
  {
    title: 'gameConfiguration',
    icon: () => <FaGamepad style={{ marginRight: '9px' }} />,
    path: '/gameConfigurations',
  },
  {
    title: 'Settings',
    icon: () => <SettingsIcon style={{ marginRight: '9px' }} />,
    path: '#Settings',
    subItems: [
      {
        title: 'Ludo',
        icon: () => <LiaFantasyFlightGames style={{ marginRight: '9px' }} />,
        path: '#ludo',
        subItems: [
          {
            title: 'Classic',
            icon: () => <FaUsers style={{ marginRight: '9px' }} />,
            path: '/LudoPublicMoreData',
          },
          {
            title: 'Rapid',
            icon: () => <MdTimer style={{ marginRight: '9px' }} />,
            path: '/ludocounter',
          },
          {
            title: 'Score',
            icon: () => <FaWrench style={{ marginRight: '9px' }} />,
            path: '/ludoscore',
          }
        ],
      },
      {
        title: 'Snake',
        icon: () => <VscSnake style={{ marginRight: '9px' }} />,
        path: '#Snake',
        subItems: [
          {
            title: 'Classic',
            icon: () => <FaUsers style={{ marginRight: '9px' }} />,
            path: '/snakepublic',
          },
          {
            title: 'Rapid',
            icon: () => <MdTimer style={{ marginRight: '9px' }} />,
            path: '/snakecounter',
          },
          {
            title: 'Score',
            icon: () => <FaWrench style={{ marginRight: '9px' }} />,
            path: '/snakescore',
          }
        ],
      },
      {
        title: 'Point',
        icon: () => <IoLogoPlaystation style={{ marginRight: '9px' }} />,
        path: '/PlayingData',
      },
      {
        title: 'Pool',
        icon: () => <GiPoolDive style={{ marginRight: '9px' }} />,
        path: '/PoolData',
      },
      {
        title: 'Deal',
        icon: () => <FaIdeal style={{ marginRight: '9px' }} />,
        path: '/DealData',
      }
    ],
  },
  {
    title: 'Go To Website',
    icon: () => <ExitToAppIcon style={{ marginRight: '9px' }} />,
    path: '#GoToWebsite',
  },
];
