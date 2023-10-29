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

const AvgDwellTimeGraph: React.FC<GraphComponentProps> = ({ data }) => {
  const [filter, setFilter] = useState("All"); // 'All', 'Weekday', 'Weekend'

  // Calculate the average dwell time for each hour of the day and weekend/weekday
  const sumMap: { [key: string]: { sum: number; count: number } } = {};
  data.forEach((trip) => {
    const key = `${trip.hour_of_day}-${trip.weekend ? "Weekend" : "Weekday"}`;
    const dwellTime = parseFloat(trip.dwell_time);
    if (!sumMap[key]) {
      sumMap[key] = { sum: 0, count: 0 };
    }
    sumMap[key].sum += dwellTime;
    sumMap[key].count += 1;
  });

  const avgData = Object.keys(sumMap).map((key) => {
    const [hour_of_day, weekend] = key.split("-");
    return {
      hour_of_day: parseFloat(hour_of_day),
      // round to 2 decimal places
      dwell_time: Math.round((sumMap[key].sum / sumMap[key].count) * 100) / 100,
      weekend,
    };
  });

  let displayData = avgData;

  if (filter === "Weekday") {
    displayData = avgData.filter((d) => d.weekend === "Weekday");
  } else if (filter === "Weekend") {
    displayData = avgData.filter((d) => d.weekend === "Weekend");
  }

  return (
    <div>
      <h3>Dwell Time by Hour of the Day (Weekdays vs. Weekends) :</h3>
      <h3>Graph Type : {filter}</h3>
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
          Show Both
        </button>
        <button
          style={{
            backgroundColor: filter === "Weekday" ? "#8884d8" : "#FFFFFF",
            color: filter === "Weekday" ? "#FFFFFF" : "#000000",
            margin: "10px",
            padding: "5px",
            borderRadius: "5px",
          }}
          onClick={() => setFilter("Weekday")}
        >
          Weekday
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
          Weekend
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
          dataKey="dwell_time"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name="Weekday"
        />
        <Line
          type="monotone"
          dataKey="dwell_time"
          stroke="#FF0000"
          activeDot={{ r: 8 }}
          name="Weekend"
        />
      </LineChart>
    </div>
  );
};

export default AvgDwellTimeGraph;
