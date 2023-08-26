import React, { Fragment } from "react";
import { Images } from "../../utils";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <Fragment>
      <div className="common-page-main">
        <div className="common-page-form">
          <div>
            <h1 className="primary">Get Started Now</h1>
            <p className="primary">Create your account now</p>
          </div>
          <div className="common-page-thirdparty-login">
            <button className="common-page-thirdparty-btn primary">
              <img src={Images.GoogleIcon} alt="Google" />
              <div>Login with Google</div>
            </button>
            <button className="common-page-thirdparty-btn primary">
              <img src={Images.AppleIcon} alt="Apple" />{" "}
              <div>Login with Apple</div>
            </button>
          </div>

          <div className="common-page-divider">
            <hr className="divder" />
            <span className="divider-text">or</span>
          </div>
          <div className="common-page-login">
            <label htmlFor="uname" className="primary">
              Name
            </label>{" "}
            <br />
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
            />
            <br />
            <label htmlFor="email" className="primary">
              Email
            </label>{" "}
            <br />
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              required
            />
            <br />
            <label htmlFor="psw" className="primary">
              Password
            </label>
            <br />
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
            />
            <br />
            <label htmlFor="cpsw" className="primary">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              name="cpsw"
              required
            />
            <button className="btn btn-primary">Sign Up</button>
            <small style={{ textAlign: "center", display: "block" }}>
              Have an account?{" "}
              <Link to={"/login"} className="weighted">
                Login
              </Link>
            </small>
          </div>
        </div>
        <div className="common-page-image">
          <img src={Images.CommonPages_image} alt="Australia" />
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;
