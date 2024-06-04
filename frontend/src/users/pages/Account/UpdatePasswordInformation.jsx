import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdatePasswordInformation = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const user = useSelector((state) => state.auth.user);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [wrongCurrentPasswordError, setWrongCurrentPasswordError] = useState(false);

  const [successMessage,setSuccessMessage] = useState(false);

  const sendUpdateRequest = async (currentPassword, newPassword) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${user.user._id}/update/password`,
        {
          currentPassword: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        throw new Error("Internal server error");
      }
      if(response.data.passwordDontMatch){
        setWrongCurrentPasswordError(true)
      }

      if(response.data.success){
        setSuccessMessage(true)
      }
      

      console.log(response.data);
    } catch (error) {
      throw new Error(`There was an error sending data to the backend -> ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("All fields are required.");
    } else if (newPassword !== confirmNewPassword) {
      setPasswordError("New password and confirm password must match.");
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d).{6,}$/.test(newPassword)) {
      setPasswordError("Password must contain at least one letter and one digit.");
    } else {
      setPasswordError("");
      setWrongCurrentPasswordError(false); // Reset the wrongCurrentPasswordError state

      try {
        await sendUpdateRequest(currentPassword, newPassword);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleChange = (setState) => (e) => {
    setState(e.target.value);
    setPasswordError("");
    setWrongCurrentPasswordError(false)
    setWrongCurrentPasswordError(false); 
    setSuccessMessage(false)// Reset the wrongCurrentPasswordError state
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit} noValidate>
      <p className="medium-header">UPDATE PASSWORD</p>
      <div className="input_group">
        <input
          type="password"
          name="currentPassword"
          placeholder="Enter your current password.."
          value={currentPassword}
          onChange={handleChange(setCurrentPassword)}
        />
        {wrongCurrentPasswordError && <p className="error">You have entered the wrong current password.</p>}
      </div>
      <div className="input_group">
        <input
          type="password"
          name="newPassword"
          placeholder="Enter your new password.."
          value={newPassword}
          onChange={handleChange(setNewPassword)}
        />
      </div>
      <div className="input_group">
        <input
          type="password"
          name="confirmNewPassword"
          placeholder="Confirm your new password.."
          value={confirmNewPassword}
          onChange={handleChange(setConfirmNewPassword)}
        />
         {passwordError && <p className="error">{passwordError}</p>}
      </div>
     

      {successMessage && <p className="error"style={{color:"var(--green)"}}>Password successfully updated</p>}
      
      <button className="cart-buttons" type="submit">
        UPDATE
      </button>
    </form>
  );
};

export default UpdatePasswordInformation;
