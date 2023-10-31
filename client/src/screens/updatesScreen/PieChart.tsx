import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface Trip {
  behavior: string;
  device_id: number;
}

function countBehaviors(trips: Trip[]): { [key: string]: number } {
  return trips.reduce((acc, trip) => {
    acc[trip.behavior] = (acc[trip.behavior] || 0) + 1;
    return acc;
  }, {});
}

function filterBus(trips: Trip[], busID: number): Trip[] {
  return trips.filter((trip) => trip.device_id === busID);
}

function getUniqueDeviceIds(trips: Trip[]): number[] {
  const uniqueDeviceIds = Array.from(new Set(trips.map((trip) => trip.device_id)));
  return uniqueDeviceIds;
}


function PieChart({ trips }) {
  const [uniqueDeviceIds, setUniqueDeviceIds] = useState<number[]>([]);
  const [busID, setBusID] = useState(123);
  const [data1, setData1] = useState([["Behaviour", "Count"]]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUniqueDeviceIds(getUniqueDeviceIds(trips));
  }, [trips]);

  useEffect(() => {
    const filteredTrips = filterBus(trips, busID);
    const behaviors = countBehaviors(filteredTrips);
    const newData = [["Behaviour", "Count"]];
    
    for (const [key, value] of Object.entries(behaviors)) {
      newData.push([key, value]);
    }
    
    setData1(newData);
    setLoading(false);
  }, [busID, trips]);

  const options = {
    title: `Bus Id ${busID}`
  };
  
  return (
    <div>
      <select
        name="busID"
        id="busID"
        value={busID}
        onChange={(e) => setBusID(parseInt(e.target.value))}
      >
        {uniqueDeviceIds.map((device_id) => (
          <option key={device_id} value={device_id}>
            Bus {device_id}
          </option>
        ))}
      </select>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Chart
          chartType="PieChart"
          data={data1}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      )}
    </div>
  );
}

export default PieChart;
