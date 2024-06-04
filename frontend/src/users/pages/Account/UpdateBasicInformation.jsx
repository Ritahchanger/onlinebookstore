import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdateBasicInformation = () => {
  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    firstName: "",
    secondName: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    secondName: ""
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value.trim()
    });
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const validateForm = () => {
    const validationErrors = {};
    const namePattern = /^[a-zA-Z]+$/;

    if (formData.firstName && !namePattern.test(formData.firstName)) {
      validationErrors.firstName = "First name can only contain letters.";
    }
    if (formData.secondName && !namePattern.test(formData.secondName)) {
      validationErrors.secondName = "Second name can only contain letters.";
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
          `http://localhost:5000/api/users/${user.user._id}/update/names`,
          {
            firstName: formData.firstName,
            secondName: formData.secondName
          }
        );

        if (response.data.success) {
          setSubmitSuccess(true);
        } else {
          setErrors({
            firstName: response.data.message,
            secondName: response.data.message
          });
        }
      } catch (error) {
        console.error("There was an error updating the user information:", error);
        setErrors({
          firstName: "There was an error updating the information.",
          secondName: "There was an error updating the information."
        });
      }
    }
  };

  return (
    <form className="edit-form" onSubmit={handleSubmit}>
      <p className="medium-header">UPDATE BASIC INFORMATION</p>
      <div className="input_group">
        <input
          type="text"
          name="firstName"
          placeholder="First Name.."
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}
      </div>
      <div className="input_group">
        <input
          type="text"
          name="secondName"
          placeholder="Second Name.."
          value={formData.secondName}
          onChange={handleChange}
        />
        {errors.secondName && <p className="error">{errors.secondName}</p>}
      </div>
      <button className="cart-buttons" type="submit">
        UPDATE
      </button>
      {submitSuccess && <p className="success">Information updated successfully!</p>}
    </form>
  );
};

export default UpdateBasicInformation;
