import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {
  PieChart,
  Pie,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Text,
  Line,
  Area,
  ComposedChart,
  XAxis,
  ReferenceLine,
  ReferenceDot,
} from "recharts";

const Dashboard = () => {
  const data01 = [
    { name: "Lawyers", value: 10 },
    { name: "Agency", value: 20 },
  ];

  const data02 = [
    { name: "Jan", value: 10 },
    { name: "Feb", value: 20 },
    { name: "Mar", value: 50 },
    { name: "Apr", value: 40 },
    { name: "May", value: 10 },
    { name: "Jun", value: 20 },
    { name: "Jul", value: 70 },
  ];
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    value,
    index,
    name,
  }: any) => {
    const RADIAN = Math.PI / 180;
    // eslint-disable-next-line
    const radius = 25 + innerRadius + (outerRadius - innerRadius);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    // eslint-disable-next-line
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="#8884d8"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {name} {value}
      </text>
    );
  };

  const CustomizedDot = ({ cx, cy, stroke, payload, value }: any) => {
    if (payload.name == "Mar") {
      return (
        <svg x={cx - 50} y={cy - 50} width="100" height="100">
          <circle
            cx="50"
            cy="50"
            r="8"
            stroke="#fff"
            stroke-width="3"
            fill="#1F578A"
          />
        </svg>
      );
    } else {
      return <Fragment></Fragment>;
    }
  };

  return (
    <div className="lawyer-dashboard-main-container">
      <div className="lawyer-dashboard-card">
        <div className="lawyer-dashboard-card-header">
          <h3 className="primary"> Lawyers and Agency Management</h3>
          <button
            className="btn btn-primary width-auto"
            style={{
              margin: 0,
              display: "flex",
              gap: "30px",
              padding: "10px 20px",
            }}
          >
            <div className="icon-background">
              <i className="fa-solid fa-plus " style={{ color: "#1f578a" }}></i>
            </div>
            New
          </button>
        </div>
        <table>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Type</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro </td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro </td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Mexico</td>
          </tr>
        </table>
        <Link to="/lawyers" style={{ display: "block", textAlign: "center" }}>
          {" "}
          See More
        </Link>
      </div>
      <div className="lawyer-dashboard-card">
        <div
          className="lawyer-dashboard-card-header"
          style={{ marginBottom: "5px" }}
        >
          <h3 className="secondary">Statistics</h3>
          <h3 className="secondary">Total</h3>
        </div>
        <div className="lawyer-dashboard-card-header">
          <h3 className="primary">Lawyers and Agency</h3>
          <h3 className="primary">30</h3>
        </div>
        <div className="lawyer-dashboard-card-graph">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={800} height={800}>
              <Pie
                data={data01}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={renderCustomizedLabel}
                dataKey="value"
              >
                <Cell fill="#E5EAFC" />
                <Cell fill="#1F578A" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="lawyer-dashboard-card">
        <div className="lawyer-dashboard-card-header">
          <h3 className="primary"> Staff Management</h3>
          <button
            className="btn btn-primary width-auto"
            style={{
              margin: 0,
              display: "flex",
              gap: "30px",
              padding: "10px 20px",
            }}
          >
            <div className="icon-background">
              <i className="fa-solid fa-plus " style={{ color: "#1f578a" }}></i>
            </div>
            New Staff
          </button>
        </div>
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Type</th>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro </td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro </td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
        </table>
        <Link to="/lawyers" style={{ display: "block", textAlign: "center" }}>
          {" "}
          See More
        </Link>
      </div>
      <div className="lawyer-dashboard-card">
        <div
          className="lawyer-dashboard-card-header"
          style={{ marginBottom: "5px" }}
        >
          <h3 className="secondary">Statistics</h3>
        </div>
        <div className="lawyer-dashboard-card-header">
          <h3 className="primary">System Reach</h3>
        </div>
        <div className="lawyer-dashboard-card-graph">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart width={300} height={100} data={data02}>
              <XAxis
                dataKey="name"
                height={60}
                type="category"
                axisLine={false}
                tickLine={false}
              />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1F578A69" />
                  <stop offset="33%" stopColor="#1F578A6B" />
                  <stop offset="100%" stopColor="#E5EAFC4F" />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#1F578A"
                dot={CustomizedDot}
                strokeWidth={4}
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="false"
                fill="url(#colorUv)"
              />
              <ReferenceLine x="Mar" stroke="#1F578A" />
              <ReferenceDot
                x="Mar"
                y={50}
                r={10}
                fill="#1F578A"
                stroke="white"
                strokeWidth={4}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
