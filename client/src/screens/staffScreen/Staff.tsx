import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  Circle,
} from "react-leaflet";
import { LocationData } from "../studentsScreen/LocationData";
import { LatLngTuple } from "leaflet";
import {
  RealTimeLocationNew,
  redIcon,
  blueIcon,
  busIcon,
} from "../studentsScreen/index";
import axios from "axios";

const Staff = () => {
  const [nextBusStop, setNextBusStop] = useState<string>("Not Started");
  const [realTimeLocations, setRealTimeLocations] = useState<
    RealTimeLocationNew[]
  >([]);
  const [polyline, setPolyline] = useState<LatLngTuple[]>([]);
  const [index, setIndex] = useState(0);
  const [totalTravelTime, setTotalTravelTime] = useState(0);
  const [passedStops, setPassedStops] = useState<string[]>([]);
  const [passedBusStopNames, setPassedBusStopNames] = useState<string[]>([]);

  const [busIds, setBusIds] = useState([]);
  const [selectedBusId, setSelectedBusId] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-all-device-ids")
      .then((response) => {
        setBusIds(response.data);
      })
      .catch((error) => {
        console.error("Error fetching bus IDs:", error);
      });
  }, []);

  const handleBusIdChange = (event) => {
    setSelectedBusId(event.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/get-bus-data/${selectedBusId}`
        );
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        const data = response.data;

        const realTimeLocations: RealTimeLocationNew[] = data.map(
          (row: any) => ({
            id: row.id,
            device_id: row.deviceid,
            latitude: row.latitude,
            longitude: row.longitude,
            speed: row.speed,
            date: row.date,
            time: row.time,
            start_time: row.start_time,
            start_terminal: row.start_terminal,
            travel_time: row.travel_time,
            dwell_time: row.dwell_time,
            SITR: row.SITR,
            hour_of_the_day: row.hour_of_the_day,
            rush_hour: row.rush_hour,
            wind_speed: row.wind_speed,
            weather: row.weather,
            weekday: row.weekday,
            weather_encoded: row.weather_encoded,
            devicetime: row.devicetime,
          })
        );
        setRealTimeLocations(realTimeLocations);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedBusId]);

  useEffect(() => {
    if (index < realTimeLocations.length) {
      LocationData.forEach((stop, stopIndex) => {
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

          if (stopIndex < LocationData.length - 1) {
            setNextBusStop(LocationData[stopIndex + 1].address);
          }
        }
      });
    }
  }, [realTimeLocations, index]);

  useEffect(() => {
    const polyline: LatLngTuple[] = realTimeLocations
      .slice(0, index + 1)
      .map((location) => [location.latitude, location.longitude]);
    setPolyline(polyline);
  }, [realTimeLocations, index]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (index < realTimeLocations.length - 1) {
        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 500); // Changed interval time to 10 seconds (in milliseconds)

    return () => clearInterval(interval);
  }, [realTimeLocations, index]);

  useEffect(() => {
    if (passedStops.length > 0) {
      const passedBusStopNames: string[] = [];
      passedStops.forEach((stopId) => {
        LocationData.forEach((stop) => {
          if (stop.stop_id === stopId) {
            passedBusStopNames.push(stop.address);
          }
        });
      });
      setPassedBusStopNames(passedBusStopNames);
    }
  }, [passedStops]);

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
      <h1>Realtime Bus New</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          width: "100%",
          marginTop: "20px",
          height: "70vh",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "80%",
            height: "100%",
            borderRadius: "10px",
          }}
        >
          <MapContainer
            center={[7.2809, 80.68416]}
            zoom={14}
            scrollWheelZoom={true}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {LocationData.map((stop) => (
              <div key={stop.stop_id}>
                <Marker
                  position={[stop.latitude, stop.longitude]}
                  icon={passedStops.includes(stop.stop_id) ? blueIcon : redIcon}
                  onClick={() => setCurrentStop(stop)}
                >
                  <Popup>{stop.address}</Popup>
                </Marker>

                {realTimeLocations.length > 0 &&
                  index < realTimeLocations.length && (
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
              </div>
            ))}

            {realTimeLocations.length > 0 &&
              index < realTimeLocations.length && (
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

            <Polyline positions={polyline} color="blue" />
          </MapContainer>
        </div>
      </div>

      <div>
        <h1>Select Bus ID</h1>
        <label htmlFor="busIdSelect">Choose a Bus ID:</label>
        <select
          id="busIdSelect"
          value={selectedBusId}
          onChange={handleBusIdChange}
        >
          <option value="">Select a Bus ID</option>
          {busIds.map((busId) => (
            <option key={busId} value={busId}>
              {busId}
            </option>
          ))}
        </select>
        <p>Selected Bus ID: {selectedBusId}</p>
      </div>
    </div>
  );
};

export default Staff;
