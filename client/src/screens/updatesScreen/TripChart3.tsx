import React, { useState } from "react";
import {
  AreaChart,
  Area,
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

const TripChart3: React.FC<Props> = ({ trips }) => {
  const [selectedDirection, setSelectedDirection] =
    useState<string>("Kandy-Digana");

  if (!trips || trips.length === 0) {
    // Handle the case where there is no data
    return <div>No data available</div>;
  }

  // Filter trips for the selected direction
  const filteredTrips = trips.filter(
    (trip) =>
      trip.start_terminal + "-" + trip.end_terminal === selectedDirection
  );

  const dataByHour: { [key: string]: number[] } = {};

  filteredTrips.forEach((trip) => {
    if (trip.hour_of_day === undefined || trip.travel_time === undefined) {
      return;
    }

    const hour = parseFloat(trip.hour_of_day); // Parse as a number
    const travelTime = parseFloat(trip.travel_time);

    if (!dataByHour[hour]) {
      dataByHour[hour] = [];
    }

    dataByHour[hour].push(travelTime);
  });

  const average = (arr: number[]) =>
    Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 100) / 100;

  const chartData = Object.keys(dataByHour)
    .sort((a, b) => parseFloat(a) - parseFloat(b))
    .map((hour) => ({
      hour: parseFloat(hour),
      [selectedDirection]: average(dataByHour[hour]),
    }));

  return (
    <>
      <AreaChart
        width={800}
        height={400}
        data={chartData}
        margin={{
          top: 25,
          right: 30,
          left: 20,
          bottom: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour">
          <Label position="insideBottom" offset={-20} />
        </XAxis>
        <YAxis>
          <Label
            value="Travel Time (minutes)"
            position="insideLeft"
            angle={-90}
            offset={10}
          />
        </YAxis>

        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey={selectedDirection}
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
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

export default TripChart3;
