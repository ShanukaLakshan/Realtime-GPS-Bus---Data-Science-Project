// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import Trip from "./Trip";

// interface GraphComponentProps {
//   data: Trip[];
// }

// const DwellTimeByDirectionGraph: React.FC<GraphComponentProps> = ({ data }) => {
//   // Calculate the average dwell time for each hour of the day and direction
//   const sumMap: { [key: string]: { sum: number; count: number } } = {};
//   data.forEach((trip) => {
//     const key = `${trip.hour_of_day}-${trip.Direction}`;
//     const dwellTime = parseFloat(trip.dwell_time);
//     if (!sumMap[key]) {
//       sumMap[key] = { sum: 0, count: 0 };
//     }
//     sumMap[key].sum += dwellTime;
//     sumMap[key].count += 1;
//   });

//   const avgData = Object.keys(sumMap).map((key) => {
//     const [hour_of_day, Direction] = key.split("-");
//     return {
//       hour_of_day: parseFloat(hour_of_day),
//       dwell_time: sumMap[key].sum / sumMap[key].count,
//       Direction,
//     };
//   });

//   return (
//     <div>
//       <h3>Dwell Time by Hour of the Day (Direction)</h3>
//       <LineChart
//         width={800}
//         height={400}
//         data={avgData}
//         margin={{
//           top: 5,
//           right: 30,
//           left: 20,
//           bottom: 5,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="hour_of_day" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line
//           type="monotone"
//           dataKey="dwell_time"
//           stroke="#8884d8"
//           activeDot={{ r: 8 }}
//           name="Direction 1"
//         />
//         <Line
//           type="monotone"
//           dataKey="dwell_time"
//           stroke="#FF0000"
//           activeDot={{ r: 8 }}
//           name="Direction 2"
//         />
//         {/* Add more Lines here for more Directions */}
//       </LineChart>
//     </div>
//   );
// };

// export default DwellTimeByDirectionGraph;

// import React, { useState } from "react";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
// import Trip from "./Trip";

// interface GraphComponentProps {
//   data: Trip[];
// }

// const DwellTimeByDirectionSyncAreaChart: React.FC<GraphComponentProps> = ({
//   data,
// }) => {
//   const [filter, setFilter] = useState("All"); // 'All', 'Kandy-Digana', 'Digana-Kandy'

//   // Calculate the average dwell time for each hour of the day and direction
//   const sumMap: { [key: string]: { sum: number; count: number } } = {};
//   data.forEach((trip) => {
//     const key = `${trip.hour_of_day}-${trip.Direction}`;
//     const dwellTime = parseFloat(trip.dwell_time);
//     if (!sumMap[key]) {
//       sumMap[key] = { sum: 0, count: 0 };
//     }
//     sumMap[key].sum += dwellTime;
//     sumMap[key].count += 1;
//   });

//   const avgData = Object.keys(sumMap).map((key) => {
//     const [hour_of_day, Direction] = key.split("-");
//     return {
//       hour_of_day: parseFloat(hour_of_day),
//       dwell_time: sumMap[key].sum / sumMap[key].count,
//       Direction,
//     };
//   });

//   let displayData = avgData;

//   if (filter === "Kandy-Digana") {
//     displayData = avgData.filter((d) => d.Direction === "Kandy-Digana");
//   } else if (filter === "Digana-Kandy") {
//     displayData = avgData.filter((d) => d.Direction === "Digana-Kandy");
//   }

//   return (
//     <div>
//       <h3>Dwell Time by Hour of the Day (Direction)</h3>
//       <div>
//         <button onClick={() => setFilter("All")}>All</button>
//         <button onClick={() => setFilter("Kandy-Digana")}>
//           Kandy to Digana
//         </button>
//         <button onClick={() => setFilter("Digana-Kandy")}>
//           Digana to Kandy
//         </button>
//       </div>
//       <AreaChart
//         width={800}
//         height={400}
//         data={displayData}
//         margin={{
//           top: 10,
//           right: 30,
//           left: 0,
//           bottom: 0,
//         }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="hour_of_day" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Area
//           type="monotone"
//           dataKey="dwell_time"
//           stroke="#8884d8"
//           fillOpacity={0.3}
//           fill="#8884d8"
//           name="Kandy to Digana"
//         />
//         <Area
//           type="monotone"
//           dataKey="dwell_time"
//           stroke="#FF0000"
//           fillOpacity={0.3}
//           fill="#FF0000"
//           name="Digana to Kandy"
//         />
//       </AreaChart>
//     </div>
//   );
// };

// export default DwellTimeByDirectionSyncAreaChart;

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Trip from "./Trip";

interface GraphComponentProps {
  data: Trip[];
}

const CardinalAreaChartComponent: React.FC<GraphComponentProps> = ({
  data,
}) => {
  const [filter, setFilter] = useState("All"); // 'All', 'Kandy-Digana', 'Digana-Kandy'

  // Calculate the average dwell time for each hour of the day and direction
  const sumMap: { [key: string]: { sum: number; count: number } } = {};
  data.forEach((trip) => {
    const key = `${trip.hour_of_day}-${trip.Direction}`;
    const dwellTime = parseFloat(trip.dwell_time);
    if (!sumMap[key]) {
      sumMap[key] = { sum: 0, count: 0 };
    }
    sumMap[key].sum += dwellTime;
    sumMap[key].count += 1;
  });

  const avgData = Object.keys(sumMap).map((key) => {
    const [hour_of_day, Direction] = key.split("-");
    return {
      hour_of_day: parseFloat(hour_of_day),
      dwell_time: sumMap[key].sum / sumMap[key].count,
      Direction,
    };
  });

  let displayData = avgData;

  if (filter === "Kandy-Digana") {
    displayData = avgData.filter((d) => d.Direction === "Kandy");
  } else if (filter === "Digana-Kandy") {
    displayData = avgData.filter((d) => d.Direction === "Digana");
  }

  return (
    <div>
      <h3>Dwell Time by Hour of the Day (Direction {filter})</h3>
      <div>
        <button
          style={{
            backgroundColor: filter === "All" ? "#8884d8" : "#FFFFFF",
            color: filter === "All" ? "#FFFFFF" : "#000000",
            margin: "10px",
            padding: "5px",
            borderRadius: "5px",
          }}
          onClick={() => setFilter("All")}
        >
          All
        </button>
        <button
          style={{
            backgroundColor: filter === "Kandy-Digana" ? "#8884d8" : "#FFFFFF",
            color: filter === "Kandy-Digana" ? "#FFFFFF" : "#000000",
            margin: "10px",
            padding: "5px",
            borderRadius: "5px",
          }}
          onClick={() => setFilter("Kandy-Digana")}
        >
          Kandy to Digana
        </button>
        <button
          style={{
            backgroundColor: filter === "Digana-Kandy" ? "#8884d8" : "#FFFFFF",
            color: filter === "Digana-Kandy" ? "#FFFFFF" : "#000000",
            margin: "10px",
            padding: "5px",
            borderRadius: "5px",
          }}
          onClick={() => setFilter("Digana-Kandy")}
        >
          Digana to Kandy
        </button>
      </div>
      <AreaChart
        width={800}
        height={400}
        data={displayData}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour_of_day" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="dwell_time"
          stroke="#8884d8"
          fillOpacity={0.3}
          fill="#8884d8"
          name="Kandy to Digana"
        />
        <Area
          type="monotone"
          dataKey="dwell_time"
          stroke="#FF0000"
          fillOpacity={0.3}
          fill="#FF0000"
          name="Digana to Kandy"
        />
      </AreaChart>
    </div>
  );
};

export default CardinalAreaChartComponent;
