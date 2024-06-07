import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import axios from "axios";
import { Link } from "react-router-dom";
import "./PaymentDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MpesaLogo from "../../../assets/images/mpesa.png";
import { showLoading, hideLoading } from "../../Redux/features/alertSlice";
import Preloaders from "../../components/Preloaders/Preloaders";
import { PayPalScriptProvider} from "@paypal/react-paypal-js";
import PaypalPayment from "../../components/PaypalPayments/PaypalPayment";
const PaymentDetails = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.alerts.loading);
  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [phoneNo, setPhoneNo] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  const handlePayment = async () => {
    if (!phoneNo) {
      alert("Please enter a phone number");
      return;
    }

    const paymentMethod = "safaricom";

    try {
      dispatch(showLoading());
      const response = await axios.post(
        `http://localhost:5000/api/payment`,
        {
          phone: phoneNo,
          amount: totalPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data.success) {
        dispatch(hideLoading());
        return;
      }

      dispatch(hideLoading());
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
      }, 10000);
    } catch (error) {
      console.error("Error making payment:", error);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cart/get/${user.user._id}`
        );
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

  const deleteCartItem = async (cartItemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/cart/delete/cartItem/${user.user._id}/${cartItemId}`
      );

      if (response.data.success) {
        // Update the cart items in the state
        setCartItems(cartItems.filter((item) => item._id !== cartItemId));
        // Recalculate the total price
        const updatedTotalPrice = cartItems.reduce(
          (acc, item) =>
            item._id !== cartItemId
              ? acc + item.productId.price * item.quantity
              : acc,
          0
        );
        setTotalPrice(updatedTotalPrice);
      } else {
        console.error("Error deleting cart item:", response.data.error);
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const initialOptions = {
    clientId: "Ab-xtAN0jbGzeTr7RgoW8oDk1dOL78_nU275rwNgMhZo3C0jnJIGmz6N2SqbEEGg5p9H6_hNozjMmQxM",
    currency: "USD",
    intent: "capture",
};

  return (
    <PayPalScriptProvider options={initialOptions}>
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
              <Preloaders />
            ) : cartItems.length === 0 ? (
              <p>NO CART ITEMS</p>
            ) : (
              <>
                <p className="small-header">Carted Items</p>
                <div className="row cart_row">
                  <div className="table_wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Book Cover</th>
                          <th>Name</th>
                          <th>Price</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item) => (
                          <tr key={item._id}>
                            <td>
                              <img
                                src={`http://localhost:5000/upload/books/${item.productId?.coverImage}`}
                                alt={item.productId?.title}
                              />
                            </td>
                            <td>{item.productId?.title}</td>
                            <td>${item.productId?.price}</td>
                            <td
                              className="remove"
                              onClick={() => deleteCartItem(item._id)}
                            >
                              <i className="fas fa-trash"></i> 
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="payment_account">
                    <p>Select payment method:</p>
                    <Link to="/shop">
                      <i className="fa fa-arrow-left"></i>Continue shopping?
                    </Link>
                    <p className="total-price">Total Price: ${totalPrice}</p>
                    <div className="payment-row">
                      <div className="safaricom">
                        <p className="small-header">FOR THE LOCAL PAYMENT</p>
                        <div className="mpesa_logo">
                          <img src={MpesaLogo} alt="" />
                        </div>
                        <div className="payment-options">
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
                          disabled={paymentSuccess}
                        >
                          {paymentSuccess ? "Payment Successful" : "PAY NOW"}
                        </button>
                      </div>
                      <div className="paypal">
                        <p className="small-header">
                          FOR THE INTERNATIONAL PAYMENTS
                        </p>  
                        <div className="col">
                         <PaypalPayment/>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <TerminationModel
          handleTerminationModel={handleTerminationModel}
          terminationModel={terminationModel}
        />
      </div>
    </PayPalScriptProvider>
  );
};

export default PaymentDetails;
