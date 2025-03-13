
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "../styles/WithdrawMore.scss";

// const WithdrawMore = ({ phoneNumber }) => {
//   const [withdrawDetails, setWithdrawDetails] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(6);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:3001/withdraw/getWithdrawDetails?mobile_no=${phoneNumber}`
//         );
//         setWithdrawDetails(response.data.withdrawDetails);
//         setLoading(false);
//       } catch (err) {
//         setError(err.response ? err.response.data.message : "Error fetching data");
//         setLoading(false);
//       }
//     };

//     if (phoneNumber) {
//       fetchData();
//     }
//   }, [phoneNumber]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   if (withdrawDetails.length === 0) {
//     return <div>No withdrawal details found.</div>;
//   }

//   const handleNextPage = () => {
//     if (currentPage < Math.ceil(withdrawDetails.length / rowsPerPage)) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = withdrawDetails.slice(indexOfFirstRow, indexOfLastRow);

//   const totalPages = Math.ceil(withdrawDetails.length / rowsPerPage);

//   return (
//     <div className="neevss-e-w">
//       <h3 className="fii-e-w">Withdraw Details</h3>
//       <table className="table-style-k-e-w">
//         <thead>
//           <tr>
//             <th className="th-style-k-e-w">Payout ID</th>
//             <th className="th-style-k-e-w">Bank Account</th>
//             <th className="th-style-k-e-w">Amount</th>
//             <th className="th-style-k-e-w">Status</th>
//             <th className="th-style-k-e-w">Transfer Mode</th>
//             <th className="th-style-k-e-w">Transaction Ref No</th>
//             <th className="th-style-k-e-w">Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentRows.map((withdraw, index) => (
//             <tr key={index}>
//               <td className="td-style-k-e-w">{withdraw.payoutId || "_"}</td>
//               <td className="td-style-k-e-w">{withdraw.bankAccount || "_"}</td>
//               <td className="td-style-k-e-w">{withdraw.amount || "_"}</td>
//               <td className="td-style-k-e-w">{withdraw.status || "_"}</td>
//               <td className="td-style-k-e-w">{withdraw.transfermode || "_"}</td>
//               <td className="td-style-k-e-w">{withdraw.txnRefNo || "_"}</td>
//               <td className="td-style-k-e-w">{new Date(withdraw.createdAt).toLocaleString() || "_"}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination Controls */}
//       {withdrawDetails.length > rowsPerPage && (
//         <div className="pagination" style={{ textAlign: "center", marginTop: "10px" }}>
//           {/* Conditionally render Previous button */}
//           {currentPage > 1 && (
//             <button
//               onClick={handlePreviousPage}
//               className="pagination-button"
//               style={{
//                 padding: "8px 16px",
//                 fontSize: "12px",
//                 cursor: currentPage === 1 ? "not-allowed" : "pointer",
//                 marginLeft: "1201px",
//               }}
//             >
//               Previous
//             </button>
//           )}

//           {/* Page Number Info */}
//           <span style={{ marginLeft: "1200px", marginTop: "3px" }}>
//             Page {currentPage} of {totalPages}
//           </span>

//           {/* Conditionally render Next button */}
//           {currentPage < totalPages && (
//             <button
//               onClick={handleNextPage}
//               className="pagination-button"
//               style={{
//                 padding: "8px 16px",
//                 fontSize: "12px",
//                 cursor: currentPage === totalPages ? "not-allowed" : "pointer",
//                 marginLeft: "1215px",
//               }}
//             >
//               Next
//             </button>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default WithdrawMore;







import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/WithdrawMore.scss";

const WithdrawMore = ({ phoneNumber }) => {
  const [withdrawDetails, setWithdrawDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);  // Manage rows per page dynamically

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/withdraw/getWithdrawDetails?mobile_no=${phoneNumber}`
        );
        setWithdrawDetails(response.data.withdrawDetails);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : "Error fetching data");
        setLoading(false);
      }
    };

    if (phoneNumber) {
      fetchData();
    }
  }, [phoneNumber]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (withdrawDetails.length === 0) {
    return <div>No withdrawal details found.</div>;
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(withdrawDetails.length / rowsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = withdrawDetails.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(withdrawDetails.length / rowsPerPage);

  return (
    <div className="neevss-e-w">
      <h3 className="fii-e-w">Withdraw Details</h3>
      
      {/* Dropdown to change rows per page */}
      <div className="rows-per-page " style={{visibility:"hidden"}}>
        <label>Rows per page:</label>
        <select
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))} // Update rowsPerPage dynamically
        >
          <option value={6}>6</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
      </div>

      <table className="table-style-k-e-w">
        <thead>
          <tr>
            <th className="th-style-k-e-w">Payout ID</th>
            <th className="th-style-k-e-w">Bank Account</th>
            <th className="th-style-k-e-w">Amount</th>
            <th className="th-style-k-e-w">Status</th>
            <th className="th-style-k-e-w">Transfer Mode</th>
            <th className="th-style-k-e-w">Transaction Ref No</th>
            <th className="th-style-k-e-w">Created At</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((withdraw, index) => (
            <tr key={index}>
              <td className="td-style-k-e-w">{withdraw.payoutId || "_"}</td>
              <td className="td-style-k-e-w">{withdraw.bankAccount || "_"}</td>
              <td className="td-style-k-e-w">{withdraw.amount || "_"}</td>
              <td className="td-style-k-e-w">{withdraw.status || "_"}</td>
              <td className="td-style-k-e-w">{withdraw.transfermode || "_"}</td>
              <td className="td-style-k-e-w">{withdraw.txnRefNo || "_"}</td>
              <td className="td-style-k-e-w">{new Date(withdraw.createdAt).toLocaleString() || "_"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {withdrawDetails.length > rowsPerPage && (
        <div className="pagination" style={{ textAlign: "center", marginTop: "10px" }}>
          {/* Conditionally render Previous button */}
          {currentPage > 1 && (
            <button
              onClick={handlePreviousPage}
              className="pagination-button"
              style={{
                padding: "8px 16px",
                fontSize: "12px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                marginLeft: "1201px",
              }}
            >
              Previous
            </button>
          )}

          {/* Page Number Info */}
          <span style={{ marginLeft: "1200px", marginTop: "3px" }}>
            Page {currentPage} of {totalPages}
          </span>

          {/* Conditionally render Next button */}
          {currentPage < totalPages && (
            <button
              onClick={handleNextPage}
              className="pagination-button"
              style={{
                padding: "8px 16px",
                fontSize: "12px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                marginLeft: "1215px",
              }}
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WithdrawMore;
