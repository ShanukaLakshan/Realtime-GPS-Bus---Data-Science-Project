// trip_id,date,start_time,end_time,start_terminal,end_terminal,travel_time,dwell_time,SITR,day_of_week,day_name,hour_of_day,weekend,rush_hour,excess_travel_time,Direction,outlier
// 1,2021-10-01,07:31:27,08:15:31,Digana,Kandy,44.06666666666667,5.466666666666666,0.124054462934947,4,Friday,7.5,0,1,-18.49,Digana-Kandy,normal

interface Trip {
  trip_id: string;
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
  weekend: boolean;
  rush_hour: boolean;
  excess_travel_time: string;
  Direction: string;
  outlier: string;
}

export default Trip;
