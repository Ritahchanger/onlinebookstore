import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../authentication.css";
import Config from "../../../../Config";
import { login } from "../../../Redux/features/authSlice";
import { useDispatch } from "react-redux";

const PasswordChanging = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [message, setMessage] = useState(null);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

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
    setServerError("");
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
          `${Config.apiUrl}/api/auth/change-password`,
          {
            token, // Corrected payload to use token
            newPassword: formData.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.success) {
          setSubmitSuccess(true);

          if (response.data.success) {
            const getUser = await axios.get(
              `${Config.apiUrl}/api/users/userId/${response.data.userId}`
            );

            dispatch(login({ user: getUser.data.data }));

            setTimeout(() => {
              navigate("/account");
            }, 2000);
          }
        } else {
          console.log(response.data);
          setServerError(response.data.message);
        }
      } catch (error) {
        setServerError(
          error.response?.data?.message ||
            "There was a problem accessing the server"
        );
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
          {serverError && <p className="success" style={{color:"var(--pinkRed)"}}>{serverError}</p>}
          {submitSuccess && (
            <p className="success">
              Password reset successful! Redirecting to account...
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
