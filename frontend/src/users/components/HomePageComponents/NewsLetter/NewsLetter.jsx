import React, { useState } from "react";
import axios from "axios";
import "./NewsLetter.css";

import Config from "../../../../Config";
const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post(
        `${Config.apiUrl}/api/users/subscribe/newsletter`,
        { email }
      );
      console.log(response.data)
      if (response.status === 200) {
        setSuccessMessage(response.data.message);
        setEmail("");
      } // Clear the input field
    } catch (error) {
      setError("An error occurred while subscribing. Please try again.");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="newsletter">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="subscribe medium-header">
              Subscribe To Our Newsletter
            </p>
          </div>
          <div className="col">
            <p className="description">
              Stay updated with the latest releases, exclusive discounts, and
              exciting events from our online bookstore! Enter your email
              address below to subscribe.
            </p>
            <form onSubmit={handleSubmit} className="newsLetterForm">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
              <button type="submit">
                SEND
                <i className="fa-regular fa-envelope"></i>
              </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
