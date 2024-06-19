import React, { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import Config from "../../Config";
import "./Admin.css";
import axios from "axios";
import "./PurchaseHistory.css";

const PurchaseHistory = () => {
  const [sidebar, showSidebar] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    getOrderHistory();
  }, []);

  const getOrderHistory = async () => {
    try {
      const response = await axios.get(
        `${Config.apiUrl}/api/cart/get/all/purchases`
      );
      setPurchaseHistory(response.data.data);
    } catch (error) {
      console.log("Error fetching purchase history:", error);
    }
  };

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="admin purchase-history">
      <AdminNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <AdminSidebar sidebar={sidebar} />
      <div className="container">
        <p className="medium-header">PURCHASE HISTORY</p>
        <div className="table_wrapper">
          <table>
            <thead className="thead-dark">
              <tr>
                <td scope="col">Order ID</td>
                <td scope="col">User ID</td>
                <td scope="col">Product</td>
                <td scope="col">Quantity</td>
                <td scope="col">Purchase Date</td>
                <td scope="col">Price</td>
                <td scope="col">Total Price</td>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user}</td>
                  <td>
                    <ul className="list-unstyled">
                      {order.items.map((item) => (
                        <li key={item.productId}>
                          {item.title} - ${item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul className="list-unstyled">
                      {order.items.map((item) => (
                        <li key={item.productId}>{item.quantity}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul className="list-unstyled">
                      {order.items.map((item) => (
                        <li key={item.productId}>{item.purchaseDate}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul className="list-unstyled">
                      {order.items.map((item) => (
                        <li key={item.productId}>${item.price}</li>
                      ))}
                    </ul>
                  </td>
                  <td>${calculateTotalPrice(order.items)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistory;
