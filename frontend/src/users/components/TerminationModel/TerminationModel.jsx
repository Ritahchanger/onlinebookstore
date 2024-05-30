import "./TerminationModel.css";

import { useDispatch, useSelector } from "react-redux";

import { clearTerminatingUser } from "../../Redux/features/AccountTerminationSlice";

import { useState } from "react";

const TerminationModel = ({ handleTerminationModel, terminationModel }) => {
  const [isTerminationRequest, sentTerminationRequest] = useState(false);

  const deleteAccount = () => {
    // API CALL

    sentTerminationRequest(true);
  };

  return (
    <div
      className={`terminate-account-modal ${
        terminationModel ? "active" : null
      }`}
    >
      <form>
        <a href="#" className="close-modal" onClick={handleTerminationModel}>
          &times;
        </a>

        {isTerminationRequest ? (
          <div>
            <p className="medium-header">
              TERMINATION REQUEST SENT WAIT FOR COMPANY'S APPROVAL
            </p>
          </div>
        ) : (
          <>
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
              <input type="submit" value="REQUEST TERMINATION" onClick={deleteAccount} />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default TerminationModel;
