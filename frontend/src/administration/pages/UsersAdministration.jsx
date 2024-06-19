import React, { useState, useEffect } from "react";
import axios from "axios";
import Config from "../../Config";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import "./users.css";
import UpdateRole from "../components/UpdateRole";
import User from "../../assets/icons/user.png";

const UsersAdministration = () => {
  const [sidebar, showSidebar] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [updateModal, setUpdateModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Config.apiUrl}/api/users/all`);
      setUsers(response.data.data || []); // Adjust based on the actual structure of your response
    } catch (error) {
      console.error("Error fetching users data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Calculate total amount when users state changes
    const calculateTotalAmount = () => {
      let total = 0;
      users.forEach((user) => {
        if (user.amount) {
          total += parseFloat(user.amount);
        }
      });
      setTotalAmount(total);
    };

    calculateTotalAmount();
  }, [users]);

  useEffect(() => {
    // Update filteredUsers when searchTerm or users change
    const filtered = users.filter((user) =>
      `${user.firstName || ""} ${user.secondName || ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  useEffect(() => {
    // Calculate total amount based on filteredUsers
    const calculateFilteredTotalAmount = () => {
      let total = 0;
      filteredUsers.forEach((user) => {
        if (user.amount) {
          total += parseFloat(user.amount);
        }
      });
      setTotalAmount(total);
    };

    calculateFilteredTotalAmount();
  }, [filteredUsers]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleUpdateModal = () => {
    setUpdateModal(!updateModal);
  };

  const handleUserToUpdate = (user) => {
    setUserToUpdate(user);
  };

  return (
    <div className="admin users">
      <AdminNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <AdminSidebar sidebar={sidebar} />
      <p className="medium-header">Users Administration</p>
      <div className="container">
        <div className="input_group">
          <input
            type="text"
            name="search_author"
            placeholder="Search user..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <p>Total amount = {totalAmount.toFixed(2)} shillings</p>
        <div className="table_wrapper">
          <table>
            <thead>
              <tr>
                <td>COVER IMAGE</td>
                <td>NAME</td>
                <td>EMAIL</td>
                <td>ID</td>
                <td>ROLES</td>
                <td>CREATED ON</td>
                <td>CHANGE ROLE</td>
                <td>AMOUNT</td>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  {user.passport ? (
                    <td>
                      <img
                        src={`${Config.apiUrl}/upload/authors/${user.passport}`}
                        alt="Profile"
                      />
                    </td>
                  ) : (
                    <td>
                      <img src={User} alt="Profile" />
                    </td>
                  )}

                  <td>{`${user.firstName || ""} ${user.secondName || ""}`}</td>
                  <td>{user.email || ""}</td>
                  <td>{user.userId || ""}</td>
                  <td>{(user.roles || []).join(", ")}</td>
                  <td>{user.createdOn || ""}</td>
                  <td>
                    <button
                      className="cart-buttons"
                      onClick={() => {
                        handleUpdateModal();
                        handleUserToUpdate(user);
                      }}
                    >
                      UPDATE ROLE
                    </button>
                  </td>
                  <td>{user.amount ? <p>{user.amount}</p> : <p>0.0</p>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {updateModal && (
          <div className="custom-modal update">
            <UpdateRole
              handleUpdateModal={handleUpdateModal}
              userToUpdate={userToUpdate}
              fetchData={fetchData}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersAdministration;
