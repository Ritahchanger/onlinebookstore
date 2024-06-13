import React from "react";
import axios from "axios";
import Config from "../../Config";
import Preloaders from "../../users/components/Preloaders/Preloaders";
import { useSelector, useDispatch } from "react-redux";
import {
  showLoading,
  hideLoading,
} from "../../users/Redux/features/alertSlice";

const DisapproveModal = ({
  workingBook,
  disapproveDisplayModal,
  fetchData,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.alerts.loading);

  if (!workingBook) {
    return null; // Return null or some placeholder if workingBook is null
  }

  const handleBookRejection = async () => {
    try {
      dispatch(showLoading()); // Show loading indicator
      const response = await axios.delete(
        `${Config.apiUrl}/api/books/delete/${workingBook._id}/user/${workingBook.author._id}`
      );

      if (!response.data.success) {
        throw new Error("There was an internal server error");
      }
      fetchData();
      console.log("Book rejected successfully:", response.data);
      // Optionally: Notify the user about successful rejection
      disapproveDisplayModal(); // Close the modal after rejection
    } catch (error) {
      console.error("Error rejecting book:", error.message);
      // Optionally: Notify the user about the error
    } finally {
      dispatch(hideLoading()); // Hide loading indicator regardless of success or error
    }
  };

  return (
    <div className="modal-dialog">
      <p className="medium-header">{`YOU WANT TO DISAPPROVE ${workingBook.title.toUpperCase()}`}</p>
      <button className="cart-buttons ok" onClick={handleBookRejection}>
        REJECT
      </button>
      <button className="cart-buttons cancel" onClick={disapproveDisplayModal}>
        CANCEL
      </button>
      {loading && <Preloaders />}{" "}
      {/* Show loading indicator if loading is true */}
    </div>
  );
};

export default DisapproveModal;
