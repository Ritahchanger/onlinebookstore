import React, { useState } from "react";
import "./UpdateProfileInformation.css";

const UpdateUserProfile = ({ displayUpdateInformationModal }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    phone: "",
    username: "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear previous error for this field
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    // Validate each field
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }
    if (
      formData.oldPassword ||
      formData.newPassword ||
      formData.confirmPassword
    ) {
      if (!formData.oldPassword) {
        newErrors.oldPassword = "Please enter your old password";
      }
      if (!formData.newPassword) {
        newErrors.newPassword = "Please enter a new password";
      } else if (!validatePassword(formData.newPassword)) {
        newErrors.newPassword =
          "Password must be at least 8 characters long and contain both letters and numbers";
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your new password";
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    // Check other fields and set errors as needed
    // ...
    setErrors(newErrors);
    // If there are no errors, submit the form
    if (Object.keys(newErrors).length === 0) {
      // Submit form data to backend
      // Pass formData to parent component
    }
  };

  return (
    <form action="#" className="form_container" onSubmit={handleSubmit} >
      <p className="close_icon" onClick={displayUpdateInformationModal}>
        &times;
      </p>

      <p className="medium-header">
        Enter the fields that you want to change or Update
      </p>

      <div className="input_group">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          id="firstName"
          placeholder="Firstname.."
        />
        {errors.firstName && <span className="error">{errors.firstName}</span>}
      </div>
      <div className="input_group">
        <input
          type="text"
          name="secondName"
          value={formData.secondName}
          onChange={handleChange}
          id="secondName"
          placeholder="Secondname.."
        />
        {errors.secondName && (
          <span className="error">{errors.secondName}</span>
        )}
      </div>
      <div className="input_group">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          id="email"
          placeholder="Email.."
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div className="input_group">
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          id="phone"
          placeholder="Phone(07,,,).."
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>
      <div className="input_group">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          id="username"
          placeholder="Username.."
        />
        {errors.username && <span className="error">{errors.username}</span>}
      </div>
      <p className="medium-header">Do you want to change the passwords?</p>
      <div className="input_group">
        <input
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          id="oldPassword"
          placeholder="Enter old password.."
        />
        {errors.oldPassword && (
          <span className="error">{errors.oldPassword}</span>
        )}
      </div>
      <div className="input_group">
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          id="newPassword"
          placeholder="Enter new password.."
        />
        {errors.newPassword && (
          <span className="error">{errors.newPassword}</span>
        )}
      </div>
      <div className="input_group">
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          id="confirmPassword"
          placeholder="Confirm Password new password.."
        />
        {errors.confirmPassword && (
          <span className="error">{errors.confirmPassword}</span>
        )}
      </div>
      <div className="input_group">
        <button type="submit" className="cart-buttons">
          UPDATE INFORMATION
        </button>
      </div>
    </form>
  );
};

export default UpdateUserProfile;
