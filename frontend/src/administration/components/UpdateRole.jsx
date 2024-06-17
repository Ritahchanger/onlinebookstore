import React, { useState } from "react";
import axios from "axios";
import Config from "../../Config";

import {
  showLoading,
  hideLoading,
} from "../../users/Redux/features/alertSlice";

import { useSelector, useDispatch } from "react-redux";

import Preloaders from "../../users/components/Preloaders/Preloaders";

const UpdateRole = ({ handleUpdateModal, userToUpdate, fetchData }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.alerts.loading);
  const [role, setRole] = useState("author");

  const handleAddUserRole = async (event) => {
    event.preventDefault();
    try {
      dispatch(showLoading()); // Dispatch showLoading action to display loading indicator
      const response = await axios.put(
        `${Config.apiUrl}/api/users/${userToUpdate._id}/update-role`,
        { role },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If the API response indicates failure, hide loading indicator

      await fetchData(); // Fetch updated data after successful operation
      dispatch(hideLoading());
      handleUpdateModal(); // Close the update modal/dialog
    } catch (error) {
      console.log(`Error updating user role: ${error.message}`);
      dispatch(hideLoading()); // Hide loading indicator in case of error
    }
  };

  const handleRemoveUserRole = async (event) => {
    event.preventDefault();
    try {
      dispatch(showLoading()); // Dispatch showLoading action to display loading indicator
      const response = await axios.put(
        `${Config.apiUrl}/api/users/${userToUpdate._id}/remove-role`,
        { role },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // If the API response indicates failure, hide loading indicator

      console.log("Role removed successfully:", response.data);
      await fetchData(); // Fetch updated data after successful operation
      dispatch(hideLoading());
      handleUpdateModal(); // Close the update modal/dialog
    } catch (error) {
      console.log(`Error removing user role: ${error.message}`);
      dispatch(hideLoading()); // Hide loading indicator in case of error
    }
  };

  return (
    <div className="modal-dialog">
      <p className="medium-header">{`UPDATE ${userToUpdate.firstName.toUpperCase()} ${userToUpdate.secondName.toUpperCase()}`}</p>
      <form onSubmit={handleAddUserRole}>
        <p className="medium-header">ADD ROLE</p>
        <div className="input-group">
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="author">AUTHOR</option>
            <option value="admin">ADMIN</option>
          </select>
          <div className="input-group">
            <input type="submit" value="UPDATE" className="submit-btn" />
          </div>
        </div>
      </form>

      <form onSubmit={handleRemoveUserRole}>
        <p className="medium-header">REMOVE ROLE</p>
        <select
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="author">AUTHOR</option>
          <option value="admin">ADMIN</option>
        </select>
        <div className="input-group">
          <input type="submit" value="REMOVE ROLE" className="submit-btn" />
        </div>
      </form>
      <button className="cart-buttons" onClick={handleUpdateModal}>
        CANCEL
      </button>

      {/* Conditionally render Preloaders component based on loading state */}
      {loading && <Preloaders />}
    </div>
  );
};

export default UpdateRole;
