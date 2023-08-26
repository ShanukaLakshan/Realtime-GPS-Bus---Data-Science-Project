import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="landing-page-nav">
      <div className="landing-page-nav-logo">
        <Link to="/" className="Logo">
          Logo
        </Link>
      </div>
      <div className="landing-page-nav-links">
        <Link to="/dashboard">Check Dashboard</Link>
        <Link to="/services">Services</Link>
        <Link to="/about">About us</Link>
      </div>
      <div>
        <Link
          to="/signup"
          className="landing-page-nav-btn btn btn-white"
          style={{ margin: 0 }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
