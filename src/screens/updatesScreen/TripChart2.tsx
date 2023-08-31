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

interface TripChartProps {
  trips: Trip[];
  type: "travel_time" | "dwell_time"; // Add a type prop
}

const TripChart2: React.FC<TripChartProps> = ({ trips, type }) => {
  const weekendData: { [key: string]: number[] } = {};
  const weekdayData: { [key: string]: number[] } = {};

  trips.forEach((trip) => {
    const hour = trip.hour_of_day;
    const time = parseFloat(trip[type]); // Use the type prop here

    if (trip.weekend) {
      weekendData[hour] = weekendData[hour]
        ? [...weekendData[hour], time]
        : [time];
    } else {
      weekdayData[hour] = weekdayData[hour]
        ? [...weekdayData[hour], time]
        : [time];
    }
  });

  const average = (arr: number[]) =>
    Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 100) / 100;

  const weekendLabels = Object.keys(weekendData).sort();
  const weekdayLabels = Object.keys(weekdayData).sort();

  const weekendAvgTimes = weekendLabels.map((hour) =>
    average(weekendData[hour])
  );
  const weekdayAvgTimes = weekdayLabels.map((hour) =>
    average(weekdayData[hour])
  );

  const allLabelsArray = Array.from(
    new Set([...weekendLabels, ...weekdayLabels])
  ).sort();

  const chartData = allLabelsArray.map((label, index) => ({
    label,
    weekend: weekendAvgTimes[index] || 0,
    weekday: weekdayAvgTimes[index] || 0,
  }));

  const SortedX_Axis = chartData.sort(
    (a, b) => parseFloat(a.label) - parseFloat(b.label)
  );

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
      <XAxis dataKey="label" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="weekend" stroke="#EC53B0" />
      <Line type="monotone" dataKey="weekday" stroke="#793FDF" />
    </LineChart>
  );
};

export default TripChart2;
