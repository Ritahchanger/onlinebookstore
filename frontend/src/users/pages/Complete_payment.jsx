import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../Redux/features/alertSlice";
import Preloaders from "../components/Preloaders/Preloaders";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Complete_payment = () => {
  const loading = useSelector((state) => state.alerts.loading);
  const query = useQuery();
  const token = query.get("token");
  const dispatch = useDispatch();

  const completeOrder = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        `http://localhost:5000/api/payment/paypal/complete-order`,
        {
          token,
        }
      );
      dispatch(hideLoading());
      console.log(response.data);
      if (response.status === 200) {
        alert("Payment completed successfully!");
      } else {
        console.error("Payment completion failed:", response.data.error);
        alert("Payment completion failed. Please try again later.");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error completing payment:", error);
      alert("Error completing payment. Please try again later.");
    }
  };

  useEffect(() => {
    if (token) {
      completeOrder();
    }
  }, [token]);

  return (
    <div className="paypal_terminations">
      <p>completing payment</p>
    </div>
  );
};

export default Complete_payment;
