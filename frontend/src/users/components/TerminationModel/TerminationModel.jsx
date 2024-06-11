import "./TerminationModel.css";
import { useState } from "react";
import axios from "axios";
import Config from "../../../Config";
import { useSelector } from "react-redux"; 

const TerminationModel = ({ handleTerminationModel, terminationModel }) => {

  const user = useSelector((state)=>state.auth.user)

  const [isTerminationRequest, setIsTerminationRequest] = useState(false);
  const [reasonForTermination, setReasonForTermination] = useState("");

  const deleteAccount = async () => {
    try {
      const response = await axios.post(
        `${Config.apiUrl}/api/users/add/termination/account`,
        {
          user:user.user._id,
          reason: reasonForTermination,
        }
      );
      setIsTerminationRequest(true);
    } catch (error) {
      console.error("Error sending termination request:", error);
    }
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
                value={reasonForTermination}
                onChange={(e) => setReasonForTermination(e.target.value)}
                cols="30"
                rows="10"
                placeholder="Enter reason for account termination (Optional)..."
              ></textarea>
            </div>
            <button
              type="button" 
              className="cart-buttons"
              onClick={deleteAccount} 
            >
              PROCEED TO TERMINATION
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default TerminationModel;
