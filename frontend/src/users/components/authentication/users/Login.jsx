import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../authentication.css";

import { login } from "../../../Redux/features/authSlice";

import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import Config from "../../../../Config";

import leftIcon from "../../../../assets/icons/left-arrow.png";

const Login = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

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

  const accountTerminationRequest = useSelector(
    (state) => state.accountTermination.accountTerminationRequest
  );

  const sentDataToDatabase = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${Config.apiUrl}/api/auth/login`,
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

      console.log(response.data);

      if (response.status !== 200) {
        setLoading(false);
        throw new Error("There was a problem with the server!");
      }
      const backendData = response.data;
      if (backendData.emailFound === false) {
        setEmailFound(false);
        setLoading(false);
      } else {
        setEmailFound(true);
      }

      if (backendData.passwordFound === false) {
        setPasswordMatch(false);
        setLoading(false);
      } else {
        setPasswordMatch(true);
      }

      if (backendData.success) {
        if (accountTerminationRequest) {
          navigate("/account");
        } else {
          const getUser = await axios.get(
            `${Config.apiUrl}/api/users/userId/${backendData.userId}`
          );

          dispatch(login({ user: getUser.data.data }));

          navigate("/account");
        }
      }
      setLoading(false);
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
      <Link to="/" className="left-arrow">
        <img src={leftIcon} alt="" />
      </Link>
      <div className="form-wrapper">
        <form
          action="#"
          className="login-form"
          onSubmit={handleSubmit}
          noValidate
        >
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
            <input type="submit" value={`${loading ? "LOGGING.." : "LOGIN"}`} />
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
