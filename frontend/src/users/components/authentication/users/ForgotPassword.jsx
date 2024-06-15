import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Preloaders from "../../Preloaders/Preloaders";
import EmailSecurity from "../../../../assets/svgs/padlock.svg";
import { showLoading, hideLoading } from "../../../Redux/features/alertSlice";
import "../authentication.css";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.alerts.loading);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);
  const [sending, setSending] = useState(false);
  const [checkLink, setCheckLink] = useState(false);

  // Function to handle email input changes
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
    const isThisEmailValid = emailRegex.test(value);
    setEmailIsValid(isThisEmailValid);
    setButtonDisabled(!isThisEmailValid || value === "");
    setEmailNotFound(false);
    setCheckLink(false);
  };

  // Function to handle form submission
  const handleSubmitButton = async (event) => {
    event.preventDefault();

    dispatch(showLoading());
    setSending(true);
    setButtonDisabled(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status !== 200) {
        throw new Error("There was a problem with the server internally");
      }

      if (response.data.success) {
        setCheckLink(true);
      }

      if (response.data.status === 404) {
        setEmailNotFound(true);
      } else {
        setEmailNotFound(false);
      }
    } catch (error) {
      console.log("Internal server error");
    } finally {
      dispatch(hideLoading());
      setSending(false);
      setButtonDisabled(false);
    }
  };

  return (
    <div className="authentication">
      {checkLink && (
        <div className="success-modal">
          <p className="success-message">
            Check your emailbox for password reset Link
          </p>
        </div>
      )}

      <div className="form-wrapper">
        <form
          action="#"
          className="login-form"
          onSubmit={handleSubmitButton}
          noValidate
        >
          <p className="form-title">Forgot Password</p>

          <div className="img-wrapper">
            <img src={EmailSecurity} alt="" />
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          {!emailIsValid && (
            <p className="email-controller">Please input correct email</p>
          )}

          <p className="email-controller">
            {emailNotFound ? "Email not found" : ""}
          </p>

          <div className="input-group">
            <input
              type="submit"
              value={checkLink ? "CODE SENT..." : "GET VERIFICATION CODE"}
              disabled={buttonDisabled || sending}
              className={`${
                buttonDisabled ? "button-deactivated" : "button-activated"
              }`}
            />
          </div>

          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>

      {loading && <Preloaders />}
    </div>
  );
};

export default ForgotPassword;
