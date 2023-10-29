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
import Speedometer from "./Speedometer";

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
  const [totalTravelTime, setTotalTravelTime] = useState(0);
  const [passedStops, setPassedStops] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/get-data-df123");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const realTimeLocations: RealTimeLocation[] = data.map((row: any) => ({
          id: row.id,
          deviceid: row.deviceid,
          devicetime: row.devicetime,
          latitude: row.latitude,
          longitude: row.longitude,
          speed: row.speed,
        }));
        setRealTimeLocations(realTimeLocations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Sort realTimeLocations by devicetime
  useEffect(() => {
    setRealTimeLocations((prevLocations) =>
      prevLocations.sort((a, b) => {
        const dateA = new Date(a.devicetime);
        const dateB = new Date(b.devicetime);

        return dateA.getTime() - dateB.getTime();
      })
    );
  }, [realTimeLocations]);

  useEffect(() => {
    if (
      realTimeLocations.length > 0 &&
      !isNaN(realTimeLocations[index].latitude) &&
      !isNaN(realTimeLocations[index].longitude)
    ) {
      LocationData.forEach((stop) => {
        const distance = calculateDistance(
          stop.latitude,
          stop.longitude,
          realTimeLocations[index].latitude,
          realTimeLocations[index].longitude
        );

        if (distance <= 100) {
          setPassedStops((prevStops) => {
            if (!prevStops.includes(stop.stop_id)) {
              return [...prevStops, stop.stop_id];
            }
            return prevStops;
          });
        }
      });
    }
  }, [realTimeLocations, index]);

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

  const getTravelTime = (devicetime: string) => {
    const date = new Date(devicetime);
    const totalSeconds =
      date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();

    return totalSeconds;
  };

  useEffect(() => {
    if (realTimeLocations.length > 0) {
      const travelTime =
        getTravelTime(realTimeLocations[index].devicetime) -
        getTravelTime(realTimeLocations[0].devicetime);

      setTotalTravelTime(travelTime);
    }
  }, [realTimeLocations, index]);

  return (
    <div>
      <div className="lawyer-dashboard-card">
        <h4>Realtime Bus Tracking</h4>
      </div>

      <div>
        <MapContainer
          center={[7.2809, 80.68416]}
          zoom={14}
          scrollWheelZoom={true}
          style={{ width: "80%", height: "50vh" }}
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
                icon={passedStops.includes(stop.stop_id) ? blueIcon : redIcon}
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "80%",
          marginTop: "20px",
        }}
      >
        <div>
          {realTimeLocations.length > 0 && (
            <Speedometer speed={realTimeLocations[index].speed} maxSpeed={60} />
          )}
        </div>
        <div>
          <p>SITR</p>
        </div>
        <div>
          <p>Total travel time</p>
          <h4>
            {totalTravelTime > 0 && (
              <>
                {Math.floor(totalTravelTime / 3600)}h{" "}
                {Math.floor((totalTravelTime % 3600) / 60)}m{" "}
                {Math.floor((totalTravelTime % 3600) % 60)}s
              </>
            )}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Students;
