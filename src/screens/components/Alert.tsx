import React from "react";

const Alert = () => {
  return (
    <div className="alert">
      <i className="fa-solid fa-square-xmark fa-2x danger"></i>{" "}
      <p>
        <b>Invalid Credentials</b>
      </p>
    </div>
  );
};

export default Alert;
