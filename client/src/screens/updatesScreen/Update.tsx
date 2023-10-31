import React, { useEffect, useState } from "react";
import Trip from "./Trip";
import TripChart from "./TripChart";
import TripChart2 from "./TripChart2";
import TripChart3 from "./TripChart3";
import TripChart4 from "./TripChart4";
import TripChart5 from "./TripChart5";
import PieChart from "./PieChart";

const Update = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const trips: Trip[] = data.map((row: any) => ({
          trip_id: row.trip_id,
          device_id:row.device_id,
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
          behavior: row.behaviour

        }));
        setTrips(trips);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const trips1 = trips;

  return (
    <div className="lawyer-dashboard-main-container">
      <div className="lawyer-dashboard-card">
        <h3>Behaviour of Bus</h3>
        <PieChart trips={trips1} />
      </div>
      <div className="lawyer-dashboard-card">
        <h3>Travel Time by Hour of the Day (Weekdays vs. Weekends)</h3>
        <TripChart trips={trips} />
      </div>
      <div className="lawyer-dashboard-card">
        <h3>Excess Travel Time by Day of the Week</h3>
        <TripChart5 trips={trips} />
      </div>
      <div className="lawyer-dashboard-card">
        <h3>Dwell Time by Hour of the Day (Weekdays vs. Weekends) :</h3>
        <TripChart2 trips={trips} type="dwell_time" />
      </div>
      <div className="lawyer-dashboard-card">
        <h3>Travel Time by Hour of the Day (Directions)</h3>
        <TripChart3 trips={trips} />
      </div>
      <div className="lawyer-dashboard-card">
        <h3>Average SITR by Hour of the Day (Direction)</h3>
        <TripChart4 trips={trips} />
      </div>
    </div>
  );
};

export default Update;
