import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import Config from "../../Config";
import "./Admin.css";

const TerminationAdministration = () => {
  const [sidebar, showSidebar] = useState(false);
  const [terminationAccounts, setTerminationAccounts] = useState([]);

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const url = `${Config.apiUrl}/api/users/get/termination/accounts`;

  const fetchData = async () => {
    try {
      const response = await axios.get(url);

      if (!response.data.success) {
        throw new Error("There occurred an internal server error");
      }

      setTerminationAccounts(response.data.data);
    } catch (error) {
      console.log(
        `There was an error sending the data to the backend=>${error.message}`
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTerminate = async (accountId) => {
    try {
      const response = await axios.delete(
        `${Config.apiUrl}/api/users/terminate/${accountId}`
      );

      if (!response.data.success) {
        throw new Error("There was an error terminating the account");
      }

      // Refresh the data after successful termination
      fetchData();
    } catch (error) {
      console.log(
        `There was an error terminating the account => ${error.message}`
      );
    }
  };

  return (
    <div className="admin">
      <AdminNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <AdminSidebar sidebar={sidebar} />
      <p className="medium-header">Termination Administration</p>

      <div className="container">
        <div className="table_wrapper">
          <table>
            <thead>
              <tr>
                <td>USER</td>
                <td>EMAIL</td>
                <td>REASON</td>
                <td>REQUESTED ON</td>
                <td>TERMINATE</td>
              </tr>
            </thead>
            <tbody>
              {terminationAccounts.map((account) => (
                <tr key={account._id}>
                  <td>{`${account.user.firstName} ${account.user.secondName}`}</td>
                  <td>{account.user.email}</td>
                  <td>{account.reason}</td>
                  <td>{account.createdOn}</td>
                  <td>
                    <button
                      className="cart-buttons"
                      onClick={() => handleTerminate(account._id)}
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TerminationAdministration;
