import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.scss";
import { SidebarData } from "../Data/SidebarData";
// import { RiAdminFill } from "react-icons/ri";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(null); // Track which item is active
  const [activeSubItem, setActiveSubItem] = useState(null); // Track which subitem is active

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar open/close state
  };

  // Handle item click for main items
  const handleItemClick = (index) => {
    if (activeItem === index) {
      setActiveItem(null); // Collapse the menu if clicked again
    } else {
      setActiveItem(index); // Show the subitems for this menu
    }
  };

  // Handle subitem click for nested items like Ludo
  const handleSubItemClick = (subIndex) => {
    if (activeSubItem === subIndex) {
      setActiveSubItem(null); // Collapse the subitem if clicked again
    } else {
      setActiveSubItem(subIndex); // Expand the subitem
    }
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>


      <div className="sidebar-header">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <div className={`arrow ${isOpen ? "left" : "right"}`} />
        </button>
      </div>


      <nav className="nav-menu">
        <ul>
          {SidebarData.map((item, index) => (
            <li key={index} className={activeItem === index ? "active" : ""}>
              <div>
                <Link
                  to={item.path}
                  onClick={() =>
                    item.subItems ? handleItemClick(index) : null
                  } // Toggle subitems if item has them
                >
                  <div className="icon">{item.icon}</div>
                  {isOpen && <span className="title">{item.title}</span>}
                </Link>

                {/* Render subitems if the item is active */}
                {item.subItems && activeItem === index && isOpen && (
                  <ul className="sub-menu">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <Link
                          to={subItem.path}
                          onClick={() =>
                            subItem.subItems
                              ? handleSubItemClick(subIndex)
                              : null
                          } // Handle nested subitems
                        >
                          <div className="icon">{subItem.icon}</div>
                          {isOpen && (
                            <span className="title">{subItem.title}</span>
                          )}
                        </Link>

                        {/* Render nested subitems if any */}
                        {subItem.subItems &&
                          activeSubItem === subIndex &&
                          isOpen && (
                            <ul className="nested-sub-menu">
                              {subItem.subItems.map(
                                (nestedSubItem, nestedSubIndex) => (
                                  <li key={nestedSubIndex}>
                                    <Link to={nestedSubItem.path}>
                                      <div className="icon">
                                        {nestedSubItem.icon}
                                      </div>
                                      {isOpen && (
                                        <span className="title">
                                          {nestedSubItem.title}
                                        </span>
                                      )}
                                    </Link>
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}






// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "../styles/Sidebar.scss";
// import { SidebarData } from "../Data/SidebarData"; // Import SidebarData
// import { RiAdminFill } from "react-icons/ri"; // Import the Admin Icon

// export default function Sidebar() {
//   const [isOpen, setIsOpen] = useState(true);
//   const [activeItem, setActiveItem] = useState(null); // Track which item is active
//   const [activeSubItem, setActiveSubItem] = useState(null); // Track which subitem is active

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen); // Toggle the sidebar open/close state
//   };

//   // Find the Admin section and other items separately
//   const adminItem = SidebarData.find(item => item.title === "Admin | HKI"); // Find admin section by title or any other property
//   const otherItems = SidebarData.filter(item => item.title !== "Admin | HKI"); // Filter out the admin section

//   // Create the admin section outside the return statement
//   const adminSection = adminItem && (
//     <div className="admin-section">
//     <Link to={adminItem.path}>
//       <RiAdminFill className="icon" />
//       {isOpen && (
//         <span className="title">{adminItem.title}</span>
//       )}
//     </Link>
//   </div>
  
  
//   );

//   // Handle item click for main items
//   const handleItemClick = (index) => {
//     if (activeItem === index) {
//       setActiveItem(null); // Collapse the menu if clicked again
//     } else {
//       setActiveItem(index); // Show the subitems for this menu
//     }
//   };

//   // Handle subitem click for nested items like Ludo
//   const handleSubItemClick = (subIndex) => {
//     if (activeSubItem === subIndex) {
//       setActiveSubItem(null); // Collapse the subitem if clicked again
//     } else {
//       setActiveSubItem(subIndex); // Expand the subitem
//     }
//   };

//   return (
//     <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
//       <div className="sidebar-header">
//         <button className="toggle-btn" onClick={toggleSidebar}>
//           <div className={`arrow ${isOpen ? "left" : "right"}`} />
//         </button>
//       </div>

//       {/* Render the Admin section outside the return statement */}
//       {adminSection}

//       {/* Render the rest of the sidebar items */}
//       <nav className="nav-menu">
//         <ul>
//           {otherItems.map((item, index) => (
//             <li key={index} className={activeItem === index ? "active" : ""}>
//               <div>
//                 <Link
//                   to={item.path}
//                   onClick={() =>
//                     item.subItems ? handleItemClick(index) : null
//                   }
//                 >
//                   <div className="icon">{item.icon}</div>
//                   {isOpen && <span className="title">{item.title}</span>}
//                 </Link>

//                 {/* Render subitems if the item is active */}
//                 {item.subItems && activeItem === index && isOpen && (
//                   <ul className="sub-menu">
//                     {item.subItems.map((subItem, subIndex) => (
//                       <li key={subIndex}>
//                         <Link
//                           to={subItem.path}
//                           onClick={() =>
//                             subItem.subItems
//                               ? handleSubItemClick(subIndex)
//                               : null
//                           }
//                         >
//                           <div className="icon">{subItem.icon}</div>
//                           {isOpen && (
//                             <span className="title">{subItem.title}</span>
//                           )}
//                         </Link>

//                         {/* Render nested subitems if any */}
//                         {subItem.subItems &&
//                           activeSubItem === subIndex &&
//                           isOpen && (
//                             <ul className="nested-sub-menu">
//                               {subItem.subItems.map(
//                                 (nestedSubItem, nestedSubIndex) => (
//                                   <li key={nestedSubIndex}>
//                                     <Link to={nestedSubItem.path}>
//                                       <div className="icon">
//                                         {nestedSubItem.icon}
//                                       </div>
//                                       {isOpen && (
//                                         <span className="title">
//                                           {nestedSubItem.title}
//                                         </span>
//                                       )}
//                                     </Link>
//                                   </li>
//                                 )
//                               )}
//                             </ul>
//                           )}
//                       </li>
//                     ))}
//                   </ul>
//                 )}
//               </div>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </div>
//   );
// }





