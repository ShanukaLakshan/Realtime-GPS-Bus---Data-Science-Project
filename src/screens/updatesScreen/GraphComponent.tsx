import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
} from "recharts";
import Trip from "./Trip";

interface GraphComponentProps {
  data: Trip[];
}

const GraphComponent: React.FC<GraphComponentProps> = ({ data }) => {
  const [filter, setFilter] = useState("All"); // 'All', 'Week', 'Weekend'

  // Filter and prepare the data for the graph
  const filteredData = data.map((trip) => ({
    hour_of_day: parseFloat(trip.hour_of_day),
    travel_time: parseFloat(trip.travel_time),
    weekend: trip.weekend ? "Weekend" : "Weekday",
  }));

  let displayData = filteredData;

  if (filter === "Week") {
    displayData = filteredData.filter((d) => d.weekend === "Weekday");
  } else if (filter === "Weekend") {
    displayData = filteredData.filter((d) => d.weekend === "Weekend");
  }

  return (
    <div>
      <div>
        <h3>Travel Time by Hour of the Day (Weekdays vs. Weekends)</h3>
        <h3>Graph Type : {filter}</h3>
        <button
          style={{
            backgroundColor: filter === "All" ? "#8884d8" : "#FFFFFF",
            color: filter === "All" ? "#FFFFFF" : "#000000",
            margin: "10px",
            padding: "5px",
            borderRadius: "5px",
          }}
          onClick={() => setFilter("All")}
        >
          Show Both
        </button>
        <button
          style={{
            backgroundColor: filter === "Week" ? "#8884d8" : "#FFFFFF",
            color: filter === "Week" ? "#FFFFFF" : "#000000",
            margin: "10px",
            padding: "5px",
            borderRadius: "5px",
          }}
          onClick={() => setFilter("Week")}
        >
          Show Week
        </button>
        <button
          style={{
            backgroundColor: filter === "Weekend" ? "#8884d8" : "#FFFFFF",
            color: filter === "Weekend" ? "#FFFFFF" : "#000000",
            margin: "10px",
            padding: "5px",
            borderRadius: "5px",
          }}
          onClick={() => setFilter("Weekend")}
        >
          Show Weekend
        </button>
      </div>
      <LineChart
        width={800}
        height={400}
        data={displayData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour_of_day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="travel_time"
          stroke={filter === "Weekend" ? "#FF0000" : "#8884d8"}
          activeDot={{ r: 8 }}
        />
        <Brush dataKey="hour_of_day" height={30} stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default GraphComponent;
