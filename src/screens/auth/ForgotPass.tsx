import React, { Fragment } from "react";
import { Images } from "../../utils";
import { Link } from "react-router-dom";

const ForgotPass = () => {
  return (
    <Fragment>
      <div className="common-page-main">
        <div className="common-page-form center">
          <div style={{ marginBottom: "40px" }}>
            <h1 className="primary">Forgot Password?</h1>
            <p className="primary">
              No worries,we'll send you reset instructions
            </p>
          </div>
          <div className="common-page-login">
            <label htmlFor="email" className="primary">
              Email
            </label>{" "}
            <br />
            <input type="text" name="email" required />
            <Link to={"/auth/otp"}>
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

export default ForgotPass;
