import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../authentication.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Username validation
    if (!formData.username.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        usernameError: "Username is required",
      }));
      valid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, usernameError: "" }));
    }

    // Email validation
    if (!formData.email.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        emailError: "Email is required",
      }));
      valid = false;
    } else if (!emailRegex.test(formData.email)) {
      setErrors((prevState) => ({
        ...prevState,
        emailError: "Invalid email format",
      }));
      valid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, emailError: "" }));
    }
    // Password validation
    if (!formData.password.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        passwordError: "Password is required",
      }));
      valid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, passwordError: "" }));
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevState) => ({
        ...prevState,
        confirmPasswordError: "Passwords do not match",
      }));
      valid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, confirmPasswordError: "" }));
    }

    // If form is valid, submit the form data
    if (valid) {
      console.log("Form submitted:", formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Clear the error message for the changed input field
    setErrors((prevState) => ({
      ...prevState,
      [`${name}Error`]: "",
    }));
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="authentication">
      <div className="form-wrapper">
        <form action="#" className="login-form" onSubmit={handleSubmit}>
          <p className="form-title">USER SIGNUP</p>
          <div className="input-group">
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
            />
            {errors.usernameError && (
              <p className="error-message">{errors.usernameError}</p>
            )}
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.emailError && (
              <p className="error-message">{errors.emailError}</p>
            )}
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.passwordError && (
              <p className="error-message">{errors.passwordError}</p>
            )}
          </div>
          <div className="input-group">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPasswordError && (
              <p className="error-message">{errors.confirmPasswordError}</p>
            )}
          </div>
          <div className="input-group">
            <input type="submit" value="SIGNUP" />
          </div>
          <p>
            Have an account?<Link to="/login  ">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
