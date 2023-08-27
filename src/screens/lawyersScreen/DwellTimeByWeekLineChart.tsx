import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
  } from "recharts";

  interface DwellTimeByWeekLineChartProps {
    data: any;
    terminals: string[];
  }

  const DwellTimeByWeekLineChart: React.FC<DwellTimeByWeekLineChartProps> = ({ data, terminals }) => {
    return (
      <LineChart width={900} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="day_of_week"
          label={{ value: "Day of Week", position: "insideBottom" }}
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
            data={data.filter((item: { start_terminal: string; }) => item.start_terminal === terminal)}
            name={terminal}
            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color
            strokeWidth={2}
            dot={{ r: 5 }}
          />
        ))}
      </LineChart>
    );
  };

  export default DwellTimeByWeekLineChart;
