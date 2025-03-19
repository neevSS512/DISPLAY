
import React, { useEffect, useState } from "react";
import axios from "axios";
import UserData from "../moreInfo/UserData";
import "../styles/Gameuser.scss";

const WalletData = () => {
  const [data, setData] = useState([]); // Store all fetched data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data based on search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user
  const [showUserData, setShowUserData] = useState(false);

  const [mobileNoVisible, setMobileNoVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);
  const [trTypeVisible, setTrTypeVisible] = useState(false);
  const [selectedType, setSelectedType] = useState('');
  const [selectedTrType, setSelectedTrType] = useState(''); // Track transaction type (add or deduct)
  const [amount, setAmount] = useState(''); // Track amount input for the selected user

  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchGameuserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/gameuser/gameUsers");
        setData(response.data); // Store full data
        setFilteredData([]); // No data initially
      } catch (err) {
        setError("Error fetching gameuser data");
      } finally {
        setLoading(false);
      }
    };
    fetchGameuserData();
  }, []); // Fetch data once on initial load

  useEffect(() => {
    if (search) {
      // Filter based on the entered mobile number
      const filtered = data.filter(
        (item) =>
          item.mobile_no && item.mobile_no.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered); // Show only the user that matches
    } else {
      // Reset filtered data when there's no search term
      setFilteredData([]);
    }
  }, [search, data]); // Re-run the filter when search or data changes

  const handleCloseUserData = () => {
    setSelectedUser(null);
    setShowUserData(false);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleTrTypeChange = (event) => {
    setSelectedTrType(event.target.value);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.trim();
    setSearch(query); // Update the search query
  };

  // const handleUpdateAmount = async (userId) => {
  //   if (!selectedUser) {
  //     alert("No user selected. Please select a user first.");
  //     return;
  //   }

  //   if (!amount || isNaN(amount) || amount <= 0) {
  //     alert("Please enter a valid amount");
  //     return;
  //   }

  //   try {
  //     const updatedData = {};

  //     // Handling different transaction types
  //     if (selectedType === "deposit") {
  //       if (selectedTrType === "add") {
  //         updatedData.deposit = (parseFloat(selectedUser.deposit) + parseFloat(amount)).toString();
  //       } else if (selectedTrType === "deduct") {
  //         updatedData.deposit = (parseFloat(selectedUser.deposit) - parseFloat(amount)).toString();
  //       }
  //     } else if (selectedType === "winnings") {
  //       if (selectedTrType === "add") {
  //         updatedData.Winning = (parseFloat(selectedUser.Winning) + parseFloat(amount)).toString();
  //       } else if (selectedTrType === "deduct") {
  //         updatedData.Winning = (parseFloat(selectedUser.Winning) - parseFloat(amount)).toString();
  //       }
  //     } else if (selectedType === "bonus") {
  //       if (selectedTrType === "add") {
  //         updatedData.Bonus = (parseFloat(selectedUser.Bonus) + parseFloat(amount)).toString();
  //       } else if (selectedTrType === "deduct") {
  //         updatedData.Bonus = (parseFloat(selectedUser.Bonus) - parseFloat(amount)).toString();
  //       }
  //     }

  //     // Calculate the new totalcash value
  //     const newTotalCash = (
  //       parseFloat(updatedData.deposit || selectedUser.deposit) +
  //       parseFloat(updatedData.Winning || selectedUser.Winning) +
  //       parseFloat(updatedData.Bonus || selectedUser.Bonus)
  //     ).toString();

  //     // Include totalcash in the update data
  //     updatedData.totalcash = newTotalCash;

  //     // Send the updated data to the backend if selectedUser is valid
  //     const response = await axios.patch(
  //       `http://localhost:3001/gameuser/gameUsers/${selectedUser._id}`,
  //       updatedData
  //     );

  //     if (response.status === 200) {
  //       // Update frontend data after successful backend update
  //       setFilteredData((prevData) =>
  //         prevData.map((item) =>
  //           item._id === selectedUser._id ? { ...item, ...updatedData } : item
  //         )
  //       );

  //       setAmount(''); // Clear input after submission
  //     } else {
  //       console.error("Backend update failed");
  //       alert("Failed to update the amount");
  //     }
  //   } catch (err) {
  //     console.error("Error updating amount:", err);
  //     alert("Error updating amount");
  //   }
  // };








  
  // const handleUpdateAmount = async (userId) => {
  //   if (!selectedUser) {
  //     alert("No user selected. Please select a user first.");
  //     return;
  //   }
  
  //   if (!amount || isNaN(amount) || amount <= 0) {
  //     alert("Please enter a valid amount");
  //     return;
  //   }
  
  //   try {
  //     const updatedData = {};
  
  //     // Handling different transaction types
  //     if (selectedType === "deposit") {
  //       if (selectedTrType === "add") {
  //         updatedData.deposit = (parseFloat(selectedUser.deposit) + parseFloat(amount)).toString();
  //       } else if (selectedTrType === "deduct") {
  //         updatedData.deposit = (parseFloat(selectedUser.deposit) - parseFloat(amount)).toString();
  //       }
  //     } else if (selectedType === "winnings") {
  //       if (selectedTrType === "add") {
  //         updatedData.Winning = (parseFloat(selectedUser.Winning) + parseFloat(amount)).toString();
  //       } else if (selectedTrType === "deduct") {
  //         updatedData.Winning = (parseFloat(selectedUser.Winning) - parseFloat(amount)).toString();
  //       }
  //     } else if (selectedType === "bonus") {
  //       if (selectedTrType === "add") {
  //         updatedData.Bonus = (parseFloat(selectedUser.Bonus) + parseFloat(amount)).toString();
  //       } else if (selectedTrType === "deduct") {
  //         updatedData.Bonus = (parseFloat(selectedUser.Bonus) - parseFloat(amount)).toString();
  //       }
  //     }
  
  //     // Calculate the new totalcash value
  //     const newTotalCash = (
  //       parseFloat(updatedData.deposit || selectedUser.deposit) +
  //       parseFloat(updatedData.Winning || selectedUser.Winning) +
  //       parseFloat(updatedData.Bonus || selectedUser.Bonus)
  //     ).toString();
  
  //     // Include totalcash in the update data
  //     updatedData.totalcash = newTotalCash;
  
  //     // Send the updated data to the backend if selectedUser is valid
  //     const response = await axios.patch(
  //       `http://localhost:3001/gameuser/gameUsers/${selectedUser._id}`,
  //       updatedData
  //     );
  
  //     if (response.status === 200) {
  //       // Update frontend data after successful backend update
  //       setFilteredData((prevData) =>
  //         prevData.map((item) =>
  //           item._id === selectedUser._id ? { ...item, ...updatedData } : item
  //         )
  //       );
  
  //       // Now, create a new transaction entry
  //       const transactionData = {
  //         uid: selectedUser._id,
  //         tbid: selectedUser.tbid, 
  //         un: selectedUser.un,
  //         ue: selectedUser.ue, 
  //         mobile_no: selectedUser.mobile_no,
  //         amount: amount,
  //         deposit_amount: updatedData.deposit,
  //         winning_amount: updatedData.Winning,
  //         bonus_amount: updatedData.Bonus,
  //         previous_cash: selectedUser.totalcash,
  //         transection_purpose: selectedType,
  //         current_total_cash: newTotalCash,
  //         transaction_status: 'success', 
  //         gameState: 'active', 
  //         paid_tds: 0, 
  //         tds: 0, 
  //       };

  //       // const transactionData = {
  //       //   uid: selectedUser._id,
  //       //   tbid: selectedUser.tbid,
  //       //   un: selectedUser.un,
  //       //   ue: selectedUser.ue,
  //       //   mobile_no: selectedUser.mobile_no,
  //       //   _ir:selectedUser._ir,
  //       //   amount: amount, // The amount that is being added
  //       //   deposit_amount: selectedType === "deposit" ? amount : 0,  
  //       //   winning_amount: selectedType === "winnings" ? amount : 0,  
  //       //   bonus_amount: selectedType === "bonus" ? amount : 0, 
  //       //   previous_cash: selectedUser.totalcash,
  //       //   previous_deposit_cash:selectedUser.previous_deposit_cash,
  //       //   previous_winning_cash:selectedUser.previous_winning_cash,
  //       //   previous_bonus_cash:selectedUser.previous_bonus_cash,
  //       //   transection_purpose: selectedType,
  //       //   current_total_cash: newTotalCash, 
  //       //   transaction_status: 'success',
  //       //   gameState: 'active',
  //       //   paid_tds: 0, 
  //       //   tds: 0
  //       // };
        
  
  //       const transactionResponse = await axios.post(
  //         "http://localhost:3001/transaction/createTransaction",
  //         transactionData
  //       );
  
  //       if (transactionResponse.status === 201) {
  //         alert("Transaction created successfully");
  //       } else {
  //         alert("Failed to create the transaction entry");
  //       }
  
  //       setAmount(''); // Clear input after submission
  //     } else {
  //       console.error("Backend update failed");
  //       alert("Failed to update the amount");
  //     }
  //   } catch (err) {
  //     console.error("Error updating amount:", err);
  //     alert("Error updating amount");
  //   }
  // };






  const handleUpdateAmount = async (userId) => {
    if (!selectedUser) {
      alert("No user selected. Please select a user first.");
      return;
    }
  
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
  
    try {
      const updatedData = {};
  
      // Handling different transaction types
      if (selectedType === "deposit") {
        if (selectedTrType === "add") {
          updatedData.deposit = (parseFloat(selectedUser.deposit) + parseFloat(amount)).toString();
        } else if (selectedTrType === "deduct") {
          updatedData.deposit = (parseFloat(selectedUser.deposit) - parseFloat(amount)).toString();
        }
      } else if (selectedType === "winnings") {
        if (selectedTrType === "add") {
          updatedData.Winning = (parseFloat(selectedUser.Winning) + parseFloat(amount)).toString();
        } else if (selectedTrType === "deduct") {
          updatedData.Winning = (parseFloat(selectedUser.Winning) - parseFloat(amount)).toString();
        }
      } else if (selectedType === "bonus") {
        if (selectedTrType === "add") {
          updatedData.Bonus = (parseFloat(selectedUser.Bonus) + parseFloat(amount)).toString();
        } else if (selectedTrType === "deduct") {
          updatedData.Bonus = (parseFloat(selectedUser.Bonus) - parseFloat(amount)).toString();
        }
      }
  
      // Ensure the correct calculation for newTotalCash considering both add and deduct actions
      const newTotalCash = (
        parseFloat(updatedData.deposit || selectedUser.deposit) +
        parseFloat(updatedData.Winning || selectedUser.Winning) +
        parseFloat(updatedData.Bonus || selectedUser.Bonus)
      ).toString();
  
      // Include totalcash in the update data
      updatedData.totalcash = newTotalCash;
  
      // Create transaction data
      const transactionData = {
        uid: selectedUser._id,
        tbid: selectedUser.tbid,
        un: selectedUser.un,
        ue: selectedUser.ue,
        mobile_no: selectedUser.mobile_no,
        amount: amount,
        deposit_amount: updatedData.deposit,
        winning_amount: updatedData.Winning,
        bonus_amount: updatedData.Bonus,
        
        // Add the previous values (before transaction)
        previous_deposit_cash: selectedUser.deposit,
        previous_winning_cash: selectedUser.Winning,
        previous_bonus_cash: selectedUser.Bonus,
        previous_cash: selectedUser.totalcash,
        
        // Add updated values (after transaction)
        updated_deposit_cash: updatedData.deposit,   // Updated deposit amount
        updated_winning_cash: updatedData.Winning,   // Updated winning amount
        updated_bonus_cash: updatedData.Bonus,       // Updated bonus amount
        updated_previous_cash: newTotalCash,         // Updated total cash
  
        transection_purpose: selectedType,
        current_total_cash: newTotalCash,
        transaction_status: 'success',
        gameState: 'active',
        paid_tds: 0,
        tds: 0,
      };
  
      // Send the updated data to the backend if selectedUser is valid
      const response = await axios.patch(
        `http://localhost:3001/gameuser/gameUsers/${selectedUser._id}`,
        updatedData
      );
  
      if (response.status === 200) {
        // Update frontend data after successful backend update
        setFilteredData((prevData) =>
          prevData.map((item) =>
            item._id === selectedUser._id ? { ...item, ...updatedData } : item
          )
        );
  
        // Create transaction entry
        const transactionResponse = await axios.post(
          "http://localhost:3001/transaction/createTransaction",
          transactionData
        );
  
        if (transactionResponse.status === 201) {
          // alert("Transaction create successfully");
          alert("Data Updated successfully");
        } else {
          alert("Failed to create the transaction entry");
        }
  
        setAmount(''); // Clear input after submission
      } else {
        console.error("Backend update failed");
        alert("Failed to update the amount");
      }
    } catch (err) {
      console.error("Error updating amount:", err);
      alert("Error updating amount");
    }
  };
  

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (showUserData && selectedUser) {
    return <UserData user={selectedUser} handleClose={handleCloseUserData} />;
  }

  return (
    <div className="neev">
      <h3 className="ug">Wallet Data</h3>

      <div style={{ display: "flex", flexDirection: "row", marginTop: "20px", borderRadius: "6px", backgroundColor: "rgb(18, 37, 53)", marginLeft: "220px", border: "1px solid black", width: "1200px", height: "70px", padding: "10px" }}>
        {/* Button for MobileNo */}
        <button onClick={() => setMobileNoVisible(!mobileNoVisible)} style={{ height: "32px", textAlign: "center", marginTop: "12px" }}>
          MobileNo
        </button>
        {mobileNoVisible && (
          <div className="navbar_search" style={{ position: "relative", marginLeft: "100px" }}>
            <input
              className="input-std"
              type="text"
              placeholder="Search User by Mobile No..."
              value={search}
              onChange={handleSearchChange}
              style={{
                border: "2px solid #ccc",
                borderRadius: "20px",
                padding: "8px 12px",
              }}
            />
          </div>
        )}

        {/* Button for Type */}
        <button onClick={() => setTypeVisible(!typeVisible)} style={{ height: "32px", textAlign: "center", marginTop: "12px" }}>
          Type
        </button>
        {typeVisible && (
          <div>
            <select value={selectedType} onChange={handleTypeChange} style={{ marginTop: "12px" }}>
              <option value="">Select Type</option>
              <option value="deposit">Deposit</option>
              <option value="winnings">Winnings</option>
              <option value="bonus">Bonus</option>
            </select>
          </div>
        )}

        {/* Button for Tr-type */}
        <button onClick={() => setTrTypeVisible(!trTypeVisible)} style={{ height: "32px", textAlign: "center", marginTop: "12px" }}>
          Tr-type
        </button>
        {trTypeVisible && (
          <div>
            <select value={selectedTrType} onChange={handleTrTypeChange} style={{ marginTop: "12px" }}>
              <option value="">Select Tr-type</option>
              <option value="add">Add</option>
              <option value="deduct">Deduct</option>
            </select>
          </div>
        )}
      </div>

      {/* Amount Input and Update Button */}
      {selectedUser && selectedType && selectedTrType && (
        <div style={{ marginTop: "20px" }}>
          <input
            type="number"
            placeholder="Enter Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              border: "2px solid #ccc",
              borderRadius: "8px",
              padding: "8px 12px",
            }}
          />
          <button onClick={() => handleUpdateAmount(selectedUser._id)} style={{ marginLeft: "57px", marginTop: "8px" }}>
            Update
          </button>
        </div>
      )}

      {/* Search Results */}
      {search && filteredData.length === 0 && (
        <p className="no-results">No users found matching your search.</p>
      )}

      {search && filteredData.length > 0 && (
        <p className="search-result" style={{ marginLeft: "33px" }}>
          Found {filteredData.length} {filteredData.length === 1 ? "user" : "users"} matching your search.
        </p>
      )}

      {/* Only display the table if there is search data */}
      {filteredData.length > 0 && (
        <table className="table-styles ">
          <thead>
            <tr>
              <th className="table-header">Username</th>
              <th className="table-header">MobileNo</th>
              <th className="table-header">Deposit</th>
              <th className="table-header">Bonus</th>
              <th className="table-header">Winning</th>
              <th className="table-header">Total Cash</th>
              <th className="table-header"></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={item._id} className="table-row">
                <td className="stg-td">{item.un}</td>
                <td className="stg-td">{item.mobile_no}</td>
                <td className="stg-td">{item.deposit}</td>
                <td className="stg-td">{item.Bonus}</td>
                <td className="stg-td">{item.Winning}</td>
                <td className="stg-td">{item.totalcash}</td>
                <td className="table-data">
                  <button
                    className="btn-stg"
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "rgb(70, 70, 72)")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "rgb(16, 28, 52)")}
                    onClick={() => setSelectedUser(item)} // Select user
                  >
                    Select User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WalletData;