import UserInfo from "./UserInfo";

const TopNav = () => {
  return (
    <div className="topnav">
      <div className="left-side">Dashboard</div>
      <div className="right-side">
        <UserInfo />
      </div>
    </div>
  );
};

export default TopNav;
