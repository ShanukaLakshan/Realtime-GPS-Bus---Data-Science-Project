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

interface TravelTimeBarChartProps {
  data: any;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: { value?: any }[];
  label?: string;
}

const TravelTimeBarChart: React.FC<TravelTimeBarChartProps> = ({ data }) => {
  const filteredData = data.filter(
    (item: { average_travel_time: null }) => item.average_travel_time != null
  );

  const colorScale = (value: number) => {
    if (value <= 30) return "#34a853"; // Green
    if (value <= 60) return "#fbbc05"; // Yellow
    if (value <= 90) return "#ea4335"; // Red
    return "#8884d8"; // Default color
  };

  const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ background: '#f5f5f5', padding: '5px', border: '1px solid #ccc' }}>
          {/* <p className="label">{`Day: ${label}`}</p> */}
          <p className="intro">{`Time: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <BarChart
      width={900}
      height={400}
      data={filteredData}
      margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="day_of_week"
        label={{ value: "Day of Week", position: "insideBottom", offset: -10 }}
        tickFormatter={(dayOfWeek) => {
          const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          return days[dayOfWeek];
        }}
        style={{ fontSize: 12, fontWeight: "bold" }}
      />
      <YAxis
        label={{
          value: "Average Travel Time",
          angle: -90,
          position: "insideLeft",
        }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Bar name="Time" dataKey="average_travel_time">
        {filteredData.map((entry: { average_travel_time: number }) => (
          <Cell fill={colorScale(entry.average_travel_time)} />
        ))}
      </Bar>
    </BarChart>
  );
};

export default TravelTimeBarChart;
