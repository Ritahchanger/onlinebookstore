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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    `${user.firstName || ""} ${user.secondName || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  {user.passport ? (
                    <td>
                      <img
                        src={`${Config.apiUrl}/upload/authors/${user.passport}`}
                      />
                    </td>
                  ) : (
                    <td>
                      <img
                        src={User}
                        alt="Profile"
                      />
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
