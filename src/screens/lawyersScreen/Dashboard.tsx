import React, { useState } from "react";
import TravelTimeBarChart from "./TravelTimeBarChart";
import DwellTimeByWeekLineChart from "./DwellTimeByWeekLineChart";
import DwellTimeByHourLineChart from "./DwellTimeByHourLineChart";
import Trip from "./Trip";
import CSVUploader from "./CSVUploader";
import TravelToDwellRatioChart from "./TravelToDwellRatioChart";

const Dashboard = () => {
  const [trips, setTrips] = useState<Trip[]>([]);

  const handleCSV = (data: Array<Array<string>>) => {
    const trips: Trip[] = data.slice(1).map((row) => ({
      trip_id: row[0],
      date: row[1],
      start_time: row[2],
      end_time: row[3],
      start_terminal: row[4],
      end_terminal: row[5],
      travel_time: parseFloat(row[6]),
      dwell_time: parseFloat(row[7]),
      ratio: parseFloat(row[8]),
      day_of_week: parseInt(row[9]),
      day_name: row[10],
      hour_of_day: parseInt(row[11]),
      weekend: row[12] === "1",
      rush_hour: row[13] === "1",
    }));

    setTrips(trips);
  };

  const dayOfWeekData = trips.reduce((acc, trip) => {
    const day = trip.day_of_week;
    if (!acc[day]) {
      acc[day] = { day_of_week: day, total_travel_time: 0, count: 0 };
    }
    acc[day].total_travel_time += trip.travel_time;
    acc[day].count += 1;
    return acc;
  }, {} as Record<number, { day_of_week: number; total_travel_time: number; count: number }>);

  const averageTravelTimePerDayOfWeek = Object.values(dayOfWeekData).map(
    (item) => ({
      day_of_week: item.day_of_week,
      average_travel_time:
        Math.round((item.total_travel_time / item.count) * 100) / 100,
    })
  );

  const groupedDataDayOfWeek = trips.reduce((acc, trip) => {
    const { day_of_week, start_terminal, dwell_time } = trip;
    if (!acc[day_of_week]) {
      acc[day_of_week] = {};
    }
    if (!acc[day_of_week][start_terminal]) {
      acc[day_of_week][start_terminal] = {
        day_of_week,
        start_terminal,
        total_dwell_time: 0,
        count: 0,
      };
    }
    acc[day_of_week][start_terminal].total_dwell_time += dwell_time;
    acc[day_of_week][start_terminal].count += 1;
    return acc;
  }, {} as Record<number, Record<string, { day_of_week: number; start_terminal: string; total_dwell_time: number; count: number }>>);

  const groupedDataDayOfHour = trips.reduce((acc, trip) => {
    const { hour_of_day, start_terminal, dwell_time } = trip;
    if (!acc[hour_of_day]) {
      acc[hour_of_day] = {};
    }
    if (!acc[hour_of_day][start_terminal]) {
      acc[hour_of_day][start_terminal] = {
        hour_of_day,
        start_terminal,
        total_dwell_time: 0,
        count: 0,
      };
    }
    acc[hour_of_day][start_terminal].total_dwell_time += dwell_time;
    acc[hour_of_day][start_terminal].count += 1;
    return acc;
  }, {} as Record<number, Record<string, { hour_of_day: number; start_terminal: string; total_dwell_time: number; count: number }>>);

  const averageDwellTimeDataDayOfWeek = Object.keys(groupedDataDayOfWeek)
    .map((day_of_week) =>
      Object.values(groupedDataDayOfWeek[parseInt(day_of_week)]).map(
        (item) => ({
          day_of_week: item.day_of_week,
          start_terminal: item.start_terminal,
          average_dwell_time:
            Math.round((item.total_dwell_time / item.count) * 100) / 100,
        })
      )
    )
    .flat();

  const averageDwellTimeDataDayOfHour = Object.keys(groupedDataDayOfHour)
    .map((hour_of_day) =>
      Object.values(groupedDataDayOfHour[parseInt(hour_of_day)]).map(
        (item) => ({
          hour_of_day: item.hour_of_day,
          start_terminal: item.start_terminal,
          average_dwell_time:
            Math.round((item.total_dwell_time / item.count) * 100) / 100,
        })
      )
    )
    .flat();

  const terminalsWeek = Array.from(
    new Set(averageDwellTimeDataDayOfWeek.map((item) => item.start_terminal))
  );

  const terminalsHour = Array.from(
    new Set(averageDwellTimeDataDayOfHour.map((item) => item.start_terminal))
  );

  const averageRatioByDay = trips.reduce((acc, trip) => {
    const day = trip.day_of_week;
    if (!acc[day]) {
      acc[day] = { day_of_week: day, total_ratio: 0, count: 0 };
    }
    acc[day].total_ratio += trip.ratio;
    acc[day].count += 1;
    return acc;
  }, {} as Record<number, { day_of_week: number; total_ratio: number; count: number }>);

  const averageRatioData = Object.values(averageRatioByDay).map((item) => ({
    day_of_week: item.day_of_week,
    ratio: Math.round((item.total_ratio / item.count) * 100) / 100,
  }));

  return (
    <div className="lawyer-dashboard-main-container">
      <h2>Performance Metrics Dashboard</h2>

      <CSVUploader onFileLoaded={handleCSV} />
      <div className="lawyer-dashboard-card">
        <TravelTimeBarChart data={averageTravelTimePerDayOfWeek} />
      </div>
      <div className="lawyer-dashboard-card">
        <DwellTimeByWeekLineChart
          data={averageDwellTimeDataDayOfWeek}
          terminals={terminalsWeek}
        />
      </div>
      <div className="lawyer-dashboard-card">
        <DwellTimeByHourLineChart
          data={averageDwellTimeDataDayOfHour}
          terminals={terminalsHour}
        />
      </div>
      <div className="lawyer-dashboard-card">
        {/* <TravelToDwellRatioChart data={averageRatioData} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
