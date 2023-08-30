import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Trip from "./Trip";

interface GraphComponentProps {
  data: Trip[];
}

const AverageSITRByHourGraph: React.FC<GraphComponentProps> = ({ data }) => {
  const [filter, setFilter] = useState("All"); // 'All', 'Kandy-Digana', 'Digana-Kandy'

  // Calculate the average SITR for each hour of the day and direction
  const sumMap: { [key: string]: { sum: number; count: number } } = {};
  data.forEach((trip) => {
    const key = `${trip.hour_of_day}-${trip.Direction}`;
    const SITR = parseFloat(trip.SITR);
    if (!sumMap[key]) {
      sumMap[key] = { sum: 0, count: 0 };
    }
    sumMap[key].sum += SITR;
    sumMap[key].count += 1;
  });

  const avgData = Object.keys(sumMap).map((key) => {
    const [hour_of_day, Direction] = key.split("-");
    return {
      hour_of_day: parseFloat(hour_of_day),
      SITR: sumMap[key].sum / sumMap[key].count,
      Direction,
    };
  });

  let displayData = avgData;

  if (filter === "Kandy-Digana") {
    displayData = avgData.filter((d) => d.Direction === "Kandy");
  } else if (filter === "Digana-Kandy") {
    displayData = avgData.filter((d) => d.Direction === "Digana");
  }

  return (
    <div>
      <h3>Average SITR by Hour of the Day (Direction)</h3>
      <div>
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
          All
        </button>
        <button
          style={{
            backgroundColor: filter === "Kandy-Digana" ? "#8884d8" : "#FFFFFF",
            color: filter === "Kandy-Digana" ? "#FFFFFF" : "#000000",
            margin: "10px",
            padding: "5px",
            borderRadius: "5px",
          }}
          onClick={() => setFilter("Kandy-Digana")}
        >
          Kandy to Digana
        </button>
        <button
          style={{
            backgroundColor: filter === "Digana-Kandy" ? "#8884d8" : "#FFFFFF",
            color: filter === "Digana-Kandy" ? "#FFFFFF" : "#000000",
            margin: "10px",
            padding: "5px",
            borderRadius: "5px",
          }}
          onClick={() => setFilter("Digana-Kandy")}
        >
          Digana to Kandy
        </button>
      </div>
      <LineChart
        width={800}
        height={400}
        data={displayData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour_of_day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="SITR"
          stroke="#8884d8"
          name="Kandy to Digana"
        />
        <Line
          type="monotone"
          dataKey="SITR"
          stroke="#FF0000"
          name="Digana to Kandy"
        />
      </LineChart>
    </div>
  );
};

export default AverageSITRByHourGraph;
