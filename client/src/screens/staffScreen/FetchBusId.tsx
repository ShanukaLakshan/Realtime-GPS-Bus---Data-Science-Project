import React, { useState, useEffect } from "react";
import axios from "axios";

const FetchBusId = () => {
  const [busIds, setBusIds] = useState([]);
  const [selectedBusId, setSelectedBusId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-all-device-ids")
      .then((response) => {
        setBusIds(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bus IDs:", error);
      });
  }, []);

  const handleBusIdChange = (event) => {
    setSelectedBusId(event.target.value);
  };

  return (
    <div>
      <h1>Select Bus ID</h1>
      <label htmlFor="busIdSelect">Choose a Bus ID:</label>
      <select
        id="busIdSelect"
        value={selectedBusId}
        onChange={handleBusIdChange}
      >
        <option value="">Select a Bus ID</option>
        {busIds.map((busId) => (
          <option key={busId} value={busId}>
            {busId}
          </option>
        ))}
      </select>
      <p>Selected Bus ID: {selectedBusId}</p>
    </div>
  );
};

export default FetchBusId;
