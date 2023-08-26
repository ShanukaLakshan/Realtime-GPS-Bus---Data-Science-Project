import React, { Fragment } from "react";
import NavBar from "./components/NavBar";
import { Images } from "../utils";

const LandingPage = () => {
  return (
    <Fragment>
      <div className="landing-page-main">
        <NavBar />
        <svg
          id="triangle"
          viewBox="0 0 1054 1117"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 1318L765.588 0H1088.09V1318H0Z" fill="#1F578A" />
        </svg>
        <img
          src={Images.LandingPage_Town}
          alt="Australian town"
          className="landing-page-image"
        />
        <div className="landing-page-hero">
          <div className="landing-page-hero-text">
            <h2>Sample Topic</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipiscing</p>
            <button className="btn btn-primary contact-us-btn">
              <div className="landing-page-hero-button-content">
                <div>Contact us</div>
                <div>
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </div>
            </button>
          </div>
          <div className="landing-page-hero-image">
            <img src={Images.LandingPage_aussie} alt="image of Australia" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LandingPage;
