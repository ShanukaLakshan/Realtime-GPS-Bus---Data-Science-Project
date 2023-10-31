import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
const BUFFER_RADIUS = 100;

const redIcon = createLeafletIcon("red");
const blueIcon = createLeafletIcon("blue");

function createLeafletIcon(color: string) {
  return new L.Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
}

const Dashboard: React.FC = () => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);
  const [date, setDate] = useState(new Date());
  const [direction, setDirection] = useState("Kandy-Digana");

  const handleDirectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDirection(e.target.value);
  };

  const checkDates = (dateToCheck: Date, view: any) => {
    const date1 = new Date("2023-09-05");
    const date2 = new Date("2023-09-10");

    return dateToCheck.toDateString() === date1.toDateString() ||
      dateToCheck.toDateString() === date2.toDateString()
      ? "react-calendar__tile--active"
      : "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/get-bus-terminals/${direction}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        const busStops: BusStop[] = data.map((row: any) => ({
          stop_id: row.stop_id,
          route_id: row.route_id,
          direction: row.direction,
          address: row.address,
          latitude: row.latitude,
          longitude: row.longitude,
        }));
        setBusStops(busStops);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [direction]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="lawyer-dashboard-card appointments">
          <MapContainer
            style={{ width: "100%", height: "70vh" }}
            center={[LAT, LNG]}
            zoom={14}
            scrollWheelZoom={true}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {busStops.map((stop) => (
              <React.Fragment key={stop.stop_id}>
                <Marker
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
                  {selectedStop && selectedStop.stop_id === stop.stop_id && (
                    <Popup>{stop.address}</Popup>
                  )}
                </Marker>
                <Circle
                  center={[stop.latitude, stop.longitude]}
                  radius={BUFFER_RADIUS}
                  color="blue"
                  fillOpacity={0.2}
                />
              </React.Fragment>
            ))}
          </MapContainer>

          <div className="selected-stop-details">
            {selectedStop && (
              <React.Fragment>
                <h4>Selected Bus Stop</h4>
                <p>Stop ID: {selectedStop.stop_id}</p>
                <p>Route ID: {selectedStop.route_id}</p>
                <p>Direction: {selectedStop.direction}</p>
                <p>Address: {selectedStop.address}</p>
                <p>Latitude: {selectedStop.latitude}</p>
                <p>Longitude: {selectedStop.longitude}</p>
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="student-dashboard-card">
          <div
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
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h4 style={{ margin: "0" }}>Bus Halts</h4>
                  <h4>{busStops.length}</h4>
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <h4 style={{ margin: "0" }}>Total Buses</h4>
                  <h4>{busStops.length + Math.floor(Math.random() * 10)}</h4>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "start",
                }}
              >
                <Calendar
                  tileClassName={({ date, view }) => checkDates(date, view)}
                  onChange={(value) => {
                    if (value instanceof Date) {
                      setDate(value);
                    }
                  }}
                  value={date}
                  className="custom-calendar"
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px",
                    backgroundColor: "#f2f2f2",
                    borderRadius: "5px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <label
                    style={{
                      marginRight: "10px",
                      fontWeight: "bold",
                    }}
                  >
                    Direction:
                  </label>
                  <select
                    value={direction}
                    onChange={handleDirectionChange}
                    style={{
                      marginRight: "10px",
                      padding: "5px",
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                      outline: "none",
                      backgroundColor: "white",
                    }}
                  >
                    <option value="Kandy-Digana">Kandy to Digana</option>
                    <option value="Digana-Kandy">Digana to Kandy</option>
                  </select>
                </div>
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
              <th>Bus Halt</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          <tbody>
            {busStops.map((stop) => (
              <tr
                key={stop.stop_id}
                onClick={() => setSelectedStop(stop)}
                style={{ cursor: "pointer", textDecoration: "underline" }}
              >
                <td>{stop.stop_id}</td>
                <td>{stop.address}</td>
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
