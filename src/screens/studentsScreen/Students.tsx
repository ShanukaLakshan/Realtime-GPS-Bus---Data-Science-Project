import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LocationData } from "./LocationData";
import L, { LatLngTuple } from "leaflet"; // Import required components from leaflet
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
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [currentStop, setCurrentStop] = useState<BusStop | null>(null);

  // useEffect(() => {
  //   setBusStops(LocationData);

  //   const interval = setInterval(() => {
  //     setCurrentStop((prev) => {
  //       if (prev === null) {
  //         return busStops[0];
  //       }

  //       const currentIndex = busStops.findIndex(
  //         (busStop) => busStop.stop_id === prev.stop_id
  //       );

  //       const nextIndex = currentIndex + 1;

  //       if (nextIndex === busStops.length) {
  //         return null;
  //       }

  //       return busStops[nextIndex];
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [busStops]);

  const [realTimeLocations, setRealTimeLocations] = useState<
    RealTimeLocation[]
  >([]);
  const [polyline, setPolyline] = useState<LatLngTuple[]>([]);
  const [index, setIndex] = useState(0);

  const handleCSV = (data: Array<Array<string>>) => {
    const realTimeLocations: RealTimeLocation[] = data.slice(1).map((row) => ({
      id: row[0],
      deviceid: row[1],
      devicetime: row[2],
      latitude: parseFloat(row[3]),
      longitude: parseFloat(row[4]),
      speed: parseFloat(row[5]),
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
    }, 100);

    return () => clearInterval(interval);
  }, [realTimeLocations, index]);

  return (
    <div>
      This is a Students page
      <CSVUploader onFileLoaded={handleCSV} />
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
          {/* {busStops.map((stop) => (
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
          ))} */}
          {/* Show bus stops statically */}
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
          {realTimeLocations.length > 0 && (
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
        </MapContainer>
      </div>
    </div>
  );
};

export default Students;
