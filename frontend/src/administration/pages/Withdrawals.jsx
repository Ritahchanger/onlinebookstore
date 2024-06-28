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
  const [withdrawals, setWithdrawals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredWithdrawals, setFilteredWithdrawals] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [withdrawTodelete, setWithDrawToDelete] = useState(null);

  const handleClearance = (withdraw) => {
    setWithDrawToDelete(withdraw);
  };

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Config.apiUrl}/api/withdrawal/get`);
      setWithdrawals(response.data.data);
      setFilteredWithdrawals(response.data.data); // Initialize filtered data with all withdrawals
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

    const filtered = withdrawals.filter((withdraw) => {
      const userFullName =
        `${withdraw.user.firstName} ${withdraw.user.secondName}`.toLowerCase();
      return (
        userFullName.includes(searchValue) ||
        withdraw.paypalEmail.toLowerCase().includes(searchValue) ||
        (withdraw.mpesaNumber && withdraw.mpesaNumber.includes(searchValue))
      );
    });

    setFilteredWithdrawals(filtered);
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
            placeholder="Search withdraw..."
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
                <td>REQUESTED ON</td>
                <td>MPESA NUMBER</td>
                <td>PAYPAL EMAIL</td>
                <td>CONFIRM PAYMENT</td>
                <td>CLEAR PAYMENT</td>
              </tr>
            </thead>
            <tbody>
              {filteredWithdrawals.map((withdraw) => (
                <tr key={withdraw._id}>
                  {withdraw.user.passport ? (
                    <td>
                      <img
                        src={`${Config.apiUrl}/upload/authors/${withdraw.user.passport}`}
                        alt="Profile"
                      />
                    </td>
                  ) : (
                    <td>
                      <img src={User} alt="Profile" />
                    </td>
                  )}
                  <td>
                    {`${withdraw.user.firstName} ${withdraw.user.secondName}`}
                  </td>
                  <td>{new Date(withdraw.requestedTime).toLocaleString()}</td>
                  <td>{withdraw.amount}</td>
                  <td>
                    {new Date(withdraw.requestedTime).toLocaleDateString()}
                  </td>
                  <td>{withdraw.mpesaNumber || "N/A"}</td>
                  <td>{withdraw.paypalEmail || "N/A"}</td>
                  <td className="table-checkbox">
                    <input type="checkbox" id={`checkbox-${withdraw._id}`} />
                    <span className="checkmark"></span>
                    <label htmlFor={`checkbox-${withdraw._id}`}></label>
                  </td>
                  <td>
                    <button
                      className="cart-buttons"
                      onClick={() => {
                        handlePaymentModal();
                        handleClearance(withdraw);
                      }}
                    >
                      clear
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={`custom-modal ${showPaymentModal ? "active" : ""}`}>
        <ClearPaymentModal
          handlePaymentModal={handlePaymentModal}
          fetchData={fetchData}
          withdrawTodelete={withdrawTodelete}
        />
      </div>
    </div>
  );
};

export default Withdrawals;
