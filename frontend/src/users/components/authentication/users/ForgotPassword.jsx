import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../authentication.css";

import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [buttonDisabled, setButtonDisabled] = useState(true); 

  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    setButtonDisabled(!value); 
  };

  const handleSubmitButton = () => {
   
  };

  return (
    <div className="authentication">
      <div className="success-modal">
        <p className="success-message">Check email for password reset Link</p>
      </div>

      <div className="form-wrapper">
        <form action="#" className="login-form" onSubmit={handleSubmitButton}>
          <p className="form-title">Forgot Password</p>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange} 
            />
          </div>
          <div className="input-group">
            <input type="submit" value="GET VERIFICATION CODE" disabled={buttonDisabled} />
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
