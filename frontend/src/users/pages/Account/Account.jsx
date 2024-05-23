import React, { useState } from "react";
import ProfileImage from "../../../assets/icons/boy.png";
import "./Account.css";

const Account = () => {
  const [isProfileShown, setIsProfileShown] = useState(true);

  const handleProfileModal = () => {
    setIsProfileShown(!isProfileShown);
  };

  return (
    <div className="account">
      <div className={ `profile ${isProfileShown && "active" }` }>
        <p
          className={`close-icon modal-icon`}
          onClick={handleProfileModal}
        >
          &times;
        </p>

        <div className="img-wrapper">
          <img src={ProfileImage} alt="Profile" />
        </div>
        <div className="profile-card">
          <ProfileDetail label="Name" value="Christoper Munyao" />
          <ProfileDetail label="Id No" value="678979" />
          <ProfileDetail label="Email" value="admin@gmail.com" />
          <ProfileDetail label="Date Joined" value="7-may-2024" />
          <ProfileDetail label="Books Income" value="sh 89,000" />
        </div>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          provident dicta, consequuntur quidem corporis fugit.
        </p>
        <button className="profile-button">REQUEST ACCOUNT TERMINATION?</button>
      </div>

      <div className="books">
        <div className="header">
          <p className="modal-icon menu-icon" onClick={handleProfileModal}>
            &#9776;
          </p>
          <p className="medium-header">BOOKS MANAGEMENT</p>
        </div>
      </div>
    </div>
  );
};

const ProfileDetail = ({ label, value }) => (
  <p className="profile-description">
    <span>{label}</span>
    <span className="value">{value}</span>
  </p>
);

export default Account;
