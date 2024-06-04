import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateEmailInformation = () => {
  const user = useSelector((state) => state.auth.user);

  const [emails, setEmails] = useState({
    currentEmail: "",
    newEmail: ""
  });

  const [errors, setErrors] = useState({
    currentEmail: "",
    newEmail: ""
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmails({
      ...emails,
      [name]: value.trim()
    });
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const validateForm = () => {
    const validationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emails.currentEmail && !emailRegex.test(emails.currentEmail)) {
      validationErrors.currentEmail = "Current email is in incorrect format.";
    }
    if (emails.newEmail && !emailRegex.test(emails.newEmail)) {
      validationErrors.newEmail = "New email is in incorrect format.";
    }

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.patch(
          `http://localhost:5000/api/users/${user._id}/update/email`,
          {
            currentEmail: emails.currentEmail,
            newEmail: emails.newEmail
          }
        );

        if (response.data.success) {
          setSubmitSuccess(true);
          setErrors({
            currentEmail: "",
            newEmail: ""
          });
        } else {
          setErrors({
            currentEmail: response.data.message,
            newEmail: response.data.message
          });
        }
      } catch (error) {
        console.error("There was an error updating the email information:", error);
        setErrors({
          currentEmail: "There was an error updating the information.",
          newEmail: "There was an error updating the information."
        });
      }
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
      {submitSuccess && <p className="success">Email information updated successfully!</p>}
    </form>
  );
};

export default UpdateEmailInformation;
