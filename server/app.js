import express from "express";
import mysql from "mysql2/promise";
import bodyParser from "body-parser";
import cors from "cors"; // Import the cors middleware
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Enable CORS
app.use(cors());

const PORT = process.env.PORT || 5000;

dotenv.config();

// MySQL Connection Configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

app.use(bodyParser.json());

// Save data to the database
app.post("/save-data", async (req, res) => {
  const data = req.body;
  console.log(data);
  const query =
    "INSERT INTO trip_data (trip_id, date, start_time, end_time, start_terminal, end_terminal, travel_time, dwell_time, ratio, day_of_week, day_name, hour_of_day, weekend, rush_hour) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    data.trip_id,
    data.date,
    data.start_time,
    data.end_time,
    data.start_terminal,
    data.end_terminal,
    data.travel_time,
    data.dwell_time,
    data.ratio,
    data.day_of_week,
    data.day_name,
    data.hour_of_day,
    data.weekend,
    data.rush_hour,
  ];

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.execute(query, values);
    connection.release();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get all data from the database
app.get("/get-data", async (req, res) => {
  const query = "SELECT * FROM trip_data";
  try {
    const [results] = await pool.execute(query);
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Save all data to the database
app.post("/save-all-data", async (req, res) => {
  const dataArray = req.body;

  if (!Array.isArray(dataArray)) {
    res.status(400).json({ error: "Data should be an array" });
    return;
  }

  const query =
    "INSERT INTO trip_data (trip_id, date, start_time, end_time, start_terminal, end_terminal, travel_time, dwell_time, ratio, day_of_week, day_name, hour_of_day, weekend, rush_hour) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  try {
    const connection = await pool.getConnection();
    for (const data of dataArray) {
      const values = [
        data.trip_id,
        data.date,
        data.start_time,
        data.end_time,
        data.start_terminal,
        data.end_terminal,
        data.travel_time,
        data.dwell_time,
        data.ratio,
        data.day_of_week,
        data.day_name,
        data.hour_of_day,
        data.weekend,
        data.rush_hour,
      ];
      await connection.execute(query, values);
    }
    connection.release();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/insert-data-df123", async (req, res) => {
  const dataArray = req.body;

  if (!Array.isArray(dataArray)) {
    res.status(400).json({ error: "Data should be an array" });
    return;
  }

  const query =
    "INSERT INTO df_123 (id, deviceid, devicetime, latitude, longitude, speed) VALUES (?, ?, ?, ?, ?, ?)";

  try {
    const connection = await pool.getConnection();
    for (const data of dataArray) {
      const values = [
        data.id,
        data.deviceid,
        data.devicetime,
        data.latitude,
        data.longitude,
        data.speed,
      ];
      await connection.execute(query, values);
    }
    connection.release();
    res.status(201).json({ message: "Data inserted successfully" });
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-data-df123", async (req, res) => {
  const query = "SELECT * FROM df_123 ORDER BY devicetime ASC";

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query);
    connection.release();
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/save-bus-terminals", async (req, res) => {
  const dataArray = req.body;

  if (!Array.isArray(dataArray)) {
    res.status(400).json({ error: "Data should be an array" });
    return;
  }

  const query =
    "INSERT INTO bus_terminals (stop_id, route_id, direction, address, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?)";

  try {
    const connection = await pool.getConnection();
    for (const data of dataArray) {
      const values = [
        data.stop_id,
        data.route_id,
        data.direction,
        data.address,
        data.latitude,
        data.longitude,
      ];
      await connection.execute(query, values);
    }
    connection.release();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-bus-terminals/:direction", async (req, res) => {
  const direction = req.params.direction;
  const query = "SELECT * FROM bus_terminals WHERE direction = ?";

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query, [direction]);
    connection.release();
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/save-bus-data", async (req, res) => {
  const dataArray = req.body;

  if (!Array.isArray(dataArray)) {
    res.status(400).json({ error: "Data should be an array" });
    return;
  }

  const query =
    "INSERT INTO bus_data (deviceid, latitude, longitude, speed, date, time, start_time, start_terminal, travel_time, dwell_time, SITR, hour_of_the_day, rush_hour, wind_speed, weather, weekday, weather_encoded) VALUES  (?, ? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)";

  try {
    const connection = await pool.getConnection();

    for (const data of dataArray) {
      const values = [
        data.deviceid,
        data.latitude,
        data.longitude,
        data.speed,
        data.date,
        data.time,
        data.start_time,
        data.start_terminal,
        data.travel_time,
        data.dwell_time,
        data.SITR,
        data.hour_of_the_day,
        data.rush_hour,
        data.wind_speed,
        data.weather,
        data.weekday,
        data.weather_encoded,
      ];
      await connection.execute(query, values);
    }

    connection.release();
    res.status(201).json({ message: "Data saved successfully" });
  } catch (err) {
    console.error("Error saving data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-bus-data", async (req, res) => {
  const query = "SELECT * FROM bus_data";

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query);
    connection.release();
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/get-bus-data/:deviceid", async (req, res) => {
  const deviceid = req.params.deviceid;
  const query = "SELECT * FROM bus_data WHERE deviceid = ?";

  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute(query, [deviceid]);
    connection.release();
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all device ids in bus_data 

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

// Drop Database IF EXISTS gps;
// CREATE DATABASE gps;
// USE gps;
// CREATE TABLE trip_data (
//     trip_id INT PRIMARY KEY,
//     date DATE,
//     start_time TIME,
//     end_time TIME,
//     start_terminal VARCHAR(5),
//     end_terminal VARCHAR(5),
//     travel_time DECIMAL(10, 2),
//     dwell_time DECIMAL(10, 2),
//     ratio DECIMAL(10, 8),
//     day_of_week INT,
//     day_name VARCHAR(20),
//     hour_of_day INT,
//     weekend INT,
//     rush_hour INT
// );

// CREATE TABLE df_123 (
//   id INTEGER PRIMARY KEY,
//   deviceid INTEGER,
//   devicetime VARCHAR(25),
//   latitude REAL,
//   longitude REAL,
//   speed REAL
// );

// CREATE TABLE bus_terminals (
//    id INT AUTO_INCREMENT PRIMARY KEY,
//   stop_id VARCHAR(10),
//   route_id INT,
//   direction VARCHAR(50),
//   address VARCHAR(255),
//   latitude DECIMAL(10, 8),
//   longitude DECIMAL(11, 8)
// );

// CREATE TABLE bus_data (
//   deviceid INT,
//   latitude DECIMAL(9, 7),
//   longitude DECIMAL(9, 7),
//   speed DECIMAL(10, 4),
//   date DATE,
//   time TIME,
//   start_time TIME,
//   start_terminal VARCHAR(5),
//   travel_time DECIMAL(5, 2),
//   dwell_time DECIMAL(5, 2),
//   SITR DECIMAL(5, 3),
//   hour_of_the_day DECIMAL(5, 3),
//   rush_hour DECIMAL(5, 3),
//   wind_speed DECIMAL(10, 4),
//   weather VARCHAR(50),
//   weekday DECIMAL(3, 0),
//   weather_encoded INT
// );
