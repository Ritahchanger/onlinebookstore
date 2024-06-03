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
            <div className="input_group">
              <textarea
                name="reasonForTermination"
                id=""
                cols="30"
                rows="10"
                placeholder="Enter reason for account termination(Optional)..."
              ></textarea>
            </div>
            <button type="submit" className="cart-buttons">PROCEED TO TERMINATION</button>
          </>
        )}
      </form>
    </div>
  );
};

export default TerminationModel;
