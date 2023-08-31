// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Cell,
// } from "recharts";
// import Trip from "./Trip";

// interface Props {
//   trips: Trip[];
// }

// const TripChart4: React.FC<Props> = ({ trips }) => {
//   const days = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const data = days.map((day) => {
//     const dayData = trips
//       .filter((trip) => trip.day_name === day)
//       .map((trip) => parseFloat(trip.excess_travel_time));

//     const sortedData = dayData.sort((a, b) => a - b);
//     const q1 = sortedData[Math.floor(sortedData.length / 4)];
//     const q3 = sortedData[Math.floor((3 * sortedData.length) / 4)];
//     const median = sortedData[Math.floor(sortedData.length / 2)];

//     return {
//       name: day,
//       q1,
//       q3,
//       median,
//     };
//   });

//   return (
//     <BarChart
//       width={800}
//       height={400}
//       data={data}
//       margin={{
//         top: 20,
//         right: 30,
//         left: 20,
//         bottom: 5,
//       }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis dataKey="name" />
//       <YAxis />
//       <Tooltip />
//       <Bar dataKey="q1" fill="#8884d8" />
//       <Bar dataKey="q3" fill="#82ca9d" />
//       <Bar dataKey="median" fill="#ffc658">
//         {data.map((entry, index) => (
//           <Cell
//             key={`cell-${index}`}
//             fill={entry.median > 0 ? "#ff7300" : "#413ea0"}
//           />
//         ))}
//       </Bar>
//     </BarChart>
//   );
// };

// export default TripChart4;

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
import Trip from "./Trip";

interface Props {
  trips: Trip[];
}

const TripChart4: React.FC<Props> = ({ trips }) => {
  const dataByHour: { [key: string]: { [key: string]: number[] } } = {};

  trips.forEach((trip) => {
    const hour = trip.hour_of_day;
    const sitr = parseFloat(trip.SITR);
    const direction = trip.Direction;

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
      const entry: { [key: string]: number | string } = { hour };

      directions.forEach((direction) => {
        entry[direction] = average(dataByHour[hour][direction]);
      });

      return entry;
    });

  return (
    <LineChart
      width={800}
      height={400}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="hour" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Kandy-Digana" stroke="#8884d8" />
      <Line type="monotone" dataKey="Digana-Kandy" stroke="#82ca9d" />
    </LineChart>
  );
};

export default TripChart4;
