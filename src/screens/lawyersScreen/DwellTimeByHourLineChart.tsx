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
    <LineChart width={900} height={400} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="hour_of_day" // Changed this from day_of_week to hour_of_day
        label={{ value: "Hour of Day", position: "insideBottom", offset: -30 }} // Updated the label
      />
      <YAxis
        label={{
          value: "Average Dwell Time",
          angle: -90,
          position: "insideLeft",
        }}
      />
      <Tooltip />
      <Legend />
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
          stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
          strokeWidth={2}
          dot={{ r: 5 }}
        />
      ))}
    </LineChart>
  );
};

export default DwellTimeByHourLineChart;
