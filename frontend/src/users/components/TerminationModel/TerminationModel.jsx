import React from "react";
import "./TerminationModel.css";
const TerminationModel = () => {
  return (
    <div className="termination_page">
      <div className="terminate-account-modal">
        <form>
          <a href="#" className="close-modal">
            &times;
          </a>
          <p className="medium-header">ACCOUNT TERMINATION</p>
          <div className="input-group">
            <input
              type="email"
              name="email"
              id=""
              placeholder="Enter your email.."
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              id=""
              placeholder="Enter your password.."
            />
          </div>
          <div className="input-group">
            <input type="submit" value="REQUEST TERMINATION" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TerminationModel;
