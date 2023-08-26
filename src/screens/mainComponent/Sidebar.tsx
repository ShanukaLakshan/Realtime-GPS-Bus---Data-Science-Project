import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icons } from "../../utils";

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
    icon: <img src={Icons.Settings} alt="Dashboard" />,
    text: "Home",
  },
  {
    link: "/dashboard/analytics",
    section: "analytics",
    icon: <img src={Icons.Analytics} alt="Analytics" />,
    text: "Analytics",
  },
  {
    link: "/dashboard/lawyers",
    section: "lawyers",
    icon: <img src={Icons.Lawyer} alt="Lawyer" />,
    text: "Lawyers",
  },
  {
    link: "/dashboard/students",
    section: "students",
    icon: <img src={Icons.Students} alt="Students" />,
    text: "Students",
  },
  {
    link: "/dashboard/staff",
    section: "staff",
    icon: <img src={Icons.Staff} alt="Staff" />,
    text: "Staff",
  },
  {
    link: "/dashboard/updates",
    section: "updates",
    icon: <img src={Icons.Updates} alt="Updates" />,
    text: "Updates",
  },
  {
    link: "/dashboard/settings",
    section: "settings",
    icon: <img src={Icons.Settings} alt="Settings" />,
    text: "Settings",
  },
  {
    link: "/",
    section: "signOut",
    icon: <img src={Icons.SignOut} alt="SignOut" />,
    text: "SignOut",
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
          <span>Logo</span>
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
        <div className="sidebar__menu__item"></div>
      </div>
    </div>
  );
};

export default Sidebar;
