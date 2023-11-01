import React from "react";
import Plot from "react-plotly.js";
import Trip from "./Trip";

interface Props {
  trips: Trip[];
}

const TripChart5: React.FC<Props> = ({ trips }) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Extract the day of the week and excess travel time from the data
  const data = trips.map((trip) => ({
    day_of_week: Number(trip.day_of_week), // Explicitly convert to number
    excess_travel_time: parseFloat(trip.excess_travel_time), // Assuming 45 minutes is the expected travel time
  }));

  // Create an array to store the sum and count of non-zero excess travel times for each day of the week
  const sumExcessTravelTime = new Array(7).fill(0);
  const countExcessTravelTime = new Array(7).fill(0);

  // Calculate the sum and count of non-zero excess travel times for each day of the week
  data.forEach((trip) => {
    if (trip.excess_travel_time !== 0) {
      sumExcessTravelTime[trip.day_of_week] += trip.excess_travel_time;
      countExcessTravelTime[trip.day_of_week]++;
    }
  });

  // Calculate the average for each day of the week
  const averageExcessTravelTime = sumExcessTravelTime.map(
    (sum, index) => (countExcessTravelTime[index] !== 0 ? sum / countExcessTravelTime[index] : 0)
  );

  // Create a color array for the bars
  const barColors = [
    "rgb(31, 119, 180)",
    "rgb(255, 127, 14)",
    "rgb(44, 160, 44)",
    "rgb(214, 39, 40)",
    "rgb(148, 103, 189)",
    "rgb(140, 86, 75)",
    "rgb(227, 119, 194)",
  ];

  // Create the data array for the Plotly graph with specified colors
  const graphData: Plotly.Data[] = [
    {
      x: days,
      y: averageExcessTravelTime,
      type: "bar",
      marker: {
        color: barColors, // Specify the color array for each bar
      },
    },
  ];

  // Create the layout for the graph
  const graphLayout: Partial<Plotly.Layout> = {
    title: "Day of the Week vs. Average Excess Travel Time",
    xaxis: { title: "Day of the Week" },
    yaxis: { title: "Average Excess Travel Time (minutes)" },
  };

  return (
    <div>
      <Plot data={graphData} layout={graphLayout} />
    </div>
  );
};

export default TripChart5;
