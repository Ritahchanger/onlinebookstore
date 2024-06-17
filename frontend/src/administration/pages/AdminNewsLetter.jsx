import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import Config from "../../Config";
import "./Admin.css";
import "./Authors.css";

import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../../users/Redux/features/alertSlice";

import Preloaders from "../../users/components/Preloaders/Preloaders";

const AdminNewsLetter = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.alerts.loading); // Accessing loading state from Redux

  const [sidebar, showSidebar] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getSubscribers();
  }, []);

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const getSubscribers = async () => {
    try {
      dispatch(showLoading()); // Dispatching showLoading action
      const response = await axios.get(
        `${Config.apiUrl}/api/users/subscribe/newsletter`
      );
      setSubscribers(response.data.users || []);
      dispatch(hideLoading()); // Dispatching hideLoading action
    } catch (error) {
      console.error("Error fetching subscribers:", error);
      dispatch(hideLoading()); // Ensure loading state is cleared on error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!subject.trim()) {
      setError("Please enter a subject.");
      return;
    }

    if (!message.trim()) {
      setError("Please enter a message.");
      return;
    }

    try {
      dispatch(showLoading()); // Dispatching showLoading action
      const response = await axios.post(`${Config.apiUrl}/api/newsletter/`, {
        emails: subscribers.map((user) => user.email),
        subject,
        message,
      });

      console.log(response.data);

      if (response.status === 200) {
        setSuccessMessage("Emails sent successfully.");
        setSubject("");
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending emails:", error);
      setError("Failed to send emails. Please try again later.");
    } finally {
      dispatch(hideLoading()); // Dispatching hideLoading action in finally block to ensure loading state is cleared
    }
  };

  return (
    <div className="admin authors">
      <AdminNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <AdminSidebar sidebar={sidebar} />
      <div className="container">
        <p className="medium-header">MANAGE NEWS LETTERS</p>
        <p className="small-header">SEND MONTHLY NEWSLETTERS</p>
        <form onSubmit={handleSubmit}>
          <div className="input_group">
            <input
              type="text"
              name="subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
                setError(""); // Clear error when subject changes
              }}
              placeholder="Enter email subject...."
            />
          </div>
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError(""); // Clear error when message changes
              }}
              name="message"
              id=""
              cols="30"
              rows="10"
              placeholder="Enter the message...."
            ></textarea>
          </div>
          {error && <p className="error-message">{error}</p>}

          <div className="input-group">
            <input type="submit" value="SEND EMAILS" className="submit-btn" />
          </div>
        </form>

        {successMessage && <p className="success-message" style={{color:"green"}}>{successMessage}</p>}

        <div className="table_wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Roles</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length > 0 ? (
                subscribers.map((user) => (
                  <tr key={user._id}>
                    <td>{`${user.firstName} ${user.secondName}`}</td>
                    <td>{user.email}</td>
                    <td>{user.roles.join(", ")}</td>
                    <td>{user.createdOn}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No subscribers found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {loading && <Preloaders />}
    </div>
  );
};

export default AdminNewsLetter;
