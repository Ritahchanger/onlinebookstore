import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./AccountNavbar.css";
import CloseIcon from "../../../assets/icons/close.png";
import ProfileIcon from "../../../assets/icons/boy.png";
import downArrow from "../../../assets/icons/drop.png";
const AccountNavbar = ({ handleSidebar, sidebar }) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isAdmin = user.user.roles.includes("admin");
  const handleDropDown = () => {
    setDropdown(!dropdown);
  };
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
      {/* <div className="section date">
        <p>Joined on</p>
        <p
          className="subtitles"
          style={{ color: "var(--orange)" }}
        >{`${user.user.createdOn}`}</p>
      </div> */}

      <Link to="/" activeClassName="active" className="cart-buttons home">
        <p>
          <i className="fas fa-home"></i>
        </p>
        <p>Home</p>
      </Link>

      <div className="section amount">
        <p>Amount</p>
        <p className="subtitles" style={{ color: "var(--orange)" }}>
          {`${user.user.amount}`}
        </p>
      </div>
      <div className="section id">
        <p>SYSTEM ID</p>
        <p className="subtitles" style={{ color: "var(--orange)" }}>
          {user.user.userId}
        </p>
      </div>
      <Link to="/admin/unapproved" className="cart-buttons home">
        <p>
          <i class="fas fa-cogs"></i>
        </p>
        <p>Admin</p>
      </Link>
      <div className="profile-section" onClick={handleNavigation}>
        <div className="img-wrapper">
          <img
            src={`http://localhost:5000/upload/authors/${user.user.passport}`}
            alt="Profile"
          />
        </div>
        <Link to="/profile">
          <p className="small-header">{user.user.firstName}</p>
        </Link>
      </div>
      <div className="dropdown">
        <img
          src={downArrow}
          alt=""
          className={`arrow_dropdown ${dropdown ? "active" : null}`}
          onClick={handleDropDown}
        />
        <div className={`drop_down ${dropdown ? "active" : null}`}>
          {isAdmin && (
            <Link to="/admin/unapproved" className="cart-buttons home">
              <p>
                <i class="fas fa-cogs"></i>
              </p>
              <p>Admin</p>
            </Link>
          )}
          <Link to="/" className="cart-buttons home">
            <p>
              <i className="fas fa-home"></i>
            </p>
            <p>Home</p>
          </Link>
          <Link to="/logout" className="cart-buttons home">
            <p>
              <i className="fas fa-sign-out-alt"></i>
            </p>
            <p>Logout</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccountNavbar;
