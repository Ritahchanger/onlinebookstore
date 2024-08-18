import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../authentication.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Config from "../../../../Config";
import { showLoading, hideLoading } from "../../../Redux/features/alertSlice";
import Preloaders from "../../Preloaders/Preloaders";

const SignUp = () => {
  const loading = useSelector((state) => state.alerts.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    secondName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    firstNameError: "",
    secondNameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
  });

  const [usernameFound, setUsernameFound] = useState(false);
  const [emailFound, setEmailFound] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validation for each field
    if (!formData.firstName.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        firstNameError: "Firstname is required",
      }));
      valid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, firstNameError: "" }));
    }

    if (!formData.secondName.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        secondNameError: "Secondname is required",
      }));
      valid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, secondNameError: "" }));
    }

    if (!formData.username.trim()) {
      setErrors((prevState) => ({
        ...prevState,
        usernameError: "Username is required",
      }));
      valid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, usernameError: "" }));
    }

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
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/.test(formData.password)
    ) {
      setErrors((prevState) => ({
        ...prevState,
        passwordError: "Use strong password",
      }));
      valid = false;
    } else {
      setErrors((prevState) => ({ ...prevState, passwordError: "" }));
    }

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
      try {
        dispatch(showLoading());

        // API call to register user
        const response = await axios.post(
          `${Config.apiUrl}/api/auth/signup`,
          {
            firstName: formData.firstName,
            secondName: formData.secondName,
            username: formData.username,
            email: formData.email,
            password: formData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.data);
        if (response.status !== 200) {
          throw new Error("There is a problem with the server!");
        }

        // Validate email
        // await axios.post(
        //   `${Config.apiUrl}/api/auth/validate_email`,
        //   {
        //     email: formData.email,
        //   },
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );

        const backendResult = response.data;
        console.log(backendResult);

        dispatch(hideLoading());

        if (backendResult.usernameFound) {
          setUsernameFound(true);
        } else {
          setUsernameFound(false);
        }

        if (backendResult.emailFound) {
          setEmailFound(true);
        } else {
          setEmailFound(false);
        }

        if (!backendResult.usernameFound && !backendResult.emailFound) {
          navigate("/login");
        }
      } catch (error) {
        console.log(
          `Error occurred while sending data to the database: ${error.message}`
        );
        dispatch(hideLoading());
      }
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
              name="firstName"
              placeholder="Enter firstname"
              value={formData.firstName}
              onChange={handleChange}
            />
            {errors.firstNameError && (
              <p className="error-message">{errors.firstNameError}</p>
            )}
          </div>
          <div className="input-group">
            <input
              type="text"
              name="secondName"
              placeholder="Enter secondname"
              value={formData.secondName}
              onChange={handleChange}
            />
            {errors.secondNameError && (
              <p className="error-message">{errors.secondNameError}</p>
            )}
          </div>
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
            {usernameFound && (
              <p className="error-message">Username already used!</p>
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
            {emailFound && <p className="error-message">Email is used!</p>}
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
            <input
              type="submit"
              value={`${loading ? "REGISTERING..." : "SIGNUP"}`}
              disabled={loading}
            />
          </div>
          <p>
            Have an account?<Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      {loading && <Preloaders />}
    </div>
  );
};

export default SignUp;
