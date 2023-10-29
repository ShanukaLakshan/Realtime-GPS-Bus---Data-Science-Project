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
import { LatLngTuple } from "leaflet";
import { RealTimeLocation, redIcon, blueIcon, busIcon } from "./index";
import CalculateDistance from "../staffScreen/CalculateDistance";

const Students = () => {
  const [nextBusStop, setNextBusStop] = useState<string>("Not Started");
  const [realTimeLocations, setRealTimeLocations] = useState<
    RealTimeLocation[]
  >([]);
  const [polyline, setPolyline] = useState<LatLngTuple[]>([]);
  const [index, setIndex] = useState(0);
  const [totalTravelTime, setTotalTravelTime] = useState(0);
  const [passedStops, setPassedStops] = useState<string[]>([]);
  const [passedBusStopNames, setPassedBusStopNames] = useState<string[]>([]);

  const currentDateTime = new Date();

  const currentDate = currentDateTime.toDateString();
  const currentTime = currentDateTime.toLocaleTimeString();

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
    const polyline: LatLngTuple[] = realTimeLocations
      .slice(0, index + 1)
      .map(
        (location) => [location.latitude, location.longitude] as LatLngTuple
      );
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

  const getTravelTime = (devicetime: string) => {
    const date = new Date(devicetime);
    const totalSeconds =
      date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
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
      <h1>Realtime Bus Tracking</h1>

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
                        CalculateDistance(
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

        <div style={containerStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginTop: "20px",
            }}
          >
            <h4
              style={{
                ...valueStyle,
                color: "#000000",
              }}
            >
              {currentDate} {currentTime}
            </h4>
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
            <p style={labelStyle}>Current travel time</p>
            <h4 style={valueStyle}>
              {totalTravelTime > 0 && (
                <>
                  {/* {Math.floor(totalTravelTime / 3600)}h{" "} */}
                  {Math.floor((totalTravelTime % 3600) / 60)}m{" "}
                  {Math.floor((totalTravelTime % 3600) % 60)}s
                </>
              )}
            </h4>
          </div>
          <div style={infoContainerStyle}>
            <p style={labelStyle}>Bus Speed</p>

            <h4
              style={{
                ...(realTimeLocations.length > 0 &&
                realTimeLocations[index].speed === 0
                  ? { color: "#CE5A67" }
                  : { color: "#000" }),
                ...labelStyle,
              }}
            >
              {realTimeLocations.length > 0 &&
                realTimeLocations[index].speed.toFixed(2)}{" "}
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
            <h4 style={valueStyle}>5</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;

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
