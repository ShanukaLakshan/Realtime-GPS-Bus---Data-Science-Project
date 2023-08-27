import React, { useEffect, useState } from "react";
import CSVReader from "react-csv-reader";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface BusStop {
  stop_id: string;
  route_id: string;
  direction: string;
  address: string;
  latitude: number;
  longitude: number;
}

const Dashboard: React.FC = () => {

  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [selectedStop, setSelectedStop] = useState<BusStop | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | undefined>([
    0, 0,
  ]); // Set an initial center

  const handleCSV = (data: Array<Array<string>>) => {
    const stops: BusStop[] = data.slice(1).map((row) => ({
      stop_id: row[0],
      route_id: row[1],
      direction: row[2],
      address: row[3],
      latitude: parseFloat(row[4]),
      longitude: parseFloat(row[5]),
    }));

    setBusStops(stops);
  };

  useEffect(() => {
    if (busStops.length > 0) {
      // Calculate mean latitude and longitude
      const meanLatitude =
        busStops.reduce((sum, stop) => sum + stop.latitude, 0) /
        busStops.length;
      const meanLongitude =
        busStops.reduce((sum, stop) => sum + stop.longitude, 0) /
        busStops.length;
      setMapCenter([meanLatitude, meanLongitude]);
    }
  }, [busStops]);

  return (
    <div className="student-dashboard-main-container">
      <div className="lawyer-dashboard-card appointments">
        <MapContainer
          style={{ width: "100%", height: "100vh" }}
          center={mapCenter}
          zoom={13}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {busStops.map((stop) => (
            <Marker
              key={stop.stop_id}
              position={[stop.latitude, stop.longitude]}
              eventHandlers={{
                click: () => setSelectedStop(stop),
              }}
            >
              <Popup>{stop.address}</Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer> */}
        
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

      <div className="student-dashboard-card updates">
        {/* Rest of your updates card content */}
      </div>

      <div className="student-dashboard-card lawyers">
        <CSVReader
          onFileLoaded={handleCSV}
          inputId="ObiWan"
          inputStyle={{ color: "red" }}
        />
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
