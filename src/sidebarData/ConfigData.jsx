import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ConfigData.scss";
const ConfigData = () => {
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state
  const [editedRow, setEditedRow] = useState(null); // Track which row is being edited
  const [editedField, setEditedField] = useState(""); // Track which field is being edited
  const [editingBorder, setEditingBorder] = useState(null); // Track which input field has a border
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/gameconfigdata/gameconfigurations"
        );
        if (response.data) {
          // Ensure each item has a player field initialized as an empty object if not present
          const updatedData = response.data.map((item) => ({
            ...item,
            player: item.player || {}, // Default to an empty object if player is undefined or null
          }));
          setFilteredData(updatedData); // Set the fetched data
        }
      } catch (err) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data once

  // Handle row updates
  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `http://localhost:3001/gameconfigdata/gameconfigurations/${id}`,
        updatedData
      );
      if (response.status === 200) {
        setFilteredData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, ...updatedData } : item
          )
        );
      }
    } catch (err) {
      console.error("Error updating data:", err);
    }
  };

  const handleEdit = (index, field) => {
    setEditedRow(index);
    setEditedField(field);
  };

  const handleInputChange = (event, index, field, subField) => {
    const updatedItem = { ...filteredData[index] };

    // If the field is 'player' and we are updating a subfield (like ludo_two_player)
    if (field === "player" && subField) {
      updatedItem.player[subField] = event.target.checked;
    } else {
      updatedItem[field] = event.target.value.trim();
    }

    // Handle date conversion if it's a date field (e.g., sDate, eDate)
    if (field === "sDate" || field === "eDate") {
      updatedItem[field] = new Date(event.target.value).toISOString();
    }

    const newFilteredData = [...filteredData];
    newFilteredData[index] = updatedItem;
    setFilteredData(newFilteredData);
  };

  const isValidURL = (value) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/; // Basic URL regex
    return regex.test(value);
  };

  const handleSave = (index) => {
    const updatedItem = filteredData[index];
    handleUpdate(updatedItem._id, updatedItem);
    setEditedRow(null); // Exit edit mode
    setEditedField("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  const tableStyles = {
    width: "82vw",
    borderCollapse: "collapse",
    marginTop: "20px",
    marginBottom: "20px",
    marginLeft: "230px",
    tablelayout: "fixed" /* Ensure that the columns have a fixed width */,
  };

  const thStyles = {
    backgroundColor: "black",
    color: "white",
    padding: "10px",
    textAlign: "left",
    borderBottom: "2px solid #ddd",
  };

  const tdStyles = {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  };
  const handleBlur = () => {
    setEditedRow(null);
    setEditedField("");
    setEditingBorder(null);
  };

  const handleMouseLeave = () => {
    setEditedRow(null);
    setEditedField(""); // Reset the edited field to null
    setEditingBorder(null); // Reset the border
  };

  return (
    <div className="neev">
      <h3 className="ugc">Game Configuration</h3>

      <table style={tableStyles}>
        <thead>
          <tr>
            <th style={thStyles}>Action</th>
            <th style={thStyles}>Value</th>
            <th style={thStyles}>Start Date</th>
            <th style={thStyles}>End Date</th>
            <th style={thStyles}>Player</th>
            <th style={thStyles}>State</th>
            <th style={thStyles}>bonus_type</th>
            <th style={thStyles}>CountUp</th>
            <th style={thStyles}>finalCnt</th>
            <th style={thStyles}>cash</th>
            <th style={thStyles}></th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#f2f2f2" : "#ffffff",
                }}
              >
                <td style={tdStyles}>
                  {editedRow === index && editedField === "action" ? (
                    <input
                      type="string"
                      value={item.action || ""}
                      onChange={(e) => handleInputChange(e, index, "action")}
                      onBlur={handleBlur} // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave} // Trigger handleMouseLeave when the mouse leaves the input field
                      style={
                        editingBorder === index
                          ? { border: "2px solid blue" }
                          : {}
                      }
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "action")}>
                      {item.action || "_"}
                    </span>
                  )}
                </td>

                <td style={tdStyles} className="table-cell">
                  {editedRow === index && editedField === "value" ? (
                    <input
                      type="text"
                      value={item.value || ""} // Ensure value is bound to the state
                      onChange={(e) => handleInputChange(e, index, "value")} // Update filteredData when input changes
                      onBlur={handleBlur} // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave} // Trigger handleMouseLeave when the mouse leaves the input field
                      style={
                        editingBorder === index
                          ? { border: "2px solid blue" }
                          : {}
                      }
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "value")}>
                      {isValidURL(item.value) ? (
                        <a
                          href={item.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="table-link"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value || "_" // If no value, show 'N/A'
                      )}
                    </span>
                  )}
                </td>

                {/* <td style={tdStyles}>
  {editedRow === index && editedField === "sDate" ? (
    <input
      type="date"
      value={item.sDate ? item.sDate.substring(0, 10) : ''}  // Ensure correct date format (YYYY-MM-DD)
      onChange={(e) => handleInputChange(e, index, 'sDate')}
    />
  ) : (
    <span onClick={() => handleEdit(index, "sDate")}>{item.sDate ? item.sDate.substring(0, 10) : 'N/A'}</span>
  )}
</td> */}

                <td style={tdStyles}>
                  {editedRow === index && editedField === "sDate" ? (
                    <input
                      type="date"
                      value={item.sDate ? item.sDate.split("T")[0] : ""} // Extract the date portion only (YYYY-MM-DD)
                      onChange={(e) => handleInputChange(e, index, "sDate")}
                      onBlur={handleBlur} // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave} // Trigger handleMouseLeave when the mouse leaves the input field
                      style={
                        editingBorder === index
                          ? { border: "2px solid blue" }
                          : {}
                      }
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "sDate")}>
                      {item.sDate ? item.sDate.split("T")[0] : "_"}
                    </span>
                  )}
                </td>

                <td style={tdStyles}>
                  {editedRow === index && editedField === "eDate" ? (
                    <input
                      type="date"
                      value={item.eDate ? item.eDate.substring(0, 10) : ""} // Ensure correct date format (YYYY-MM-DD)
                      onChange={(e) => handleInputChange(e, index, "eDate")}
                      onBlur={handleBlur} // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave} // Trigger handleMouseLeave when the mouse leaves the input field
                      style={
                        editingBorder === index
                          ? { border: "2px solid blue" }
                          : {}
                      }
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "eDate")}>
                      {item.eDate ? item.eDate.substring(0, 10) : "_"}
                    </span>
                  )}
                </td>
                <td style={tdStyles}>
                  {editedRow === index && editedField === "player" ? (
                    <div>
                      {item.player && Object.keys(item.player).length > 0 ? (
                        Object.keys(item.player).map((key) => (
                          <div key={key}>
                            <label>
                              {key}:{" "}
                              <input
                                type="checkbox"
                                checked={item.player[key]}
                                onChange={(e) =>
                                  handleInputChange(e, index, "player", key)
                                }
                              />
                            </label>
                          </div>
                        ))
                      ) : (
                        <span>_</span> // Default value when player object is empty or not defined
                      )}
                    </div>
                  ) : (
                    <span onClick={() => handleEdit(index, "player")}>
                      {item.player && Object.keys(item.player).length > 0 ? (
                        Object.keys(item.player).map((key) => (
                          <div key={key}>
                            {key}: {item.player[key] ? "Enabled" : "Disabled"}
                          </div>
                        ))
                      ) : (
                        <span>_</span> // Default value when player object is empty or not defined
                      )}
                    </span>
                  )}
                </td>

                <td style={tdStyles} className="state-cell">
                  {editedRow === index && editedField === "state" ? (
                    <input
                      type="string"
                      value={item.state.join(", ") || ""} // Show the state array as a comma-separated string when editing
                      onChange={(e) => handleInputChange(e, index, "state")}
                      onBlur={handleBlur} // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave} // Trigger handleMouseLeave when the mouse leaves the input field
                      style={
                        editingBorder === index
                          ? { border: "2px solid blue" }
                          : {}
                      }
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "state")}>
                      {/* Display each item of the state array on a new line */}
                      {
                        item.state.length > 0
                          ? item.state.map((state, idx) => (
                              <div key={idx} className="state-item">
                                {state}
                              </div> // Each state value appears on its own line
                            ))
                          : "_" // If the state array is empty, show 'N/A'
                      }
                    </span>
                  )}
                </td>

                <td style={tdStyles}>
                  {editedRow === index && editedField === "bonus_type" ? (
                    <input
                      type="string"
                      value={item.bonus_type || ""}
                      onChange={(e) =>
                        handleInputChange(e, index, "bonus_type")
                      }
                      onBlur={handleBlur} // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave} // Trigger handleMouseLeave when the mouse leaves the input field
                      style={
                        editingBorder === index
                          ? { border: "2px solid blue" }
                          : {}
                      }
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "bonus_type")}>
                      {item.bonus_type || "_"}
                    </span>
                  )}
                </td>
                <td style={tdStyles}>
                  {editedRow === index &&
                  editedField === "increment_counter" ? (
                    <input
                      type="number"
                      value={item.increment_counter || ""}
                      onChange={(e) =>
                        handleInputChange(e, index, "increment_counter")
                      }
                      onBlur={handleBlur} // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave} // Trigger handleMouseLeave when the mouse leaves the input field
                      style={
                        editingBorder === index
                          ? { border: "2px solid blue" }
                          : {}
                      }
                    />
                  ) : (
                    <span
                      onClick={() => handleEdit(index, "increment_counter")}
                    >
                      {item.increment_counter || "_"}
                    </span>
                  )}
                </td>
                <td style={tdStyles}>
                  {editedRow === index && editedField === "final_counter" ? (
                    <input
                      type="number"
                      value={item.final_counter || ""}
                      onChange={(e) =>
                        handleInputChange(e, index, "final_counter")
                      }
                      onBlur={handleBlur} // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave} // Trigger handleMouseLeave when the mouse leaves the input field
                      style={
                        editingBorder === index
                          ? { border: "2px solid blue" }
                          : {}
                      }
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "final_counter")}>
                      {item.final_counter || "_"}
                    </span>
                  )}
                </td>
                <td style={tdStyles}>
                  {editedRow === index && editedField === "cash" ? (
                    <input
                      type="number"
                      value={item.cash || ""}
                      onChange={(e) => handleInputChange(e, index, "cash")}
                      onBlur={handleBlur} // Trigger handleBlur when the input loses focus
                      onMouseLeave={handleMouseLeave} // Trigger handleMouseLeave when the mouse leaves the input field
                      style={
                        editingBorder === index
                          ? { border: "2px solid blue" }
                          : {}
                      }
                    />
                  ) : (
                    <span onClick={() => handleEdit(index, "cash")}>
                      {item.cash || "_"}
                    </span>
                  )}
                </td>
                <td className="table-data ">
                  <button
                    style={{
                      padding: "3px 8px",
                      width: "5vw",
                      textAlign: "center",
                      borderBottom: "1px solid #ddd",
                      color: "white",
                      borderRadius: "5px",
                      margin: "12px",
                      marginLeft: "2px",
                      marginRight: "1px",
                      cursor: "pointer",
                      transition: "background-color 0.3s ease",
                    }}
                    onClick={() => handleSave(index)}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = "rgb(70, 70, 72)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = "rgb(16, 28, 52)")
                    }
                  >
                    update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="12" style={{ textAlign: "center", padding: "20px" }}>
                No Data Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConfigData;
