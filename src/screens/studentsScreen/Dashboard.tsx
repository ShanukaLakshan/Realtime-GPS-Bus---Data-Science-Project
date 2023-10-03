import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { LocationData } from "./LocationData";
import L from "leaflet"; // Import required components from leaflet
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePickerComponent from "./TimePickerComponent";
interface BusStop {
  stop_id: string;
  route_id: string;
  direction: string;
  address: string;
  latitude: number;
  longitude: number;
}

const LAT = 7.2809;
const LNG = 80.68416;
const BUFFER_RADIUS = 50; // 50 m in meters

// Create the red dot icon
const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Step 1: Create the blue dot icon
const blueIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Dashboard: React.FC = () => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);

  const [date, setDate] = useState(new Date());

  const [direction, setDirection] = useState("Kandy to Digana");

  const handleDirectionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDirection(event.target.value);
  };

  const checkDates = (date: any, view: any) => {
    if (
      date.toDateString() === new Date("2023-09-05").toDateString() ||
      date.toDateString() === new Date("2023-09-10").toDateString()
    ) {
      return "react-calendar__tile--active";
    }
  };

  useEffect(() => {
    setBusStops(LocationData);
  }, []);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="lawyer-dashboard-card appointments">
          <MapContainer
            style={{ width: "100%", height: "80vh" }}
            center={[LAT, LNG]}
            zoom={14}
            scrollWheelZoom={true}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {busStops.map((stop) => (
              <>
                <Marker
                  key={stop.stop_id}
                  position={[stop.latitude, stop.longitude]}
                  eventHandlers={{
                    click: () => setSelectedStop(stop),
                  }}
                  icon={
                    selectedStop && selectedStop.stop_id === stop.stop_id
                      ? blueIcon
                      : redIcon
                  }
                >
                  <Popup>{stop.address}</Popup>
                </Marker>
                {/* Add this to draw a circle around each bus stop */}
                <Circle
                  center={[stop.latitude, stop.longitude]}
                  radius={BUFFER_RADIUS}
                  color="blue"
                  fillOpacity={0.2}
                />
              </>
            ))}
          </MapContainer>

          <div className="selected-stop-details">
            {selectedStop && (
              <>
                <h4>Selected Bus Stop</h4>
                <p>Stop ID: {selectedStop.stop_id}</p>
                <p>Route ID: {selectedStop.route_id}</p>
                <p>Direction: {selectedStop.direction}</p>
                <p>Address: {selectedStop.address}</p>
                <p>Latitude: {selectedStop.latitude}</p>
                <p>Longitude: {selectedStop.longitude}</p>
              </>
            )}
          </div>
        </div>
        <div
          className="student-dashboard-card"
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#ffffff",
              padding: "15px",
              borderRadius: "6px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginBottom: "15px",
              }}
            >
              <h2 style={{ margin: "0" }}>Bus Halts</h2>
              <h2
                style={{
                  backgroundColor: "#f5f5f5",
                  marginLeft: "10px",
                  padding: "5px 10px",
                  borderRadius: "4px",
                }}
              >
                {busStops.length}
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
              }}
            >
              <p style={{ marginLeft: "5px 0" }}>
                Date :
                {
                  <span style={{ fontWeight: "bold", marginLeft: "10px" }}>
                    {date.toDateString()}
                  </span>
                }
              </p>

              <Calendar
                tileClassName={({ date, view }) => checkDates(date, view)}
                onChange={(value) => {
                  if (value instanceof Date) {
                    setDate(value);
                  }
                }}
                value={date}
              />

              {/* <TimePickerComponent /> */}

              <div style={{ display: "flex", alignItems: "center" }}>
                <label style={{ marginRight: "10px" }}>Direction:</label>
                <select
                  value={direction}
                  onChange={handleDirectionChange}
                  style={{ marginRight: "10px" }}
                >
                  <option value="Kandy to Digana">Kandy to Digana</option>
                  <option value="Digana to Kandy">Digana to Kandy</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="student-dashboard-card lawyers">
        <table>
          <thead>
            <tr>
              <th>Stop ID</th>
              <th>Route ID</th>
              <th>Direction</th>
              <th>Bus Halt</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {busStops.map((stop) => (
              <tr key={stop.stop_id}>
                <td>{stop.stop_id}</td>
                <td>{stop.route_id}</td>
                <td>{stop.direction}</td>
                <td>
                  <span
                    onClick={() => setSelectedStop(stop)}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {stop.address}
                  </span>
                </td>
                <td>{stop.latitude}</td>
                <td>{stop.longitude}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
