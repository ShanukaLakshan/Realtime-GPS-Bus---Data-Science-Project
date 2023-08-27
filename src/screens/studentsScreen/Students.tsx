import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LocationData } from "./LocationData";
import L from "leaflet"; // Import required components from leaflet

const LAT = 7.2809;
const LNG = 80.68416;

interface BusStop {
  stop_id: string;
  route_id: string;
  direction: string;
  address: string;
  latitude: number;
  longitude: number;
}
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

const busIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/cotton/64/bus--v1.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [35, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Students = () => {
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [currentStop, setCurrentStop] = useState<BusStop | null>(null);

  useEffect(() => {
    setBusStops(LocationData);

    const interval = setInterval(() => {
      setCurrentStop((prev) => {
        if (prev === null) {
          return busStops[0];
        }

        const currentIndex = busStops.findIndex(
          (busStop) => busStop.stop_id === prev.stop_id
        );

        const nextIndex = currentIndex + 1;

        if (nextIndex === busStops.length) {
          return null;
        }

        return busStops[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [busStops]);

  useEffect(() => {
    console.log(currentStop);
  }, [currentStop]);

  return (
    <div>
      This is a Students page
      <div>
        {/* {currentStop && (
          <div>
            <h2>Current Stop: {currentStop.stop_id}</h2>
            <p>Route: {currentStop.route_id}</p>
            <p>Direction: {currentStop.direction}</p>
            <p>Address: {currentStop.address}</p>
            <p>Latitude: {currentStop.latitude}</p>
            <p>Longitude: {currentStop.longitude}</p>
          </div>
        )} */}

        <MapContainer
          center={[LAT, LNG]}
          zoom={14}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100vh" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {busStops.map((stop) => (
            <Marker
              key={stop.stop_id}
              position={[stop.latitude, stop.longitude]}
              eventHandlers={{
                click: () => setCurrentStop(stop),
              }}
              icon={
                currentStop && currentStop.stop_id === stop.stop_id
                  ? busIcon
                  : redIcon
              }
            >
              <Popup>{stop.address}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Students;
