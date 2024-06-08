import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

const PaypalPayment = () => {
  const [orderId, setOrderId] = useState("");
  const serverUrl = "http://localhost:5000/api/payment/paypal";

  const createOrder = async (data, actions) => {
    try {
      const response = await fetch(`${serverUrl}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cost: data.cost,
          description: data.description,
        }),
      });
      const orderData = await response.json();
      console.log(orderData)
      setOrderId(orderData.id); // Set the order ID
      return orderData.id; // Return the order ID
    } catch (error) {
      console.error("Failed to create order:", error);
    }
  };

  const onApprove = async (data, actions) => {
    try {
      const response = await fetch(`http://localhost:5000/api/payment/paypal/orders/${data.data.id}/capture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderID:data.data.id,
        }),
      });
      const captureData = await response.json();
      console.log("Capture response:", captureData);
      // Handle the response as needed
    } catch (error) {
      console.error("Failed to capture order:", error);
    }
  };

  return (
    <PayPalButtons
      createOrder={(data, actions) => createOrder(data, actions)}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
};

export default PaypalPayment;
