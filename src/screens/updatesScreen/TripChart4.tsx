import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";
import Trip from "./Trip";

interface Props {
  trips: Trip[];
}

const TripChart4: React.FC<Props> = ({ trips }) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const data = days.map((day) => {
    const dayData = trips
      .filter((trip) => trip.day_name === day)
      .map((trip) => parseFloat(trip.excess_travel_time));

    const sortedData = dayData.sort((a, b) => a - b);
    const q1 = sortedData[Math.floor(sortedData.length / 4)];
    const q3 = sortedData[Math.floor((3 * sortedData.length) / 4)];
    const median = sortedData[Math.floor(sortedData.length / 2)];

    return {
      name: day,
      q1,
      q3,
      median,
    };
  });

  return (
    <BarChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="q1" fill="#8884d8" />
      <Bar dataKey="q3" fill="#82ca9d" />
      <Bar dataKey="median" fill="#ffc658">
        {data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.median > 0 ? "#ff7300" : "#413ea0"}
          />
        ))}
      </Bar>
    </BarChart>
  );
};

export default TripChart4;
