import { Icons } from "../../utils";
import { Images } from "../../utils";

const UserInfo = () => {
  return (
    <div className="user-info">
      <div className="user-info__img">
        <img src={Icons.Notifications} alt="user" />
      </div>
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
              width: "60px",
              height: "60px",
            }}
            src={Images.User}
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
              <span>Shanu</span>
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
