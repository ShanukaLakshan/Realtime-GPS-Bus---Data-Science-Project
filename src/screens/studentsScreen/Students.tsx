import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
} from "react-leaflet";
import { LocationData } from "./LocationData";
import L, { LatLngTuple } from "leaflet";
import CSVUploader from "../lawyersScreen/CSVUploader";

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
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [realTimeLocations, index]);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  return (
    <div>
      <div className="lawyer-dashboard-card">
        <h4>Realtime Bus Tracking</h4>
        <CSVUploader onFileLoaded={handleCSV} />
      </div>

      <div>
        <MapContainer
          center={[7.2809, 80.68416]}
          zoom={14}
          scrollWheelZoom={true}
          style={{ width: "100%", height: "100vh" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {LocationData.map((stop) => (
            <>
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
              {realTimeLocations.length > 0 &&
                !isNaN(realTimeLocations[index].latitude) &&
                !isNaN(realTimeLocations[index].longitude) && (
                  <Circle
                    center={[stop.latitude, stop.longitude]}
                    radius={
                      calculateDistance(
                        stop.latitude,
                        stop.longitude,
                        realTimeLocations[index].latitude,
                        realTimeLocations[index].longitude
                      ) <= 100
                        ? 50
                        : 0
                    }
                    color="blue"
                    fillOpacity={0.2}
                  />
                )}
            </>
          ))}

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
