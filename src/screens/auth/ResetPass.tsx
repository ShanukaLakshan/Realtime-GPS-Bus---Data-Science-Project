import React, { Fragment } from "react";
import { Images } from "../../utils";
import { Link } from "react-router-dom";

const ResetPass = () => {
  return (
    <Fragment>
      <div className="common-page-main">
        <div className="common-page-form center">
          <div style={{ marginBottom: "40px" }}>
            <h1 className="primary">Set New Passwod</h1>
            <p className="primary">Must be at least 8 characters.</p>
          </div>
          <div className="common-page-login">
            <label htmlFor="pass" className="primary">
              Password
            </label>{" "}
            <br />
            <input type="password" name="pass" required />
            <br />
            <label htmlFor="pass2" className="primary">
              Confirm Password
            </label>{" "}
            <br />
            <input type="password" name="pass2" required />
            {/* <button className="btn btn-primary">Reset Password</button> */}
            <Link to={"/"}>
              <button className="btn btn-primary">Reset Password</button>
            </Link>
            <Link
              to={"/login"}
              style={{ display: "block", textAlign: "center" }}
            >
              <small>
                <i className="fa-solid fa-arrow-left"></i> Back to login
              </small>
            </Link>
          </div>
        </div>
        <div className="common-page-image">
          <img src={Images.CommonPages_image} alt="Australia" />
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPass;
