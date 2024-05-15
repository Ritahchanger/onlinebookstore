import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../authentication.css";

const PasswordChanging = () => {
  return (
    <div className="authentication">
      <div className="form-wrapper">
        <form action="#" className="login-form">
          <p className="form-title">PASSWORD RESET</p>
          <div className="input-group">
            <input
              type="password"
              name="email"
              placeholder="Enter password"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Confirm password"
            />
          </div>
          <div className="input-group">
            <input type="submit" value="SENT" />
          </div>
          <p>
            Remembered Password?..<Link to="/login">LOGIN</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PasswordChanging;
