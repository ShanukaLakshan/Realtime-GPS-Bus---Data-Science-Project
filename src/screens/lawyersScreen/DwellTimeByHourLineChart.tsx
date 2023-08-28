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

interface DwellTimeByHourLineChartProps {
  data: any;
  terminals: string[];
}

const DwellTimeByHourLineChart: React.FC<DwellTimeByHourLineChartProps> = ({
  data,
  terminals,
}) => {
  return (
    <div className="chart-container">
      <LineChart
        width={700}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="hour_of_day"
          domain={["dataMin", "dataMax"]} // This line ensures that the X-axis starts at the minimum value present in the data and ends at the maximum value.
          label={{
            value: "Hour of Day",
            position: "insideBottom",
            offset: -10,
          }}
        />

        <YAxis
          label={{
            value: "Average Dwell Time",
            angle: -90,
            position: "insideLeft",
            dy: 80, // Adjust this as needed to position the label correctly
          }}
        />

        <Tooltip />
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
            stroke={index === 0 ? "#7091F5" : "#ED7B7B"} // Set the color based on the index
            strokeWidth={2}
            dot={{ r: 5 }}
          />
        ))}
      </LineChart>
    </div>
  );
};

export default DwellTimeByHourLineChart;
