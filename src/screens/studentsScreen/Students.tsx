import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import { LocationData } from "./LocationData";
import L, { LatLngTuple } from "leaflet";
import CSVUploader from "../lawyersScreen/CSVUploader";

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

interface RealTimeLocation {
  data_index: string;
  id: string;
  deviceid: string;
  devicetime: string;
  latitude: number;
  longitude: number;
  speed: number;
}

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
  const [currentStop, setCurrentStop] = useState<BusStop | null>(null);
  const [realTimeLocations, setRealTimeLocations] = useState<
    RealTimeLocation[]
  >([]);
  const [polyline, setPolyline] = useState<LatLngTuple[]>([]);
  const [index, setIndex] = useState(0);

  const handleCSV = (data: Array<Array<string>>) => {
    const realTimeLocations: RealTimeLocation[] = data.slice(1).map((row) => ({
      data_index: row[0],
      id: row[1],
      deviceid: row[2],
      devicetime: row[3],
      latitude: parseFloat(row[4]),
      longitude: parseFloat(row[5]),
      speed: parseFloat(row[6]),
    }));

    setRealTimeLocations(realTimeLocations);
  };

  useEffect(() => {
    const polyline: LatLngTuple[] = realTimeLocations.map(
      (location) => [location.latitude, location.longitude] as LatLngTuple
    );
    setPolyline(polyline);
  }, [realTimeLocations]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < realTimeLocations.length) {
        console.log(realTimeLocations[index]);
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [realTimeLocations, index]);

  return (
    <div>
      <div className="lawyer-dashboard-card">
        <h4>Realtime Bus Tracking</h4>
        <CSVUploader onFileLoaded={handleCSV} />
      </div>

      <div>
        <MapContainer
          center={[LAT, LNG]}
          zoom={14}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100vh" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {LocationData.map((stop) => (
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
          {/* {realTimeLocations.length > 0 && (
            <Marker
              position={[
                realTimeLocations[index].latitude,
                realTimeLocations[index].longitude,
              ]}
              icon={busIcon}
            >
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )} */}
          {realTimeLocations.length > 0 &&
            !isNaN(realTimeLocations[index].latitude) &&
            !isNaN(realTimeLocations[index].longitude) && (
              <Marker
                position={[
                  realTimeLocations[index].latitude,
                  realTimeLocations[index].longitude,
                ]}
                icon={busIcon}
              >
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            )}

          <Polyline positions={polyline.slice(0, index + 1)} color="blue" />
        </MapContainer>
      </div>
    </div>
  );
};

export default Students;
