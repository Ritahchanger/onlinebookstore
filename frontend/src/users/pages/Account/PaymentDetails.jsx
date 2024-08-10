import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import "./Withdrawal.css";

import CardPaymentCard from "./CardPaymentCard";

import WithdrawalCard from "./WithdrawalCard";

const PaymentDetails = () => {
  const [sidebar, showSidebar] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const [terminationModel, showTerminationModel] = useState(false);
  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  return (
    <div className="account withdrawal">
      <AccountNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <SideBar
        sidebar={sidebar}
        handleTerminationModel={handleTerminationModel}
      />

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
          Note: 20% of your earnings will be retained by Bemi Editors Limited to
          cover marketing and advertisement costs for your products.
        </p>
        <p className="small-header larger-font">
          Minimum amount withdrawable:
          <br />
          sh 2000 equivalent to $ {(2000 / 129.48).toFixed(2)}
        </p>
        <div className="payment-grid">
          <CardPaymentCard />
          <WithdrawalCard />
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
