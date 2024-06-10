import React, { useState } from "react";
import "./NewsLetter.css";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    // Perform submission logic here (e.g., sending email to the server)
    // After successful submission:
    setSuccessMessage("Thank you for subscribing!");
    setEmail(""); // Clear the input field
  };

  const validateEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="newsletter">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="subscribe medium-header">Subscribe To Our Newsletter</p>
          </div>
          <div className="col">
            <p className="description">
              Stay updated with the latest releases, exclusive discounts, and exciting events from our online bookstore! Enter your email address below to subscribe.
            </p>
            <form onSubmit={handleSubmit} className="newsLetterForm">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) =>{
                  setEmail(e.target.value)
                  setError("");
                }}
              />
              <button type="submit">
                SEND
                <i className="fa-regular fa-envelope"></i>
              </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
