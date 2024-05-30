import "./Account.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useState } from "react";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import BookCover from "../../../assets/images/cover12.webp";

import { Link } from "react-router-dom"; 

import "./PaymentDetails.css";

const cartItems = [
  { id: 1, name: "Book 1", type: "ebook", price: 10, cover: BookCover },
  { id: 2, name: "Book 2", type: "audiobook", price: 15, cover: BookCover },
];

const PaymentDetails = () => {
  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const handleSidebar = () => {
    showSidebar(!sidebar);
  };
  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  const handlePayment = (paymentMethod) => {
    // Here you can implement the logic to process the payment
    // For example, redirecting to a payment gateway or initiating payment via an API
    if (paymentMethod === "paypal") {
      // Implement PayPal payment logic
    } else if (paymentMethod === "safaricom") {
      // Implement Safaricom payment logic
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="account">
      <AccountNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <SideBar
        sidebar={sidebar}
        handleTerminationModel={handleTerminationModel}
      />

      <div className="payment">
        <div className="container">
          <p className="medium-header">PENDING PAYMENTS</p>

          <p className="small-header">Carted Items</p>
          <div className="table_wrapper">
            <table>
              <thead>
                <tr>
                  <td>Book Cover</td>
                  <td>Name</td>
                  <td>Type</td>
                  <td>Price</td>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.cover} alt={item.name} />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>${item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="link-text">
            <Link to="/shop">
              {" "}
              <i className="fa fa-arrow-left"></i>Continue shopping?
            </Link>
          </p>
          <p className="total-price">Total Price: ${totalPrice}</p>

          <div className="payment-options">
            <p>Select payment method:</p>
            <button
              onClick={() => handlePayment("paypal")}
              className="cart-buttons"
            >
              PayPal
            </button>
            <button
              onClick={() => handlePayment("safaricom")}
              className="cart-buttons"
            >
              Safaricom
            </button>
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
