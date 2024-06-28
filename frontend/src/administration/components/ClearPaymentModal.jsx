import React from "react";
import CloseIcon from "../../assets/icons/close.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Config from "../../Config";
import Preloaders from "../../users/components/Preloaders/Preloaders";
import {
  showLoading,
  hideLoading,
} from "../../users/Redux/features/alertSlice";

const ClearPaymentModal = ({
  handlePaymentModal,
  fetchData,
  withdrawTodelete,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.alerts.loading);

  const deleteWithDrawalAccount = async () => {
    try {
      dispatch(showLoading());
      await axios.delete(
        `${Config.apiUrl}/api/withdrawal/delete/${withdrawTodelete._id}`
      );
      dispatch(hideLoading());
      if (fetchData) {
        fetchData(); // Optionally fetch new data after successful deletion
      }
      handlePaymentModal(); // Close the modal after successful deletion
    } catch (error) {
      dispatch(hideLoading());
      console.log(`There was an error accessing the backend: ${error.message}`);
      // Optionally handle specific errors here
    }
  };

  if (!withdrawTodelete) {
    return null; // Render nothing if withdrawTodelete is null or undefined
  }

  return (
    <div className="modal-dialog">
      <p className="medium-header">{`Clear ${withdrawTodelete.user.firstName} ${withdrawTodelete.user.secondName} sh ${withdrawTodelete.amount}`}</p>
      <div className="close-modal" onClick={handlePaymentModal}>
        <img src={CloseIcon} alt="Close" />
      </div>
      <div className="input-group" style={{ marginTop: "2rem" }}>
        <input
          type="submit"
          value="CLEAR PAYMENT"
          className="submit-btn"
          onClick={deleteWithDrawalAccount}
          disabled={loading} // Disable button while loading
        />
      </div>
      {loading && <Preloaders />}
    </div>
  );
};

export default ClearPaymentModal;
