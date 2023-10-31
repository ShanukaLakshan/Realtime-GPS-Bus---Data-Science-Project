import React, { useEffect, useState } from "react";
import Trip from "../updatesScreen/Trip";
import TripChart4 from "../updatesScreen/TripChart4";
import TripChart3 from "../updatesScreen/TripChart3";
import PieChartModel from "./PieChartModel";

const Dashboard = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [uniqueDeviceIds, setUniqueDeviceIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/get-performance-data"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const trips: Trip[] = data.map((row: any) => ({
          trip_id: row.trip_id,
          device_id: row.device_id,
          date: row.date,
          start_time: row.start_time,
          end_time: row.end_time,
          start_terminal: row.start_terminal,
          end_terminal: row.end_terminal,
          travel_time: row.travel_time,
          dwell_time: row.dwell_time,
          SITR: row.SITR,
          day_of_week: row.day_of_week,
          day_name: row.day_name,
          hour_of_day: row.hour_of_day,
          weekend: row.weekend,
          rush_hour: row.rush_hour,
          behavior: row.behaviour,
        }));
        setTrips(trips);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const index = uniqueDeviceIds.indexOf(128);
  if (index > -1) {
    uniqueDeviceIds.splice(index, 1);
  }
  const index2 = uniqueDeviceIds.indexOf(284);
  if (index2 > -1) {
    uniqueDeviceIds.splice(index2, 1);
  }

  return (
    <>
      <div
        style={{
          display: "grid",
          justifyContent: "space-evenly",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {uniqueDeviceIds
          .sort(() => Math.random() - Math.random())
          .slice(0, 6)
          .map((device_id) => (
            <div className="lawyer-dashboard-card">
              <p
                style={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  color: "#000000",
                }}
              >
                Bus ID {device_id}
              </p>
              <PieChartModel device_id={device_id} />
            </div>
          ))}
      </div>
      <div className="lawyer-dashboard-main-container">
        <div className="lawyer-dashboard-card">
          <h3>Travel Time by Hour of the Day (Directions)</h3>
          <TripChart3 trips={trips} />
        </div>
        <div className="lawyer-dashboard-card">
          <h3>Average SITR by Hour of the Day (Direction)</h3>
          <TripChart4 trips={trips} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
