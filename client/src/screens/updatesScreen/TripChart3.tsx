import React from "react";
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

interface Props {
  trips: Trip[];
}

const TripChart3: React.FC<Props> = ({ trips }) => {
  const dataByHour: { [key: string]: { [key: string]: number[] } } = {};

  trips.forEach((trip) => {
    const hour = trip.hour_of_day;
    const time = parseFloat(trip.travel_time);
    const direction = "Kandy-Digana";
 
    if (!dataByHour[hour]) {
      dataByHour[hour] = {};
    }

    if (!dataByHour[hour][direction]) {
      dataByHour[hour][direction] = [];
    }

    dataByHour[hour][direction].push(time);
  });

  const average = (arr: number[]) =>
    Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 100) / 100;

  const chartData = Object.keys(dataByHour)
    .sort((a, b) => parseFloat(a) - parseFloat(b))
    .map((hour) => {
      const directions = Object.keys(dataByHour[hour]);
      const entry: { [key: string]: number | string } = { hour };

      directions.forEach((direction) => {
        entry[direction] = average(dataByHour[hour][direction]);
      });

      return entry;
    });

  return (
    <LineChart
      width={800}
      height={400}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="hour" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Kandy-Digana" stroke="#1A5D1A" />
      <Line type="monotone" dataKey="Digana-Kandy" stroke="#FF52A2" />
    </LineChart>
  );
};

export default TripChart3;
