import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../authentication.css";

const PasswordChanging = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: ""
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error-message message when user starts typing
    setErrors({
      ...errors,
      [name]: ""
    });
  };

  const validateForm = () => {
    const { password, confirmPassword } = formData;
    const newErrors = {};

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    }

    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      newErrors.password = "Password must contain both letters and digits";
    }
    if (confirmPassword.length < 8 ) {
      newErrors.confirmPassword = "Password must be at least 8 characters long";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      // Submit form data to the backend
      // Example: axios.post('/api/reset-password', formData)
      setSubmitSuccess(true);
    }
  };

  return (
    <div className="authentication">
      <div className="form-wrapper">
        <form action="#" className="login-form" onSubmit={handleSubmit}>
          <p className="form-title">PASSWORD RESET</p>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="error-message">{errors.password}</p>}
          </div>
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
          </div>
          <div className="input-group">
            <input type="submit" value="SENT" />
          </div>
          {submitSuccess && <p className="success">Password reset successful!</p>}
          <p>
            Remembered Password?..<Link to="/login">LOGIN</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PasswordChanging;
