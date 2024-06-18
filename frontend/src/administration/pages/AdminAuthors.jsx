import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import Config from "../../Config";
import "./Admin.css";
import "./Authors.css";

import User from "../../assets/icons/user.png"

const AdminAuthors = () => {
  const [sidebar, showSidebar] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState([]);

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Config.apiUrl}/api/users/authors`);
      setAuthors(response.data.data);
      setFilteredAuthors(response.data.data);
    } catch (error) {
      console.log(`There was an error fetching the data from the backend => ${error.message}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = authors.filter((author) =>
      author.firstName.toLowerCase().includes(searchValue) ||
      author.secondName.toLowerCase().includes(searchValue) ||
      author.email.toLowerCase().includes(searchValue) ||
      author.username.toLowerCase().includes(searchValue)
    );
    setFilteredAuthors(filtered);
  };

  return (
    <div className="admin authors">
      <AdminNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <AdminSidebar sidebar={sidebar} />
      <div className="container">
        <p className="medium-header">Admin Authors</p>
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
                <td>EMAIL</td>
                <td>ID</td>
                <td>ROLES</td>
                <td>CREATED ON</td>
              </tr>
            </thead>
            <tbody>
              {filteredAuthors.map((author) => (
                <tr key={author._id}>
                   {author.passport ? (
                    <td>
                      <img
                        src={`${Config.apiUrl}/upload/authors/${author.passport}`}
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
                  <td>
                    {author.firstName} {author.secondName}
                  </td>
                  <td>{author.email}</td>
                  <td>{author._id}</td>
                  <td>{author.roles.join(", ")}</td>
                  <td>{author.createdOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthors;
