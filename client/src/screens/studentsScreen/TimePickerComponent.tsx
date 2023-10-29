import React, { useState } from "react";
import TimePicker from "react-time-picker";

function TimePickerComponent() {
  const [time, setTime] = useState("10:00");

  const handleTimeChange = (newTime: string | null) => {
    if (newTime) {
      setTime(newTime);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f5f5f5",
        width: "250px",
        margin: "50px auto",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        Select a Time:
      </h2>
      <TimePicker onChange={handleTimeChange} value={time} />
      <p
        style={{
          marginTop: "20px",
          color: "#555",
          fontWeight: "500",
        }}
      >
        Selected Time: {time}
      </p>
    </div>
  );
}

export default TimePickerComponent;
