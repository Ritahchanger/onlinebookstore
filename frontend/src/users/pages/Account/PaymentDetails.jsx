import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import Config from "../../../Config";

import "./Withdrawal.css";

const PaymentDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [withdrawalAmount, setWithDrawalAmount] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [emailSuccessMessage, setEmailSuccessMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneNoSuccessMessage, setPhoneNoSuccessMessage] = useState("");
  const [phoneNoErrorMessage, setPhoneNoErrorMessage] = useState("");

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  const setWithdrawalAccount = async () => {
    try {
      const response = await axios.post(
        `${Config.apiUrl}/api/withdrawals/post`,
        {
          userId: user?.user?._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`There was a network technicalities encountered!`);
      }
      console.log("Withdrawal account created successfully");
    } catch (error) {
      console.log("There was a problem accessing the server!");
    }
  };

  useEffect(() => {
    setWithdrawalAccount();
  }, [user?._id]);

  const updateEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${Config.apiUrl}/api/withdrawals/update-paypal-email/${user?.user?._id}`,
        {
          paypalEmail: paypalEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setEmailSuccessMessage("Email updated successfully");
        setEmailErrorMessage("");
      } else {
        throw new Error("There was an error accessing the server!");
      }
    } catch (error) {
      setEmailErrorMessage("Failed to update email. Please try again.");
      setEmailSuccessMessage("");
      console.log("Error updating email:", error.message);
    }
  };

  const updatePhoneNo = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${Config.apiUrl}/api/withdrawals/update-mpesa-phone-no/${user?.user?._id}`,
        { mpesaNumber: mpesaNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setPhoneNoSuccessMessage("M-Pesa phone number updated successfully");
        setPhoneNoErrorMessage("");
      } else {
        throw new Error("There was an error accessing the server!");
      }
    } catch (error) {
      setPhoneNoErrorMessage(
        "Failed to update M-Pesa phone number. Please try again."
      );
      setPhoneNoSuccessMessage("");
      console.log("Error updating M-Pesa phone number:", error.message);
    }
  };

  return (
    <div className="account withdrawal">
      <AccountNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <SideBar
        sidebar={sidebar}
        handleTerminationModel={handleTerminationModel}
      />

      <div className="my-books">
        <div className="container">
          <p className="medium-header">PAYMENT DETAILS</p>
          <p className="small-header">
            {`Hello, ${user?.firstName} ${user?.secondName}! You can manage your withdrawal options and update your payment information here.`}
          </p>
          <p>
            Please ensure that the payment details provided to Bemi Editors are
            accurate, as they will be used to process your payments.
          </p>
          <p className="small-header larger-font">
            Note: 20% of your earnings will be retained by Bemi Editors Limited
            to cover marketing and advertisement costs for your products.
          </p>
          <p className="small-header larger-font">
            Minimum amount withdrawable:
            <br />
            sh 3000 equivalent to $ 23.18
          </p>
          <div className="grid">
            <div className="card">
              <div className="medium-header">DETAILS</div>
              <div className="detail">
                <p>Phone No</p>
                <p>07-121-95-228</p>
              </div>
              <div className="detail">
                <p>Paypal Email</p>
                <p>{paypalEmail}</p>
              </div>
              <p className="medium-header">UPDATE PAYMENT DETAILS</p>
              <form onSubmit={updatePhoneNo} className="input-group">
                <input
                  type="text"
                  name="mpesanumber"
                  placeholder="Enter M-Pesa number.."
                  value={mpesaNumber}
                  onChange={(e) => setMpesaNumber(e.target.value)}
                  required
                />
                <input type="submit" value="UPDATE M-PESA" />
              </form>
              {phoneNoSuccessMessage && (
                <p className="success-message">{phoneNoSuccessMessage}</p>
              )}
              {phoneNoErrorMessage && (
                <p className="error-message">{phoneNoErrorMessage}</p>
              )}
              <form onSubmit={updateEmail} className="input-group">
                <input
                  type="email"
                  name="paypalEmail"
                  placeholder="Enter PayPal email.."
                  value={paypalEmail}
                  onChange={(e) => setPaypalEmail(e.target.value)}
                  required
                />
                <input type="submit" value="UPDATE PAYPAL" />
              </form>
              {emailSuccessMessage && (
                <p className="success-message">{emailSuccessMessage}</p>
              )}
              {emailErrorMessage && (
                <p className="error-message">{emailErrorMessage}</p>
              )}
            </div>
            <div className="card">
              <div className="medium-header">WITHDRAW</div>
              <div className="input-group">
                <input
                  type="number"
                  name="amount"
                  value={withdrawalAmount}
                  placeholder="Amount to withdrawal.."
                  onChange={(e) => {
                    setWithDrawalAmount(e.target.value);
                  }}
                />
                {withdrawalAmount.length > 1 && (
                  <>
                    <p
                      className="medium-header"
                      style={{ textAlign: "center" }}
                    >{`Sh ${withdrawalAmount} equivalent to $ ${(
                      withdrawalAmount / 129.48
                    ).toFixed(2)}`}</p>
                    <p className="medium-header">
                      {`Subtracting 20% you'll get sh ${
                        0.8 * withdrawalAmount
                      } equivalent to $ ${(
                        (0.8 * withdrawalAmount) /
                        129.48
                      ).toFixed(2)}`}
                    </p>
                  </>
                )}

                <input
                  type="submit"
                  value="REQUEST WITHDRAW"
                  className="withdrawal"
                  style={
                    withdrawalAmount.length === 0 ? { marginTop: "10px" } : null
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <TerminationModel
        handleTerminationModel={handleTerminationModel}
        terminationModel={terminationModel}
      />
    </div>
  );
};

export default PaymentDetails;
