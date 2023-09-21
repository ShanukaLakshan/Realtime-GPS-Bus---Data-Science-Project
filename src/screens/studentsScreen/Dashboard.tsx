import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import { LocationData } from "./LocationData";
import L from "leaflet"; // Import required components from leaflet

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

  useEffect(() => {
    setBusStops(LocationData);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto auto auto",
        gap: "20px",
        margin: "20px",
      }}
    >
      {/* <div className="student-dashboard-card">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <h2>Bus Halts</h2>
            <h2
              style={{
                backgroundColor: "#f5f5f5",
                marginLeft: "10px",
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
            }}
          >
            <p>Date : 2022/08/28</p>
            <p>Time : 08:00 AM</p>
            <p>Direction : Kandy to Digana</p>
          </div>
        </div>
      </div> */}

      <div className="lawyer-dashboard-card appointments">
        <MapContainer
          style={{ width: "80%", height: "50vh" }}
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
