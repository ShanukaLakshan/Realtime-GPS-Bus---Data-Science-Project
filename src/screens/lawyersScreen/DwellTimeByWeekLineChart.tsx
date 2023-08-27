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

const colorScheme = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"]; // Add more colors if needed

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
      {/* <YAxis
        label={{
          value: "Average Dwell Time",
          angle: -90,
          position: "insideLeft",
          offset: 10,
        }}
        tick={{ fontSize: 12 }}
      /> */}
      <YAxis
        label={{
          value: "Average Travel Time",
          angle: -90,
          position: "relative",
          transform: "translate(-50%, 0) rotate(-90deg)",
          textAnchor: "middle", // Corrected property name
          fontWeight: "bold",
          margin: 20,
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
          stroke={colorScheme[index % colorScheme.length]}
          strokeWidth={2}
          dot={{ r: 5 }}
        />
      ))}
    </LineChart>
  );
};

export default DwellTimeByWeekLineChart;
