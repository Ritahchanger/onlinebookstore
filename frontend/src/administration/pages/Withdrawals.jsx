import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import Config from "../../Config";
import "./Admin.css";
import User from "../../assets/icons/user.png";
import "./Withdrawals.css";
import CloseIcon from "../../assets/icons/close.png";

import ClearPaymentModal from "../components/ClearPaymentModal";

const Withdrawals = () => {
  const [sidebar, showSidebar] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const handleSidebar = () => {
    showSidebar(!sidebar);
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${Config.apiUrl}/api/users/authors`);
      setAuthors(response.data.data);
      setFilteredAuthors(response.data.data);
    } catch (error) {
      console.log(
        `There was an error fetching the data from the backend => ${error.message}`
      );
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = authors.filter(
      (author) =>
        author.firstName.toLowerCase().includes(searchValue) ||
        author.secondName.toLowerCase().includes(searchValue) ||
        author.email.toLowerCase().includes(searchValue) ||
        author.username.toLowerCase().includes(searchValue)
    );
    setFilteredAuthors(filtered);
  };

  const handlePaymentModal = () => {
    setShowPaymentModal(!showPaymentModal);
  };
  return (
    <div className="admin withdrawals">
      <AdminNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <AdminSidebar sidebar={sidebar} />
      <div className="container">
        <p className="medium-header">WITHDRAWALS REQUESTS</p>
        <div className="input_group">
          <input
            type="text"
            name="search_author"
            placeholder="Search author..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="table_wrapper">
          <table>
            <thead>
              <tr>
                <td>PROFILE</td>
                <td>NAME</td>
                <td>REQUEST TIME</td>
                <td>REQUEST AMOUNT</td>
                <td>Requested ON</td>
                <td>MPESA NUMBER</td>
                <td>PAYPAL EMAIL</td>
                <td>CONFIRM PAYMENT</td>
                <td>CLEAR PAYMENT</td>
              </tr>
            </thead>
            <tbody>
              {filteredAuthors.map((author) => (
                <tr key={author._id}>
                  {author.passport ? (
                    <td>
                      <img
                        src={`${Config.apiUrl}/upload/authors/${author.passport}`}
                        className="profile-img"
                      />
                    </td>
                  ) : (
                    <td>
                      <img src={User} className="profile-img" />
                    </td>
                  )}
                  <td>
                    {author.firstName} {author.secondName}
                  </td>
                  <td>7-8-2021</td>
                  <td>{author.roles.join(", ")}</td>
                  <td>{author.createdOn}</td>
                  <td>0712195228</td>
                  <td>payment@paypal.com</td>
                  <td className="table-checkbox">
                    <input type="checkbox" id="checkbox1" />
                    <span className="checkmark"></span>
                    <label for="checkbox1"></label>
                  </td>
                  <td>
                    <button className="cart-buttons" onClick={handlePaymentModal}>clear</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`custom-modal ${showPaymentModal ? "active" : ""}`}>
        <ClearPaymentModal handlePaymentModal={handlePaymentModal} />
      </div>
    </div>
  );
};
 
export default Withdrawals;
