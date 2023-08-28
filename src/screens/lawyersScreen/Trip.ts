interface Trip {
  trip_id: string;
  date: string;
  start_time: string;
  end_time: string;
  start_terminal: string;
  end_terminal: string;
  travel_time: number;
  dwell_time: number;
  ratio: number;
  day_of_week: number;
  day_name: string;
  hour_of_day: number;
  weekend: boolean;
  rush_hour: boolean;
}

export default Trip;
