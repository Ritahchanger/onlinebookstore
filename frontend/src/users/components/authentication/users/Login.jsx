import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../authentication.css";

import { login } from "../../../Redux/features/authSlice";

import { useDispatch } from "react-redux";

import axios from "axios";

const Login = () => {
  const dispatch = useDispatch();
  const [emailFound, setEmailFound] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  axios.defaults.withCredentials = true;

  const sentDataToDatabase = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        throw new Error("There was a problem with the server!");
      }
      const backendData = response.data;
      if (backendData.emailFound === false) {
        setEmailFound(false);
      } else {
        setEmailFound(true);
      }

      if (backendData.passwordFound === false) {
        setPasswordMatch(false);
      } else {
        setPasswordMatch(true);
      }

      if (backendData.success) {
        dispatch(login({ userId: backendData.userId }));
        navigate('/home')
       }
    } catch (error) {
      console.log(
        `The following error arised while sending data to the database: -> ${error.message} `
      );
    }
  };

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
      sentDataToDatabase();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
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

            {emailFound === false ? (
              <p className="error-message">Email not found</p>
            ) : null}
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
            {passwordMatch === false ? (
              <p className="error-message">Passwords don't match</p>
            ) : null}
          </div>
          <p className="forget-password">
            <Link to="/forgot-password">Forgot password?</Link>
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
