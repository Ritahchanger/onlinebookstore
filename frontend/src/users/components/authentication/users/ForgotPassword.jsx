import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../authentication.css";

import "./ForgotPassword.css";

import EmailSecurity from "../../../../assets/svgs/padlock.svg";

const ForgotPassword = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const isThisEmailValid = emailRegex.test(value);
    setButtonDisabled(!isThisEmailValid || value === "");
  };

  const handleSubmitButton = (event) => {
    event.preventDefault();
    console.log(email);
  };

  return (
    <div className="authentication">
      <div className="success-modal">
        <p className="success-message">Check email for password reset Link</p>
      </div>

      <div className="form-wrapper">
        <form
          action="#"
          className="login-form"
          onSubmit={handleSubmitButton}
          noValidate
        >
          <p className="form-title">Forgot Password</p>

          <div className="img-wrapper">
            <img src={EmailSecurity} alt="" />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <p className="email-controller"> {` ${buttonDisabled ? "Please input correct email" : ""} `} </p>
          <div className="input-group">
            <input
              type="submit"
              value="GET VERIFICATION CODE"
              disabled={buttonDisabled}
              className={`${
                buttonDisabled ? "button-deactivated" : "button-activated"
              }`}
            />
          </div>
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
