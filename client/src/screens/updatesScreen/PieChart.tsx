import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface Trip {
  behaviour: string;
  start_terminal: string;
  end_terminal: string;
  travel_time: number;
  SITR: number;
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
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <div>
          <h3>Select Bus ID</h3>
          <select
            style={{
              width: "200px",
              height: "40px",
              fontSize: "20px",
              color: "black",
              backgroundColor: "white",
              border: "1px solid black",
              borderRadius: "5px",
            }}
            name="busID"
            id="busID"
            value={busID || ""}
            onChange={(e) => setBusID(parseInt(e.target.value))}
          >
            {uniqueDeviceIds.map((device_id) => (
              <option key={device_id} value={device_id}>
                {device_id}
              </option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "10px",
          }}
        >
          <h5>
            Route{" "}
            <span>
              {getselectedBusIdData.length > 0
                ? getselectedBusIdData[0].start_terminal + " "
                : ""}
            </span>
            to {""}
            <span>
              {" "}
              {getselectedBusIdData.length > 0
                ? getselectedBusIdData[0].end_terminal
                : ""}
            </span>
          </h5>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: "10px",
          }}
        >
          <h5>
            SITR{" "}
            <span>
              {getselectedBusIdData.length > 0
                ? Math.round(getselectedBusIdData[0].SITR * 100) / 100
                : ""}
            </span>
          </h5>
        </div>
      </div>

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
    </div>
  );
}

export default PieChart;
