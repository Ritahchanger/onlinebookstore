import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import Config from "../../../Config";
import "./Withdrawal.css";
import CardPaymentCard from "./CardPaymentCard";
import WithdrawalCard from "./WithdrawalCard";
const PaymentDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);

  const [userDetails, setUserDetails] = useState(null);

  const [userInformation, setUserInformation] = useState(null);
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  };
  const [loading, setLoading] = useState(false);
  const [paypalEmail, setPaypalEmail] = useState("");
  const [mpesaNumber, setMpesaNumber] = useState("");
  const [emailSuccessMessage, setEmailSuccessMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneNoSuccessMessage, setPhoneNoSuccessMessage] = useState("");
  const [phoneNoErrorMessage, setPhoneNoErrorMessage] = useState("");
  const updateEmail = async (e) => {
    e.preventDefault();
    if (!validateEmail(paypalEmail)) {
      setEmailErrorMessage("Invalid email format");
      setEmailSuccessMessage("");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.put(
        `${Config.apiUrl}/api/payment-detail/update-paypal-email/${user?.user?._id}`,
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
        getPaymentDetails();
        setEmailSuccessMessage("Email updated successfully");
        setEmailErrorMessage("");
        setPaypalEmail(""); // Clear input field
      } else if (response.status === 409) {
        setEmailErrorMessage(response.data.error);
        setEmailSuccessMessage("");
      } else {
        throw new Error("There was an error accessing the server!");
      }
    } catch (error) {
      setEmailErrorMessage("We already have this email");
      setEmailSuccessMessage("");
      console.log("Error updating email:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const updatePhoneNo = async (e) => {
    e.preventDefault();
    if (!validatePhoneNumber(mpesaNumber)) {
      setPhoneNoErrorMessage("Phone number must be exactly 10 digits");
      setPhoneNoSuccessMessage("");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.put(
        `${Config.apiUrl}/api/payment-detail/update-mpesa-phone-no/${user?.user?._id}`,
        { mpesaNumber: mpesaNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        getPaymentDetails();
        setPhoneNoSuccessMessage("M-Pesa phone number updated successfully");
        setPhoneNoErrorMessage("");
        setMpesaNumber(""); // Clear input field
      } else if (response.status === 409) {
        getPaymentDetails();
        setPhoneNoErrorMessage("This phone number is already used");
        setPhoneNoSuccessMessage("");
      } else {
        throw new Error("There was an error accessing the server!");
      }
    } catch (error) {
      setPhoneNoErrorMessage("We already have this phone no");
      setPhoneNoSuccessMessage("");
      console.log("Error updating M-Pesa phone number:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  const getUserInformation = async () => {
    try {
      const response = await axios.get(
        `${Config.apiUrl}/api/users/user-information/${user.user?._id}`
      );
      setUserInformation(response.data.data);
    } catch (error) {
      console.log("There was an error accessing the server");
    }
  };

  const setWithdrawalAccount = async () => {
    try {
      const response = await axios.post(
        `${Config.apiUrl}/api/payment-detail/post`,
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
        throw new Error("There was a network technicality encountered!");
      }
      console.log("Withdrawal account created successfully");
    } catch (error) {
      console.log(error.message);
    }
  };

  const getPaymentDetails = async () => {
    try {
      const response = await axios.get(
        `${Config.apiUrl}/api/payment-detail/payment-details/${user?.user?._id}`
      );

      if (response.status === 200) {
        setUserDetails(response.data);
      } else {
        throw new Error(
          "There was an error fetching user details from the backend"
        );
      }
    } catch (error) {
      console.log(
        `There was a problem getting the user payment details ${error.message}`
      );
    }
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        await setWithdrawalAccount();
        await getPaymentDetails();
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    if (user?.user?._id) {
      fetchDetails();
      getUserInformation();
    }
  }, [user?.user?._id]);

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
            {`Hello, ${user?.user?.firstName} ${user?.user?.secondName}! You can manage your withdrawal options and update your payment information here.`}
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
            sh 2000 equivalent to $ {(2000 / 129.48).toFixed(2)}
          </p>
          <div className="grid">
            <CardPaymentCard
              getPaymentDetails={getPaymentDetails}
              user={user}
              userDetails={userDetails}
              setWithdrawalAccount={setWithdrawalAccount}
              userInformation={userInformation}
              updateEmail={updateEmail}
              mpesaNumber={mpesaNumber}
              paypalEmail={paypalEmail}
              updatePhoneNo={updatePhoneNo}
              emailErrorMessage={emailErrorMessage}
              emailSuccessMessage={emailSuccessMessage}
              phoneNoErrorMessage={phoneNoErrorMessage}
              phoneNoSuccessMessage={phoneNoSuccessMessage}
              setMpesaNumber={setMpesaNumber}
              setPhoneNoErrorMessage={setPhoneNoErrorMessage}
              setPhoneNoSuccessMessage={setPhoneNoSuccessMessage}
              setPaypalEmail={setPaypalEmail}
              setEmailErrorMessage={setEmailErrorMessage}
              setEmailSuccessMessage={setEmailSuccessMessage}
              loading={loading}
            />
            <div className="card">
              <div className="medium-header">WITHDRAW</div>
              <WithdrawalCard
                paypalEmail={paypalEmail}
                mpesaNumber={mpesaNumber}
              />
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
