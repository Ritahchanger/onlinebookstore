import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../authentication.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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

    if (!formData.password.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        passwordError: "Password is required",
      }));
      valid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, passwordError: "" }));
    }

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
          <p className="form-title">USER LOGIN</p>
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
          <p className="forget-password">
            <Link to="#">Forgot password?</Link>
          </p>
          <div className="input-group">
            <input type="submit" value="LOGIN" />
          </div>
          <p>
            Don't have an account?<Link to="/signup">SignUp</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
