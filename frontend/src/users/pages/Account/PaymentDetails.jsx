import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import axios from "axios";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import { useSelector } from "react-redux";
import "./Withdrawal.css";
import Config from "../../../Config";

const PaymentDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [withdrawalAmount, setWithDrawalAmount] = useState("");
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
          userId: user.user._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(`There was a problem accessing the server!`);
      }
      console.log("Withdrawal account created successfully");
    } catch (error) {
      console.log("There was a problem accessing the server!");
    }
  };
  useEffect(() => {
    setWithdrawalAccount();
  }, [user.user._id]);

  console.log(withdrawalAmount);

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
            {`Hello, ${user.user.firstName} ${user.user.secondName}! You can manage your withdrawal options and update your payment information here.`}
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
                <p>payment@paypal.com</p>
              </div>
              <div className="medium-header">UPDATE PAYMENT DETAILS</div>
              <div className="input-group">
                <input
                  type="text"
                  name="Phone"
                  placeholder="Enter phone no.."
                />
                <input type="submit" value="UPDATE" />
              </div>
              <div className="input-group">
                <input
                  type="email"
                  name="Phone"
                  placeholder="Enter paypal email.."
                />
                <input type="submit" value="UPDATE" />
              </div>
            </div>
            <div className="card">
              <div className="medium-header">WITHDRAW</div>
              <div className="input-group">
                <input
                  type="text"
                  name="amount"
                  value={withdrawalAmount}
                  placeholder="Amount to withdrawal in(SH)..(NO LETTER,COMMA OR CHARACTER"
                  onChange={(e) => {
                    setWithDrawalAmount(e.target.value);
                  }}
                />
                {withdrawalAmount.length > 1 && (
                  <>
                    <p
                      className="medium-header"
                      style={{ textAlign: "center" }}
                    >{`Sh  ${withdrawalAmount} equivalent to $ ${(
                      withdrawalAmount / 129.48
                    ).toFixed(2)}`}</p>

                    <p className="medium-header">
                      {`Substracting 20% you'll get sh ${
                        0.8 * withdrawalAmount
                      } equivalent to $ ${(
                        (0.8 * withdrawalAmount) /
                        120.48
                      ).toFixed(2)}`}
                    </p>
                  </>
                )}

                <input
                  type="submit"
                  value="REQUEST WITHDRAW"
                  className="withdrawal"
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
