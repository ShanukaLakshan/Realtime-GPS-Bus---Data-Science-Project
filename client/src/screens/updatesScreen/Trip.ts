interface Trip {
  trip_id: string;
  device_id: string;
  date: string;
  start_time: string;
  end_time: string;
  start_terminal: string;
  end_terminal: string;
  travel_time: string;
  dwell_time: string;
  SITR: string;
  day_of_week: string;
  day_name: string;
  hour_of_day: string;
  weekend: string;
  rush_hour: string;
  excess_travel_time: string;
  Direction: string;
  anomaly_score: string;
  behaviour: string;
  cluster: string;
}

export default Trip;
