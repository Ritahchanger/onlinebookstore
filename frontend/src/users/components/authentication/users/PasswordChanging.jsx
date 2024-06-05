import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../authentication.css";

import { login } from "../../../Redux/features/authSlice";

import { useDispatch } from "react-redux";

const PasswordChanging = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email } = useParams();

  const [isValidEmailFormat, setIsValidEmailFormat] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmailFormat(emailRegex.test(email));

    if(!emailRegex.test(email) || email.length <=0) {
      navigate('/login')
    }

  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
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

    if (confirmPassword.length < 8) {
      newErrors.confirmPassword = "Password must be at least 8 characters long";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/change-password",
          {
            email: email,
            newPassword: formData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          setSubmitSuccess(true);

          if (response.data.success) {
            const getUser = await axios.get(
              `http://localhost:5000/api/users/userId/${response.data.userId}`
            );

            dispatch(login({ user: getUser.data.data }));

            navigate("/account");
          }

          console.log(response.data);
        } else {
          throw new Error("There was a problem with the request");
        }
      } catch (error) {
        console.error(
          `There was a problem accessing the server: ${error.message}`
        );
      }
    }
  };
  return (
    <div className="authentication">
      <div className="form-wrapper">
        <form className="login-form" onSubmit={handleSubmit}>
          <p className="form-title">PASSWORD RESET</p>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
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
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="input-group">
            <input type="submit" value="SEND" />
          </div>
          {submitSuccess && (
            <p className="success">
              Password reset successful! Redirecting to login...
            </p>
          )}
          <p>
            Remembered Password?..<Link to="/login">LOGIN</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default PasswordChanging;
