import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateContactInformation = () => {
  const user = useSelector((state) => state.auth.user);
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneError, setPhoneError] = useState("");

 const [successMessage,setSuccessMessage] = useState(false);

  const sendData = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${user.user._id}/update/phoneNo`,
        {
          phoneNo: phoneNo,
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

      setSuccessMessage(true)


      console.log(response.data);
    } catch (error) {
      console.log(
        `There was an error sending data to the backend ->${error.message}`
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phoneNo) {
      setPhoneError("Phone number is required.");
    } else if (!/^\d{10}$/.test(phoneNo)) {
      setPhoneError("Phone number must be exactly 10 digits.");
    } else {
      setPhoneError("");
      sendData();
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setPhoneNo(value);
    setPhoneError("");
    setSuccessMessage(false)
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <p className="medium-header">UPDATE CONTACT INFORMATION</p>
      <div className="input_group">
        <input
          type="text"
          name="phoneNo"
          placeholder="Phone Number"
          value={phoneNo}
          onChange={handleChange}
        />
        {phoneError && <p className="error">{phoneError}</p>}
        {successMessage && <p className="error"style={{color:"var(--green)"}}>Phone No Uploaded Successfully</p>}
      </div>
      <button className="cart-buttons" type="submit">
        UPDATE
      </button>
    </form>
  );
};

export default UpdateContactInformation;
