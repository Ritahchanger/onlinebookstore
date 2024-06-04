import React, { useState } from "react";

const UpdateEmailInformation = () => {
  const [emails, setEmails] = useState({
    currentEmail: "",
    newEmail: ""
  });

  const [errors, setErrors] = useState({
    currentEmail: "",
    newEmail: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmails({
      ...emails,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emails.currentEmail && !emailRegex.test(emails.currentEmail)) {
      validationErrors.currentEmail = "Current email is in incorrect format.";
    }
    if (emails.newEmail && !emailRegex.test(emails.newEmail)) {
      validationErrors.newEmail = "New email is in incorrect format.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
    
      console.log("Email information updated:", emails);
    }
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <p className="medium-header">UPDATE EMAIL INFORMATION</p>
      <div className="input_group">
        <input
          type="email"
          name="currentEmail"
          placeholder="Enter your current email.."
          value={emails.currentEmail}
          onChange={handleChange}
        />
        {errors.currentEmail && <p className="error">{errors.currentEmail}</p>}
      </div>
      <div className="input_group">
        <input
          type="email"
          name="newEmail"
          placeholder="Enter your new email.."
          value={emails.newEmail}
          onChange={handleChange}
        />
        {errors.newEmail && <p className="error">{errors.newEmail}</p>}
      </div>
      <button className="cart-buttons" type="submit">
        UPDATE
      </button>
    </form>
  );
};

export default UpdateEmailInformation;
