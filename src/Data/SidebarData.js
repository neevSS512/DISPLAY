
// import React from 'react';
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
// import { FaUsers } from "react-icons/fa";
// import { MdTimer } from "react-icons/md";
// import { FaWrench } from "react-icons/fa";
// import "../styles/sidebarData.scss"
// import { RiAdminFill } from 'react-icons/ri';
// import { GiCardRandom } from 'react-icons/gi';
// import WalletIcon from '@mui/icons-material/Wallet';



// export const SidebarData = [
//    {
//    title: 'Admin | HKI',
//     icon: <RiAdminFill />, // Use the icon you want for the admin item
//     path: '/Admin', // Path that the admin link should navigate to
//     className: 'admin-item',  // Added class for styling Admin

//    },
//   {
//     title: 'Members',
//     icon: <PersonPinIcon  />,
//     path: '/UserData',
//   },
//   {
//     title: 'Recharge',
//     icon: <AddCardIcon />,
//     path: '/Recharge',
//   },
//   {
//     title: 'Bank Info',
//     icon: <AccountBalanceIcon  />,
//     path: '/BankData',
//   },
//   {
//     title: 'KYC Verification',
//     icon: <VerifiedUserIcon />,
//     path: '/KycVerification',
//   },
//   {
//     title: 'Withdraw',
//     icon: <AccountBalanceWalletIcon />,
//     path: '/Withdraw',
//   },
//   {
//     title: 'Wallet',
//     icon: <WalletIcon/>,
//     path: '/WalletData',
//   },
//   {
//     title: 'Transaction',
//     icon: <FaMoneyBillWave />,
//     path: '/Transaction',
//   },
//   {
//     title: 'Game Configuration',
//     icon: <FaGamepad  />,
//     path: '/gameConfigurations',
//   },
//   {
//     title: 'Settings',
//     icon: <SettingsIcon />,
//     path: '#Settings',
//     subItems: [
//       {
//         title: 'Ludo',
//         icon: <LiaFantasyFlightGames  />,
//         path: '#ludo',
//         subItems: [
//           {
//             title: 'Classic',
//             icon: <FaUsers />,
//             path: '/LudoPublicMoreData',
//           },
//           {
//             title: 'Rapid',
//             icon: <MdTimer  />,
//             path: '/ludocounter',
//           },
//           {
//             title: 'Score',
//             icon: <FaWrench  />,
//             path: '/ludoscore',
//           }
//         ],
//       },
//       {
//         title: 'Snake',
//         icon: <VscSnake  />,
//         path: '#Snake',
//         subItems: [
//           {
//             title: 'Classic',
//             icon: <FaUsers/>,
//             path: '/snakepublic',
//           },
//           {
//             title: 'Rapid',
//             icon: <MdTimer  />,
//             path: '/snakecounter',
//           },
//           {
//             title: 'Score',
//             icon: <FaWrench />,
//             path: '/snakescore',
//           }
//         ],
//       },

//       {
//         title: 'Rummy',
//         icon: <GiCardRandom   />,
//         path: '#Rummy',
//         subItems: [
//           {
//             title: 'Point',
//             icon: <IoLogoPlaystation />,
//             path: '/PlayingData',
//           },
//           {
//             title: 'Pool',
//             icon: <GiPoolDive />,
//             path: '/PoolData',
//           },
//           {
//             title: 'Deal',
//             icon: <FaIdeal />,
//             path: '/DealData',
//           }
//         ],
//       },
//     ],
//   },
//   {
//     title: 'Go To Website',
//     icon: <ExitToAppIcon />,
//     path: '#GoToWebsite',
//   },
// ];





import React from 'react';
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
import "../styles/sidebarData.scss"
import { RiAdminFill } from 'react-icons/ri';
import { GiCardRandom } from 'react-icons/gi';
import WalletIcon from '@mui/icons-material/Wallet';



export const SidebarData = [
   {
   title: 'Admin | HKI',
    icon: <RiAdminFill />, // Use the icon you want for the admin item
    path: '/Admin', // Path that the admin link should navigate to
    className: 'admin-item',  // Added class for styling Admin

   },
  {
    title: 'Members',
    icon: <PersonPinIcon  />,
    path: '/UserData',
  },
  {
    title: 'Recharge',
    icon: <AddCardIcon />,
    path: '/Recharge',
  },
  {
    title: 'Bank Info',
    icon: <AccountBalanceIcon  />,
    path: '/BankData',
  },
  {
    title: 'KYC Verification',
    icon: <VerifiedUserIcon />,
    path: '/KycVerification',
  },
  {
    title: 'Withdraw',
    icon: <AccountBalanceWalletIcon />,
    path: '/Withdraw',
  },
  {
    title: 'Wallet',
    icon: <WalletIcon/>,
    path: '/WalletData',
  },
  {
    title: 'Transaction',
    icon: <FaMoneyBillWave />,
    path: '/Transaction',
  },
  {
    title: 'Game Configuration',
    icon: <FaGamepad  />,
    path: '/gameConfigurations',
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    path: '#Settings',
    subItems: [
      {
        title: 'Ludo',
        icon: <LiaFantasyFlightGames  />,
        path: '#ludo',
        subItems: [
          {
            title: 'Classic',
            icon: <FaUsers />,
            path: '/LudoPublicMoreData',
          },
          {
            title: 'Rapid',
            icon: <MdTimer  />,
            path: '/ludocounter',
          },
          {
            title: 'Score',
            icon: <FaWrench  />,
            path: '/ludoscore',
          }
        ],
      },
      {
        title: 'Snake',
        icon: <VscSnake  />,
        path: '#Snake',
        subItems: [
          {
            title: 'Classic',
            icon: <FaUsers/>,
            path: '/snakepublic',
          },
          {
            title: 'Rapid',
            icon: <MdTimer  />,
            path: '/snakecounter',
          },
          {
            title: 'Score',
            icon: <FaWrench />,
            path: '/snakescore',
          }
        ],
      },

      {
        title: 'Rummy',
        icon: <GiCardRandom   />,
        path: '#Rummy',
        subItems: [
          {
            title: 'Point',
            icon: <IoLogoPlaystation />,
            path: '/PlayingData',
          },
          {
            title: 'Pool',
            icon: <GiPoolDive />,
            path: '/PoolData',
          },
          {
            title: 'Deal',
            icon: <FaIdeal />,
            path: '/DealData',
          }
        ],
      },
    ],
  },
  {
    title: 'Go To Website',
    icon: <ExitToAppIcon />,
    path: '#GoToWebsite',
  },
];