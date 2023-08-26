import React, { Fragment, useRef, createRef, useState } from "react";
import { Images } from "../../utils";
import { Link } from "react-router-dom";

const EnterOtp = () => {
  const inputs = Array.from({ length: 4 }, () => createRef<HTMLInputElement>());
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtp([...otp.map((d, idx) => (idx === index ? event.target.value : d))]);
    const value = event.target.value;
    if (value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].current!.focus();
    }
    if (value.length === 0 && index > 0) {
      inputs[index - 1].current!.focus();
    }
  };
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = event.clipboardData.getData("text");
    const codeChars = pastedText.split("").filter((char) => /\d/.test(char));
    setOtp([codeChars[0], codeChars[1], codeChars[2], codeChars[3]]);
    inputs[3].current!.focus();
  };

  return (
    <Fragment>
      <div className="common-page-main">
        <div className="common-page-form center">
          <div style={{ marginBottom: "40px" }}>
            <h1 className="primary">Password Reset</h1>
            <p className="primary">
              We sent a code to <b>sampleuser@email.com</b>
            </p>
          </div>
          <div className="common-page-login">
            <div className="common-page-otp">
              {inputs.map((inputRef, index) => (
                <input
                  key={index}
                  className="input"
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[index]}
                  ref={inputRef}
                  onChange={(e) => handleInputChange(index, e)}
                  onPaste={handlePaste}
                />
              ))}
            </div>

            <Link
              to={"/auth/resetpassword"}
              style={{ display: "block", textAlign: "center" }}
            >
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

export default EnterOtp;
