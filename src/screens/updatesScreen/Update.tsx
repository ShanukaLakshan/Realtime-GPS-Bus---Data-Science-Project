import React, { useState } from "react";
import Trip from "./Trip";
import CSVUploader from "./CSVUploader";

import GraphComponent from "./GraphComponent";
import AvgDwellTimeGraph from "./AvgDwellTimeGraph";
import CardinalAreaChartComponent from "./DwellTimeByDirectionGraph";
import AverageSITRByHourGraph from "./AverageSITRByHourGraph";

const Update = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  const handleCSV = (data: Array<Array<string>>) => {
    const trips: Trip[] = data.slice(1).map((row) => ({
      trip_id: row[0],
      date: row[1],
      start_time: row[2],
      end_time: row[3],
      start_terminal: row[4],
      end_terminal: row[5],
      travel_time: row[6],
      dwell_time: row[7],
      SITR: row[8],
      day_of_week: row[9],
      day_name: row[10],
      hour_of_day: row[11],
      weekend: row[12] === "1",
      rush_hour: row[13] === "1",
      excess_travel_time: row[14],
      Direction: row[15],
      outlier: row[16],
    }));

    setTrips(trips);
  };

  return (
    <div className="lawyer-dashboard-main-container">
      <h2>New Performance Metrics Dashboard</h2>

      <CSVUploader onFileLoaded={handleCSV} />
      <div className="lawyer-dashboard-card">
        <GraphComponent data={trips} />
      </div>
      <div className="lawyer-dashboard-card">
        <AvgDwellTimeGraph data={trips} />
      </div>
      <div className="lawyer-dashboard-card">
        <CardinalAreaChartComponent data={trips} />
      </div>
      <div className="lawyer-dashboard-card">
        <AverageSITRByHourGraph data={trips} />
      </div>
    </div>
  );
};

export default Update;
