import { Icons } from "../../utils";
import { Images } from "../../utils";

const UserInfo = () => {
  return (
    <div className="user-info">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{
              borderRadius: "100%",
              width: "55px",
            }}
            src={Icons.Admin}
            alt="user"
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "10px",
            marginRight: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                fontWeight: "bold",
              }}
            >
              <span>John Doe</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-start",
                marginLeft: "10px",
              }}
            >
              <img src={Icons.DropDown} alt="dropdown" />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <p>Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
