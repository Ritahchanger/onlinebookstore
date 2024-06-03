import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PaymentDetails.css";
import { useSelector } from "react-redux";

import MpesaLogo from "../../../assets/images/mpesa.png";

const PaymentDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state
  const [phoneNo, setPhoneNo] = useState(""); // State to hold phone number
  const [paymentSuccess, setPaymentSuccess] = useState(false); // State to track payment success

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  const handlePayment = async () => {
    if (!phoneNo) {
      // Check if phone number is provided
      alert("Please enter a phone number");
      return;
    }
  
    const paymentMethod = "safaricom";
  
    try {
      const makePayment = await axios.post(
        "http://localhost:5000/api/payment",
        {
          phone: phoneNo, // Use the provided phone number
          amount: totalPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle payment response
      setPaymentSuccess(true); // Set payment success state to true
      setTimeout(() => {
        setPaymentSuccess(false); // Clear payment success state after 10 seconds
      }, 10000); // 10000 milliseconds = 10 seconds
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };
  

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cart/${user.user._id}`
        );
        setLoading(false);
        if (!response.data.success) {
          throw new Error("NO CART ITEMS");
        }
        setCartItems(response.data.items);
        const totalPrice = response.data.items.reduce(
          (acc, item) => acc + item.productId.price * item.quantity,
          0
        );
        setTotalPrice(totalPrice);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();
  }, [user.user._id]);

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

          {loading ? (
            <p>Loading...</p>
          ) : cartItems.length === 0 ? (
            <p>NO CART ITEMS</p>
          ) : (
            <>
              <p className="small-header">Carted Items</p>

              <div className="table_wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Book Cover</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <img
                            src={`http://localhost:5000/upload/books/${item.productId.coverImage}`}
                            alt={item.productId.title}
                          />
                        </td>
                        <td>{item.productId.title}</td>
                        <td>{item.productId.type}</td>
                        <td>${item.productId.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          <div className="payment-row">
            <div className="card">
              <p className="link-text">
                <Link to="/shop">
                  <i className="fa fa-arrow-left"></i>Continue shopping?
                </Link>
              </p>
              <p className="total-price">Total Price: ${totalPrice}</p>
            </div>
            <div className="mpesa_logo">
              <img src={MpesaLogo} alt="" />
            </div>
          </div>
          <p>Select payment method:</p>
          <div className="payment-options">
            <div className="input-group">
              <input
                type="text"
                name="phoneNo"
                id="phoneNo"
                placeholder="Enter phone No (07--)"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </div>
            <button
              onClick={handlePayment}
              className="cart-buttons"
              disabled={paymentSuccess} // Disable button if payment is already successful
            >
              {paymentSuccess ? "Payment Successful" : "Pay Now"}
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
