import React, { Fragment, useState } from "react";
import { Images } from "../../utils";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Fragment>
      <div className="common-page-main">
        <div className="common-page-form">
          <div>
            <h1 className="primary">Get Started Now</h1>
            <p className="primary">
              Enter your credential to access your account
            </p>
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
              Username
            </label>{" "}
            <br />
            <input
              type="text"
              placeholder="Enter Username"
              name="uname"
              required
            />
            <br />
            <label htmlFor="psw" className="primary">
              Password
            </label>
            <br />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              name="psw"
              required
            />
            {showPassword ? (
              <i
                className="fa-regular fa-eye-slash"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  marginLeft: "-30px",
                  cursor: "pointer",
                  color: "#979797",
                }}
              ></i>
            ) : (
              <i
                className="fa-regular fa-eye"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  marginLeft: "-30px",
                  cursor: "pointer",
                  color: "#979797",
                }}
              ></i>
            )}
            <Link
              to={'/auth/forgotpassword'}
              style={{ textAlign: "end", width: "100%", display: "block",fontWeight:"600" }}
            >
              Forgot Password?
            </Link>
            <button className="btn btn-primary">Login</button>
            <small style={{ textAlign: "center", display: "block" }}>
              Don't have an account? <Link to={'/signup'} className="weighted" >Sign Up</Link>
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

export default Login;
