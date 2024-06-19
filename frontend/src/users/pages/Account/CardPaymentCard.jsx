import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../../../Config";

const CardPaymentCard = ({
  user,
  updateEmail,
  mpesaNumber,
  paypalEmail,
  updatePhoneNo,
  emailErrorMessage,
  emailSuccessMessage,
  phoneNoErrorMessage,
  phoneNoSuccessMessage,
  userDetails = {}, // Default to an empty object
  setWithdrawalAccount,
  userInformation = {}, // Default to an empty object
  setMpesaNumber,
  setPhoneNoErrorMessage,
  setPhoneNoSuccessMessage,
  setPaypalEmail,
  setEmailErrorMessage,
  loading,
  setEmailSuccessMessage,
}) => {
  // useEffect(() => {
  //   if (user?._id) {
  //     setWithdrawalAccount();
  //   }
  // }, [user?._id, setWithdrawalAccount]);

  return (
    <div className="card">
      <div className="medium-header">DETAILS</div>

      {userDetails?.mpesaNumber ? (
        <div className="detail">
          <p>Phone No</p>
          <p>{userDetails.mpesaNumber}</p>
        </div>
      ) : (
        <>
          {userInformation?.phoneNo ? (
            <div className="detail">
              <p>Phone No</p>
              <p>{userInformation.phoneNo}</p>
            </div>
          ) : (
            <p>NO PHONE NO KINDLY UPDATE</p>
          )}
        </>
      )}

      {userDetails?.paypalEmail ? (
        <div className="detail">
          <p>Email</p>
          <p>{userDetails.paypalEmail}</p>
        </div>
      ) : (
        <>
          {userInformation?.email ? (
            <div className="detail">
              <p>Email</p>
              <p>{userInformation.email}</p>
            </div>
          ) : (
            <p>NO EMAIL KINDLY UPDATE</p>
          )}
        </>
      )}

      <p className="medium-header">UPDATE PAYMENT DETAILS</p>
      <form onSubmit={updatePhoneNo} className="input-group">
        <input
          type="text"
          name="mpesanumber"
          placeholder="Enter M-Pesa number.."
          value={mpesaNumber}
          onChange={(e) => {
            setMpesaNumber(e.target.value);
            setPhoneNoErrorMessage("");
            setPhoneNoSuccessMessage("");
          }}
          required
        />
        <input type="submit" value="UPDATE " />
      </form>
      {phoneNoErrorMessage && (
        <p
          className="success-message"
          style={{
            textAlign: "start",
            fontSize: "12px",
            color: "var(--pinkRed)",
          }}
        >
          {phoneNoErrorMessage}
        </p>
      )}
      {phoneNoSuccessMessage && (
        <p
          className="success-message"
          style={{ textAlign: "start", fontSize: "12px" }}
        >
          {phoneNoSuccessMessage}
        </p>
      )}
      <form onSubmit={updateEmail} className="input-group">
        <input
          type="email"
          name="paypalEmail"
          placeholder="Enter PayPal email.."
          value={paypalEmail}
          onChange={(e) => {
            setPaypalEmail(e.target.value);
            setEmailErrorMessage("");
            setEmailSuccessMessage("");
          }}
          required
        />
        <input type="submit" value="UPDATE " />
      </form>
      {emailSuccessMessage && (
        <p
          className="success-message"
          style={{ textAlign: "start", fontSize: "12px" }}
        >
          {emailSuccessMessage}
        </p>
      )}
      {emailErrorMessage && (
        <p
          className="success-message"
          style={{
            color: "var(--pinkRed)",
            textAlign: "start",
            fontSize: "12px",
          }}
        >
          {emailErrorMessage}
        </p>
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default CardPaymentCard;
