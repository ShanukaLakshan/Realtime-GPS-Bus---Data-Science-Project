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

interface DwellTimeByWeekLineChartProps {
  data: any;
  terminals: string[];
}

// Fixed color scheme
const colorScheme = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"]; // You can add or modify colors here as needed

const DwellTimeByWeekLineChart: React.FC<DwellTimeByWeekLineChartProps> = ({
  data,
  terminals,
}) => {
  return (
    <LineChart
      width={700}
      height={300}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
      <XAxis
        dataKey="day_of_week"
        label={{ value: "Day of Week", position: "insideBottom", offset: -10 }}
        tickFormatter={(dayOfWeek) => {
          const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          return days[dayOfWeek];
        }}
        tick={{ fontSize: 12 }}
      />

      <YAxis
        label={{
          value: "Average Travel Time",
          angle: -90,
          position: "insideLeft",
          dy: 80, // Adjust this as needed to position the label correctly
        }}
      />
      <Tooltip contentStyle={{ fontSize: 14 }} />
      <Legend
        verticalAlign="top"
        align="right"
        iconSize={14}
        wrapperStyle={{ paddingTop: 10 }}
      />
      {terminals.map((terminal, index) => (
        <Line
          key={index}
          type="monotone"
          dataKey="average_dwell_time"
          data={data.filter(
            (item: { start_terminal: string }) =>
              item.start_terminal === terminal
          )}
          name={terminal}
          // Use the color from the fixed color scheme
          stroke={colorScheme[index % colorScheme.length]}
          strokeWidth={2}
          dot={{ r: 5 }}
        />
      ))}
    </LineChart>
  );
};

export default DwellTimeByWeekLineChart;
