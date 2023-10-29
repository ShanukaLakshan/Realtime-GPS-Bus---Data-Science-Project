import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

type RatioData = {
  day_of_week: number;
  ratio: number;
};

interface TravelToDwellRatioChartProps {
  data: RatioData[];
}

const TravelToDwellRatioChart: React.FC<TravelToDwellRatioChartProps> = ({
  data,
}) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const sortedData = data
    .sort((a, b) => a.day_of_week - b.day_of_week)
    .map((item) => ({
      ...item,
      day_name: daysOfWeek[item.day_of_week],
    }));

  return (
    <LineChart
      width={500}
      height={300}
      data={sortedData}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="day_name" angle={-45} textAnchor="end" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="ratio"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default TravelToDwellRatioChart;
