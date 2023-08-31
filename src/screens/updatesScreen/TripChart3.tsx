import React from "react";
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

interface Props {
  trips: Trip[];
}

const TripChart3: React.FC<Props> = ({ trips }) => {
  const filteredTrips = trips.filter(
    (trip) =>
      trip.Direction === "Kandy-Digana" || trip.Direction === "Digana-Kandy"
  );

  const data = filteredTrips.map((trip) => ({
    hour_of_day: parseFloat(trip.hour_of_day),
    travel_time: parseFloat(trip.travel_time),
    weekend: trip.weekend,
  }));

  return (
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="hour_of_day" />
      <YAxis dataKey="travel_time" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        data={data.filter((d) => !d.weekend)}
        dataKey="travel_time"
        stroke="#82ca9d" // Green for weekdays
        isAnimationActive={false}
      />
      <Line
        type="monotone"
        data={data.filter((d) => d.weekend)}
        dataKey="travel_time"
        stroke="#8884d8" // Blue for weekends
        activeDot={{ r: 8 }}
        isAnimationActive={false}
      />
      <Brush dataKey="hour_of_day" height={30} stroke="#8884d8" />
    </LineChart>
  );
};

export default TripChart3;
