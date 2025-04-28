
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Visible.scss";

const Visible = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVisibleData = async () => {
      try {
        const response = await axios.get('http://147.93.27.170:3001/details/getUsers');
        setData(response.data); 
      } catch (err) {
        setError('Error fetching withdraw data');
      } finally {
        setLoading(false);
      }
    };

    fetchVisibleData();
  }, []); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0"
  };
  
  const thStyles = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd"
  };
  

  
  const tdsStyles = {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    color:"rgb(103, 103, 249)"
  };
  const tdStyles = {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd"
  };
  const tdbStyles = {
    padding: "13px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
    color:"white",
    backgroundColor:"rgb(83, 220, 83)",
    borderRadius:"18px",
    margin:"12px"
  };
 
   
  


  return (
    <div className='neev'>
      <h3 className='ctr'>Members details</h3>
     

      <table style={tableStyles}>
      <thead>
        <tr>
          <th style={thStyles}>Id</th>
          <th style={thStyles}>Username</th>
          <th style={thStyles}>Password</th>
          <th style={thStyles}>MobileNo</th>
          <th style={thStyles}>State</th>
          <th style={thStyles}>Status</th>
          <th style={thStyles}>Updated</th>
          <th style={thStyles}>BlockRemarks</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff" }}>
            <td style={tdStyles}>{item.Id}</td>
            <td style={tdStyles}>{item.UserName}</td>
            <td style={tdStyles}>{item.Password}</td>
            <td style={tdsStyles}>{item.MobileNo}</td>
            <td style={tdStyles}>{item.State}</td>
            <td style={tdStyles}>{item.Status}</td>
            <td style={tdbStyles}>{item.Updated}</td>
            <td style={tdbStyles}>{item.BlockRemarks}</td>
          </tr>
        ))}
      </tbody>
    </table>
    
    </div>
  );
};

export default Visible;


