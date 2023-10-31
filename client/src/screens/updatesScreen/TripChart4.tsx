import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import Trip from "./Trip";

interface Props {
  trips: Trip[];
}

const TripChart4: React.FC<Props> = ({ trips }) => {
  const [selectedDirection, setSelectedDirection] =
    useState<string>("Kandy-Digana");

  if (!trips || trips.length === 0) {
    // Handle the case where there is no data
    return <div>No data available</div>;
  }

  const dataByHour: { [key: string]: { [key: string]: number[] } } = {};

  trips.forEach((trip) => {
    // Check for missing or null values in trip properties
    if (
      trip.hour_of_day === undefined ||
      trip.SITR === undefined ||
      trip.start_terminal === undefined ||
      trip.end_terminal === undefined
    ) {
      return;
    }

    const hour = parseFloat(trip.hour_of_day); // Parse as a number
    const sitr = parseFloat(trip.SITR);
    const direction = trip.start_terminal + "-" + trip.end_terminal; // Combine start and end terminals as direction

    if (!dataByHour[hour]) {
      dataByHour[hour] = {};
    }

    if (!dataByHour[hour][direction]) {
      dataByHour[hour][direction] = [];
    }

    dataByHour[hour][direction].push(sitr);
  });

  const average = (arr: number[]) =>
    Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 100) / 100;

  const chartData = Object.keys(dataByHour)
    .sort((a, b) => parseFloat(a) - parseFloat(b))
    .map((hour) => {
      const directions = Object.keys(dataByHour[hour]);
      const entry: { [key: string]: number | string } = {
        hour: parseFloat(hour),
      }; // Ensure hour is parsed as a number

      directions.forEach((direction) => {
        entry[direction] = average(dataByHour[hour][direction]);
      });

      return entry;
    });

  // Filter the chart data based on the selected direction
  const filteredChartData = chartData.map((data) => ({
    ...data,
    [selectedDirection]: data[selectedDirection],
  }));

  return (
    <>
      <LineChart
        width={800}
        height={400}
        data={filteredChartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour">
          <Label position="insideBottom" offset={-20} />
        </XAxis>
        <YAxis>
          <Label
            value="Average SITR"
            position="insideLeft"
            angle={-90}
            offset={10}
          />
        </YAxis>
        <Tooltip />
        <Legend />
        {Object.keys(filteredChartData[0])
          .filter((key) => key !== "hour") // Exclude 'hour' from rendering as a dataKey
          .map((key, index) => (
            <Line
              type="monotone"
              dataKey={key}
              key={index}
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Random color for each line
            />
          ))}
      </LineChart>
      <div className="select">
        <select
          onChange={(e) => {
            setSelectedDirection(e.target.value);
          }}
          value={selectedDirection}
        >
          <option value="Kandy-Digana">Kandy-Digana</option>
          <option value="Digana-Kandy">Digana-Kandy</option>
        </select>
      </div>
      <div>Selected Direction: {selectedDirection}</div>
    </>
  );
};

export default TripChart4;
