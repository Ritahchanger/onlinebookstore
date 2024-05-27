import React from "react";
import "./TerminationModel.css";
const TerminationModel = ({handleTerminationModel,terminationModel}) => {
  return (
   
      <div className={`terminate-account-modal ${terminationModel ? "active" : null }`} >
        <form>
          <a href="#" className="close-modal" onClick={handleTerminationModel}>
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
  );
};

export default TerminationModel;
