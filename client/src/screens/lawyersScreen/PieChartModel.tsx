import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface Trip {
  avg_travel_time: string;
  avg_dwell_time: string;
  device_time: string; // Add device_time to Trip interface
}

function PieChartModel({ device_id }: { device_id: number }) {
  const [getselectedBusIdData, setGetselectedBusIdData] = useState<Trip[]>([]);

  useEffect(() => {
    if (device_id !== null) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/get-pie-chart-dwell-data/${device_id}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setGetselectedBusIdData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [device_id]);

  // Parse the string values to numbers
  const travelTime = parseFloat(
    getselectedBusIdData[0]?.avg_travel_time || "0"
  );
  const dwellTime = parseFloat(getselectedBusIdData[0]?.avg_dwell_time || "0");
  const deviceTime = getselectedBusIdData[0]?.device_time || "N/A"; // Use the device_time from the API response

  const chartData = [
    ["Task", "Hours per Day"],
    ["Travel Time", travelTime],
    ["Dwell Time", dwellTime],
  ];

  const options = {
    title: `Bus Id ${device_id} - Device Time: ${deviceTime}`, // Include device time in the title
    pieHole: 0.4,
    slices: [
      {
        color: "#2BB673",
      },
      {
        color: "#d91e48",
      },
    ],
    legend: {
      position: "bottom",
      alignment: "center",
      textStyle: {
        color: "233238",
        fontSize: 14,
      },
    },
    tooltip: {
      showColorCode: true,
    },
    chartArea: {
      left: 0,
      top: 0,
      width: "100%",
      height: "80%",
    },
  };

  return (
    <>
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </>
  );
}

export default PieChartModel;
