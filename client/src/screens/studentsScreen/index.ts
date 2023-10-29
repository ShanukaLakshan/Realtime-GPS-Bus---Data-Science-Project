import L from "leaflet";

export interface RealTimeLocation {
  data_index: string;
  id: string;
  deviceid: string;
  devicetime: string;
  latitude: number;
  longitude: number;
  speed: number;
}
export interface RealTimeLocationNew {
  id: number;
  device_id: string;
  latitude: number;
  longitude: number;
  speed: number;
  date: string;
  time: string;
  start_time: string;
  start_terminal: string;
  travel_time: string;
  dwell_time: string;
  SITR: string;
  hour_of_the_day: string;
  rush_hour: string;
  wind_speed: string;
  weather: string;
  weekday: string;
  weather_encoded: string;
  devicetime: string; 
}
// Define the redIcon
export const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Define the blueIcon
export const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Define the busIcon
export const busIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/cotton/64/bus--v1.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [35, 35],
  iconAnchor: [12, 35],
  popupAnchor: [1, -30],
  shadowSize: [41, 41],
});
