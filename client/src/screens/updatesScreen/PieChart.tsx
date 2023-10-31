import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface Trip {
  behaviour: string;
}

function countBehaviors(trips: Trip[]): { [key: string]: number } {
  return trips.reduce((acc, trip) => {
    acc[trip.behaviour] = (acc[trip.behaviour] || 0) + 1;
    return acc;
  }, {});
}

function PieChart() {
  const [uniqueDeviceIds, setUniqueDeviceIds] = useState<number[]>([]);
  const [busID, setBusID] = useState<number | null>(null);
  const [getselectedBusIdData, setGetselectedBusIdData] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/get-all-device-ids-performance"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUniqueDeviceIds(data);

        if (data.length > 0) {
          setBusID(data[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (busID !== null) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/get-pie-chart-data/${busID}`
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
  }, [busID]);

  const behaviors = countBehaviors(getselectedBusIdData);
  const normalCount = behaviors["normal"] || 0;
  const anomalyCount = behaviors["anomaly"] || 0;

  const chartData = [
    ["Behavior", "Count"],
    ["Normal", normalCount],
    ["Anomaly", anomalyCount],
  ];

  const options = {
    title: `Bus Id ${busID}`,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {getselectedBusIdData.length > 0 ? (
        <Chart
          chartType="PieChart"
          data={chartData}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      ) : (
        <p>No data available for the selected bus.</p>
      )}
      <select
        style={{
          width: "200px",
          height: "40px",
          fontSize: "20px",
          color: "black",
          backgroundColor: "white",
          border: "1px solid black",
          borderRadius: "5px",
          margin: "10px",
        }}
        name="busID"
        id="busID"
        value={busID || ""}
        onChange={(e) => setBusID(parseInt(e.target.value))}
      >
        {uniqueDeviceIds.map((device_id) => (
          <option key={device_id} value={device_id}>
            Bus {device_id}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PieChart;
