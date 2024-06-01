import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PaymentDetails.css";
import { useSelector } from "react-redux";

const PaymentDetails = () => {
  const user = useSelector((state) => state.auth.user);
  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  const handlePayment = async (paymentMethod) => {
    if (paymentMethod === "paypal") {
      // Handle PayPal payment
    } else if (paymentMethod === "safaricom") {
      const makePayment = await axios.post(
        "http://localhost:5000/api/payment",
        {
          phone: "0113174493",
          amount: totalPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cart/${user.user._id}`
        );
        setLoading(false); // Set loading to false after response
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

          <p className="link-text">
            <Link to="/shop">
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
