import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./PaymentCart.css";
import { useSelector, useDispatch } from "react-redux";
import MpesaLogo from "../../../assets/images/mpesa.png";
import { showLoading, hideLoading } from "../../Redux/features/alertSlice";
import Preloaders from "../../components/Preloaders/Preloaders";
import Config from "../../../Config";


const PaymentCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.alerts.loading);
  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [phoneNo, setPhoneNo] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [productIds, setProductIds] = useState([]);

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
        `${Config.apiUrl}/api/payment`,
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
        const purchaseResponse = await axios.post(
          `${Config.apiUrl}/api/cart/purchase/${user.user._id}`
        );

        console.log(purchaseResponse.data.data)

        if (purchaseResponse.data.success) {
          alert("Payment done successfully");
          await axios.post(`http://localhost:5000/api/cart/success`, {
            bookIds: productIds,
          });
           // Assuming fetchCartItems updates cartItems
          dispatch(hideLoading());

          navigate("/account");

        }

        
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

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `${Config.apiUrl}/api/cart/get/${user.user._id}`
      );
      if (!response.data.success) {
        throw new Error("No cart items found");
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

  useEffect(() => {
    fetchCartItems();
  }, [user.user._id]);

  useEffect(() => {
    const extractProductIds = () => {
      if (cartItems && cartItems.items) {
        const ids = cartItems.items.map((item) => item.productId._id);
        setProductIds(ids);
      }
    };
    extractProductIds();
  }, [cartItems]);

  const deleteCartItem = async (cartItemId) => {
    try {
      const response = await axios.delete(
        `${Config.apiUrl}/api/cart/delete/cartItem/${user.user._id}/${cartItemId}`
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

  const payWithPaypal = async () => {
    try {
      dispatch(showLoading());

      const response = await axios.post(
        `${Config.apiUrl}/api/payment/paypal/orders`,
        {
          cost: totalPrice,
          description: "cart_items",
        },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      dispatch(hideLoading());
      if (response.status === 201) {
        const purchaseResponse = await axios.post(
          `${Config.apiUrl}/api/cart/purchase/${user.user._id}`
        );
        setPaymentSuccess(true);
        const completion_page_url = response.data.links[1].href;

      window.open(completion_page_url, "_blank");

        setTimeout(() => {
          setPaymentSuccess(false);
        }, 10000);
      } else {
        // Payment failed
        console.error("Payment failed:", response.data.error);
        // Display error message to the user
        alert("Payment failed. Please try again later.");
      }
    } catch (error) {
      // Hide loading indicator
      dispatch(hideLoading());
      // Log and display error message
      console.error("Error making PayPal payment:", error);
      alert("Error making PayPal payment. Please try again later.");
    }
  };

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
                              src={`${Config.apiUrl}/upload/books/${item.productId?.coverImage}`}
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
                        <p>Pay with paypal</p>
                        <button class="paypal-btn" onClick={payWithPaypal}>
                          <i class="fa-brands fa-paypal"></i>
                        </button>
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
  );
};

export default PaymentCart;
