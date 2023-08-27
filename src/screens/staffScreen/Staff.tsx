import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import CSVUploader from "../lawyersScreen/CSVUploader";

const LAT = 7.2809;
const LNG = 80.68416;

interface RealTimeLocation {
  id: string;
  deviceid: string;
  devicetime: string;
  latitude: number;
  longitude: number;
  speed: number;
}

const busIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/cotton/64/bus--v1.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [35, 35],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Staff = () => {
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
      This is a Staff page
      <div>
        <CSVUploader onFileLoaded={handleCSV} />

        <MapContainer
          center={[LAT, LNG]}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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

export default Staff;
