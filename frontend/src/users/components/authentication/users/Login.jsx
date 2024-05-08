import React from "react";
import { Link } from "react-router-dom"; 
import "../authentication.css";
const Login = () => {
  return (
    <div className="authentication">
      <div className="form-wrapper">
        <form action="#" className="login-form">
        <p className="form-title">USER LOGIN</p>
          <div className="input-group">
            <input type="email" name="" placeholder="Enter email..." />
          </div>
          <div className="input-group">
            <input type="password" name="" placeholder="Enter password..." />
          </div>
          <p><Link to="#">Forgot password?</Link></p>
          <div className="input-group">
            <input type="submit" value="EMAIL" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
