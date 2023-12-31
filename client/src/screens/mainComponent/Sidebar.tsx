import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icons, Images } from "../../utils";
interface SidebarNavItem {
  link: string;
  section: string;
  icon: JSX.Element;
  text: string;
}

const sidebarNav: SidebarNavItem[] = [
  {
    link: "/dashboard",
    section: "Dashboard",
    icon: (
      <img
        src={Icons.Live}
        style={{ width: "30px", height: "30px" }}
        alt="Dashboard"
      />
    ),
    text: "Live",
  },
  {
    link: "/dashboard/updates",
    section: "updates",
    icon: (
      <img
        src={Icons.Growth}
        style={{ width: "30px", height: "30px" }}
        alt="Updates"
      />
    ),
    text: "Performance",
  },
  {
    link: "/dashboard/analytics",
    section: "analytics",
    icon: (
      <img
        src={Icons.Growth1}
        style={{ width: "30px", height: "30px" }}
        alt="Analytics"
      />
    ),
    text: "Metrices",
  },
  {
    link: "/dashboard/students",
    section: "students",
    icon: (
      <img
        src={Icons.Tracking}
        style={{ width: "30px", height: "30px" }}
        alt="Students"
      />
    ),
    text: "Tracking",
  },
  {
    link: "/dashboard/staff",
    section: "staff",
    icon: (
      <img
        src={Icons.Travel}
        style={{ width: "30px", height: "30px" }}
        alt="Staff"
      />
    ),
    text: "Bus Halts",
  },
];

const Sidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    if (window.location.pathname === "/dashboard") {
      setActiveIndex(0);
    } else {
      const curPath = window.location.pathname.split("/")[2];
      const activeItem = sidebarNav.findIndex(
        (item) => item.section === curPath
      );

      setActiveIndex(curPath.length === 0 ? 0 : activeItem);
    }
  }, [location]);

  const closeSidebar = () => {
    const mainContent = document.querySelector(".main__content") as HTMLElement;
    mainContent.style.transform = "scale(1) translateX(0)";
    setTimeout(() => {
      document.body.classList.remove("sidebar-open");
    }, 500);
  };

  return (
    <div className="sidebar">
      <Link to="/">
        <div className="sidebar__logo">
          <img
            src={Images.Logo}
            alt="Logo"
            style={{ width: "120px", height: "70px" }}
          />
        </div>
      </Link>
      <div className="sidebar__menu">
        {sidebarNav.map((nav, index) => (
          <Link
            to={nav.link}
            key={`nav-${index}`}
            className={`sidebar__menu__item ${
              activeIndex === index ? "active" : ""
            }`}
            onClick={closeSidebar}
          >
            <div className="sidebar__menu__item__icon">{nav.icon}</div>
            <div className="sidebar__menu__item__txt">{nav.text}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
