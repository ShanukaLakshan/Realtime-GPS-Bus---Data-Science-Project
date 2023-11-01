import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import axios from "axios";
import { LocationData } from "../studentsScreen/LocationData";
import { RealTimeLocationNew, redIcon, busIcon } from "../studentsScreen/index";
import CalculateDistance from "./CalculateDistance";

interface BusStop {
  stop_id: string;
  route_id: string;
  direction: string;
  address: string;
  latitude: number;
  longitude: number;
}

const Staff = () => {
  const [nextBusStop, setNextBusStop] = useState<string>("Not Started");
  const [realTimeLocations, setRealTimeLocations] = useState<
    RealTimeLocationNew[]
  >([]);
  const [index, setIndex] = useState(0);
  const [totalTravelTime, setTotalTravelTime] = useState(0);
  const [passedStops, setPassedStops] = useState<string[]>([]);
  const [passedBusStopNames, setPassedBusStopNames] = useState<string[]>([]);

  const Kandy_Digana = [117, 1166, 505, 262];
  const Digana_Kandy = [
    1358, 513, 121, 116, 1377, 250, 279, 274, 1143, 123, 264, 275,
  ];

  const [busIds, setBusIds] = useState<string[]>([]);
  const [selectedBusId, setSelectedBusId] = useState("117");

  const currentDateTime = new Date();

  const currentDate = currentDateTime.toDateString();
  const currentTime = currentDateTime.toLocaleTimeString();

  const [direction, setDirection] = useState("Kandy-Digana");

  const [BT01Stops, setBT01Stops] = useState<BusStop[]>([]);
  const [BT02Stops, setBT02Stops] = useState<BusStop[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/get-bus-terminals/${direction}`
        );
        const data = await response.json();
        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }
        if (direction === "Kandy-Digana") {
          setBT01Stops(data);
        } else {
          setBT02Stops(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [direction]);

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
        const distance = CalculateDistance(
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
        BT01Stops.forEach((stop) => {
          if (stop.stop_id === stopId) {
            passedBusStopNames.push(stop.address);
          }
        });
      });

      setPassedBusStopNames(passedBusStopNames);
    }
  }, [passedStops, realTimeLocations]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          marginTop: "20px",
          justifyContent: "flex-start",
          width: "100%",
        }}
      >
        <div>
          <h4
            style={{
              ...valueStyle,
              color: "#000000",
              width: "250px",
              textAlign: "center",
              marginRight: "10px",
            }}
          >
            {currentDate} {currentTime}
          </h4>
        </div>

        <select
          id="directionSelect"
          value={direction}
          onChange={(event) => setDirection(event.target.value)}
          style={{
            width: "auto",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#fff",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <option value="Kandy-Digana">Kandy to Digana</option>
          <option value="Digana-Kandy">Digana to Kandy</option>
        </select>

        {direction === "Kandy-Digana" ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {Kandy_Digana.map((stop) => (
              <div
                onClick={() => {
                  setSelectedBusId(stop.toString());
                }}
                style={{
                  width: "auto",
                  padding: "5px 10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor:
                    selectedBusId === stop.toString() ? "#A8DF8E" : "#fff",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  margin: "10px",
                }}
                key={stop}
              >
                {stop}
              </div>
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {Digana_Kandy.map((stop) => (
              <div
                onClick={() => {
                  setSelectedBusId(stop.toString());
                }}
                style={{
                  width: "auto",
                  padding: "5px 10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor:
                    selectedBusId === stop.toString() ? "#A8DF8E" : "#fff",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
                key={stop}
              >
                {stop}
              </div>
            ))}
          </div>
        )}
      </div>
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
                  icon={redIcon}
                >
                  <Popup>{stop.address}</Popup>
                </Marker>

                {realTimeLocations.length > 0 &&
                  index < realTimeLocations.length && (
                    <Circle
                      center={[stop.latitude, stop.longitude]}
                      radius={
                        CalculateDistance(
                          stop.latitude,
                          stop.longitude,
                          realTimeLocations[index].latitude,
                          realTimeLocations[index].longitude
                        ) <= 300
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
                    <div>
                      <p>Bus ID: {realTimeLocations[index].device_id}</p>
                      <p>
                        Speed: {Math.round(realTimeLocations[index].speed)} km/h
                      </p>
                      <p>
                        Start Terminal:{" "}
                        {realTimeLocations[index].start_terminal === "BT01"
                          ? "Kandy"
                          : "Digana"}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )}
          </MapContainer>
        </div>

        <div style={containerStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <p
              style={{
                backgroundColor: "#FFB7B7",
                fontSize: "25px",
                borderRadius: "5px",
                padding: "5px 10px",
              }}
            >
              Passed Bus Stop
            </p>

            {passedBusStopNames.length > 0 ? (
              <h4
                style={{
                  ...valueStyle,
                  color: "#000000",
                  backgroundColor: "#A8DF8E",
                }}
              >
                {passedBusStopNames[passedBusStopNames.length - 1]}
              </h4>
            ) : (
              <h4 style={valueStyle}>Started</h4>
            )}
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <p
              style={{
                backgroundColor: "#FFB7B7",
                fontSize: "25px",
                borderRadius: "5px",
                padding: "5px 10px",
              }}
            >
              Next Bus Stop
            </p>
            <h4
              style={{
                ...valueStyle,
                color: "#000000",
                backgroundColor: "#A8DF8E",
              }}
            >
              {nextBusStop}
            </h4>
          </div>

          <div style={infoContainerStyle}>
            <p style={labelStyle}>Start Terminal</p>

            <h4 style={valueStyle}>
              {realTimeLocations.length > 0 &&
              realTimeLocations[0].start_terminal === "BT01"
                ? "Kandy to Digana"
                : "Digana to Kandy"}
            </h4>
          </div>

          <div style={infoContainerStyle}>
            <p style={labelStyle}>Bus Speed</p>
            <h4 style={valueStyle}>
              {realTimeLocations.length > 0 &&
                Math.round(realTimeLocations[index].speed)}{" "}
              km/h
            </h4>
          </div>

          <div style={infoContainerStyle}>
            <p style={labelStyle}>Stops Passed</p>
            <h4 style={valueStyle}>{passedStops.length}</h4>
          </div>

          <div style={infoContainerStyle}>
            <p style={labelStyle}>Stops Remaining</p>
            <h4 style={valueStyle}>
              {LocationData.length - passedStops.length}
            </h4>
          </div>

          <div style={infoContainerStyle}>
            <p style={labelStyle}>Bus Stops</p>
            <h4 style={valueStyle}>{LocationData.length}</h4>
          </div>

          <div style={infoContainerStyle}>
            <p style={labelStyle}>Total Passengers</p>
            <h4 style={valueStyle}>20</h4>
          </div>

          <div style={infoContainerStyle}>
            <p style={labelStyle}>Total Buses</p>
            <h4 style={valueStyle}>{busIds.length > 0 ? busIds.length : 0}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Staff;

const containerStyle: React.CSSProperties = {
  width: "20%",
  backgroundColor: "#f5f5f5",
  height: "100%",
  borderRadius: "10px",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: "20px",
};

const infoContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
};

const labelStyle: React.CSSProperties = {
  fontWeight: "bold",
  margin: "10px 0",
  backgroundColor: "#FECDA6",
  padding: "5px 10px",
  borderRadius: "5px",
};

const valueStyle: React.CSSProperties = {
  color: "#333",
  margin: "10px 0",
  backgroundColor: "#89CFF3",
  padding: "5px 10px",
  borderRadius: "5px",
};
