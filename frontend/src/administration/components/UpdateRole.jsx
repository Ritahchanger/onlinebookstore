import React, { useState } from "react";
import axios from "axios";
import Config from "../../Config";

const UpdateRole = ({ handleUpdateModal, userToUpdate, fetchData }) => {
  const [role, setRole] = useState("author");

  const handleAddUserRole = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${Config.apiUrl}/api/users/${userToUpdate._id}/update-role`,
        { role },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      fetchData();
      handleUpdateModal();
    } catch (error) {
      console.log(
        `There was an error updating the user role => ${error.message}`
      );
    }
  };

  const handleRemoveUserRole = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `${Config.apiUrl}/api/users/${userToUpdate._id}/remove-role`,
        { role },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Role removed successfully:", response.data);
      fetchData();
      handleUpdateModal();
    } catch (error) {
      console.log(
        `There was an error removing the user role => ${error.message}`
      );
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
    </div>
  );
};

export default UpdateRole;
