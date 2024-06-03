import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AccountNavbar.css";
import CloseIcon from "../../../assets/icons/close.png";
import ProfileIcon from "../../../assets/icons/boy.png";

const AccountNavbar = ({ handleSidebar, sidebar }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/profile");
  };

  return (
    <div className="account-navigation">
      {!sidebar ? (
        <div className="menu-icon" onClick={handleSidebar}>
          <p>&#9776;</p>
        </div>
      ) : (
        <div className="close-icon">
          <img src={CloseIcon} alt="CloseIcon" onClick={handleSidebar} />
        </div>
      )}

      <div className="section date">
        <p>Joined on</p>
        <p>{`${user.user.createdOn}`}</p>
      </div>
      <div className="section amount">
        <p>Amount</p>
        <p>sh 78,000</p>
      </div>
      <div className="section id">
        <p>Username</p>
        <p>{user.user.username}</p>
      </div>

      <div className="profile-section" onClick={handleNavigation}>
        <div className="img-wrapper">
          <img
            src={`http://localhost:5000/upload/authors/${user.user.passport}`}
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default AccountNavbar;
