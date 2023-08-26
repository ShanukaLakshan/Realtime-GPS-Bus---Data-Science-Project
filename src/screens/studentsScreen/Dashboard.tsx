import { Fragment } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const StudentDashboardCardGraph = () => {
    return (
      <div className="student-dashboard-card-graph">
        <hr />
        <div className="student-dashboard-card-graph-content-top">
          <div className="student-dashboard-card-graph-content-top-left">
            <img
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Avatar"
            />
          </div>
          <div className="student-dashboard-card-graph-content-top-right">
            <h3>Sample Topic by Sample User Name</h3>
          </div>
        </div>

        <div className="student-dashboard-card-graph-content-bottom">
          <div className="student-dashboard-card-paragraph">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
          <span>Yesterday at 5:42 PM</span>
        </div>
      </div>
    );
  };

  return (
    <div className="student-dashboard-main-container">
      <div
        className="appointments"
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            display: "flex",
            flexBasis: "60%",
            margin: "10px",
            flexDirection: "column",
            alignItems: "flex-start",
            padding: "20px",
            borderRadius: "20px",
            backgroundColor: "#FFF",
            boxShadow: "3px 3px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div className="student-dashboard-card-header">
            <h3 className="primary">Up comming Appointments</h3>
          </div>
          <span>Yesterday at 5:42 PM</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "40%",
            margin: "10px",
            alignItems: "flex-end",
            padding: "20px",
            borderRadius: "20px",
            backgroundColor: "#FFF",
            boxShadow: "3px 3px 5px rgba(0,0,0,0.1)",
          }}
        >
          <div className="student-dashboard-card-header">
            <h3 className="primary">Point Score</h3>
          </div>
        </div>
      </div>

      <div className="student-dashboard-card updates">
        <div className="student-dashboard-card-header">
          <h3 className="primary">Updates</h3>
        </div>
        <div className="student-dashboard-card-graph">
          <StudentDashboardCardGraph />
          <StudentDashboardCardGraph />
          <StudentDashboardCardGraph />
          <StudentDashboardCardGraph />
        </div>
      </div>

      <div className="student-dashboard-card lawyers">
        <div className="student-dashboard-card-header">
          <h3
            className="primary"
            style={{
              fontSize: "24px",
              margin: "0",
              padding: "0",
            }}
          >
            Lawyers
          </h3>
        </div>
        <hr
          style={{
            width: "100%",
            height: "5px",
            backgroundColor: "#C8C8C8",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "50%",
            height: "50px",
          }}
        >
          <button
            style={{
              backgroundColor: "#FFF",
              color: "#000",
              padding: "10px",
              width: "200px",
              height: "40px",
              fontSize: "18px",
              cursor: "pointer",
              border: "none",
            }}
          >
            Consulted Lawyers
            <hr
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#C8C8C8",
                margin: "10px 0 ",
              }}
            />
          </button>
          <button
            style={{
              backgroundColor: "#FFF",
              color: "#000",
              padding: "10px",
              width: "200px",
              height: "40px",
              fontSize: "18px",
              cursor: "pointer",
              border: "none",
            }}
          >
            All Lawyers
            <hr
              style={{
                width: "100%",
                height: "2px",
                backgroundColor: "#C8C8C8",
                margin: "10px 0 ",
              }}
            />
          </button>
        </div>
        <table>
          <thead>
            <tr
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                height: "50px",
              }}
            >
              <th>Image</th>
              <th>Name</th>
              <th>Requested Document</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Avatar"
                />
              </td>
              <td>Sample Lawyer Name</td>
              <td>
                <button>View</button>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Avatar"
                />
              </td>
              <td>Sample Lawyer Name</td>
              <td>
                <button>View</button>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Avatar"
                />
              </td>
              <td>Sample Lawyer Name</td>
              <td>
                <button>View</button>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Avatar"
                />
              </td>
              <td>Sample Lawyer Name</td>
              <td>
                <button>View</button>
              </td>
            </tr>
            <tr>
              <td>
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Avatar"
                />
              </td>
              <td>Sample Lawyer Name</td>
              <td>
                <button>View</button>
              </td>
            </tr>
          </tbody>
        </table>
        <Link to="/dashboard" style={{ display: "block", textAlign: "center" }}>
          See More
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
