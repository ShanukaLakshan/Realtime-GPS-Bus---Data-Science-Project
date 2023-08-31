// import React from "react";
// import {
//   ScatterChart,
//   Scatter,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ReferenceLine,
// } from "recharts";
// import Trip from "./Trip";

// interface Props {
//   trips: Trip[];
// }

// const TripChart5: React.FC<Props> = ({ trips }) => {
//   const days = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];
//   const dataByDay: { [key: string]: number[] } = {};

//   trips.forEach((trip) => {
//     const day = trip.day_name;
//     const excessTime = parseFloat(trip.excess_travel_time);

//     if (!dataByDay[day]) {
//       dataByDay[day] = [];
//     }

//     dataByDay[day].push(excessTime);
//   });

//   const chartData = days.map((day) => {
//     const dayData = dataByDay[day] || [];
//     const sortedData = dayData.sort((a, b) => a - b);
//     const q1 = sortedData[Math.floor(sortedData.length / 4)];
//     const q3 = sortedData[Math.floor((3 * sortedData.length) / 4)];
//     const median = sortedData[Math.floor(sortedData.length / 2)];

//     return {
//       day,
//       q1,
//       q3,
//       median,
//       data: dayData,
//     };
//   });

//   // {day: 'Monday', q1: -12.95666666666667, q3: -5.5233333333333405, median: -9.140000000000017, data: Array(149)}
//   // {day: 'Tuesday', q1: -12.390000000000017, q3: -4.556666666666672, median: -8.60666666666667, data: Array(143)}
//   // {day: 'Wednesday', q1: -13.890000000000017, q3: -5.0233333333333405, median: -9.123333333333342, data: Array(132)}
//   // {day: 'Thursday', q1: -13.85666666666667, q3: -5.473333333333336, median: -9.573333333333345, data: Array(132)}
//   // {day: 'Friday', q1: -13.85666666666667, q3: -6.240000000000002, median: -9.873333333333342, data: Array(103)}
//   // {day: 'Saturday', q1: -13.10666666666667, q3: -6.190000000000005, median: -10.090000000000003, data: Array(131)}
//   // {day: 'Sunday', q1: -13.02333333333334, q3: -6.256666666666675, median: -9.42333333333334, data: Array(113)}

//   return (
//     <ScatterChart
//       width={800}
//       height={400}
//       margin={{
//         top: 20,
//         right: 20,
//         bottom: 20,
//         left: 20,
//       }}
//     >
//       <CartesianGrid />
//       <XAxis type="category" dataKey="day" name="Day of the Week" />
//       <YAxis type="number" name="Excess Travel Time (minutes)" />
//       <Tooltip cursor={{ strokeDasharray: "3 3" }} />
//       {chartData.map((entry, index) => (
//         <Scatter key={index} name={entry.day} data={[entry]} fill="#8884d8">
//           <ReferenceLine y={entry.q1} stroke="red" />
//           <ReferenceLine y={entry.median} stroke="green" />
//           <ReferenceLine y={entry.q3} stroke="blue" />
//         </Scatter>
//       ))}
//     </ScatterChart>
//   );
// };

// export default TripChart5;

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
  const dataByDay: { [key: string]: number[] } = {};

  trips.forEach((trip) => {
    const day = trip.day_name;
    const excessTime = parseFloat(trip.excess_travel_time);

    if (!dataByDay[day]) {
      dataByDay[day] = [];
    }

    dataByDay[day].push(excessTime);
  });

  const plotData = days.map((day) => ({
    type: "box" as const, // Explicitly stating the type
    name: day,
    y: dataByDay[day] || [],
  }));

  return (
    <Plot
      data={plotData}
      layout={{
        xaxis: {
          title: "Day of the Week",
        },
        yaxis: {
          title: "Excess Travel Time (minutes)",
        },
      }}
    />
  );
};

export default TripChart5;
