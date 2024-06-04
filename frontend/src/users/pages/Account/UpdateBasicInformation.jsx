import React, { useState } from "react";

const UpdateBasicInformation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: ""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    secondName: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
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

    // Validate only if the field has been filled out
    if (formData.firstName && !/^[a-zA-Z]+$/.test(formData.firstName)) {
      validationErrors.firstName = "First name can only contain letters.";
    }
    if (formData.secondName && !/^[a-zA-Z]+$/.test(formData.secondName)) {
      validationErrors.secondName = "Second name can only contain letters.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Perform the update action here
      console.log("Form submitted:", formData);
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
    </form>
  );
};

export default UpdateBasicInformation;
