import React, { useState } from "react";
import ProfileImage from "../../../assets/icons/boy.png";
import "./Account.css";

const Account = () => {
  const [isProfileShown, setIsProfileShown] = useState(false);

  const handleProfileModal = () => {
    setIsProfileShown(!isProfileShown);
  };

  return (
    <div className="account">
      <div className={`profile ${isProfileShown && "active"}`}>
        <p className={`close-icon modal-icon`} onClick={handleProfileModal}>
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

        <div className="grid">
          <div className="card">
            <p className="small-header">Active Books</p>

            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Purchases</td>
                  <td>Amount Paid</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The great kenya</td>
                  <td>60,000</td>
                  <td>70,000</td>
                </tr>
                <tr>
                  <td>The great kenya</td>
                  <td>60,000</td>
                  <td>70,000</td>
                </tr>
                <tr>
                  <td>The great kenya</td>
                  <td>60,000</td>
                  <td>70,000</td>
                </tr>
                <tr>
                  <td>The great kenya</td>
                  <td>60,000</td>
                  <td>70,000</td>
                </tr>
                <tr>
                  <td>The great kenya</td>
                  <td>60,000</td>
                  <td>70,000</td>
                </tr>
                <tr>
                  <td>The great kenya</td>
                  <td>60,000</td>
                  <td>70,000</td>
                </tr>
                <tr>
                  <td>The great kenya</td>
                  <td>60,000</td>
                  <td>70,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card">
            <p className="small-header">Pending Books</p>
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Purchases</td>
                  <td>Amount Paid</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The great kenya</td>
                  <td>60,000</td>
                  <td>70,000</td>
                </tr>
                <tr>
                  <td>The great kenya</td>
                  <td>60,000</td>
                  <td>70,000</td>
                </tr>
                <tr>
                  <td>The great kenya</td>
                  <td>60,000</td>
                  <td>70,000</td>
                </tr>
                <tr>
                  <td>The great kenya</td>
                  <td>60,000</td>
                  <td>70,000</td>
                </tr>
                <tr>
                  <td>The great kenya</td>
                  <td>60,000</td>
                  <td>70,000</td>
                </tr>
                <tr>
                  <td>The great kenya</td>
                  <td>60,000</td>
                  <td>70,000</td>
                </tr>
                <tr>
                  <td>The great kenya</td>
                  <td>60,000</td>
                  <td>70,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="my-books">
          <p className="small-header">My Books</p>
          <table>
            <thead>
              <tr>
                <td>NAME</td>
                <td>VIEWS</td>
                <td>PURCHASES</td>
                <td>RATINGS</td>
                <td>REVIEWS</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>The Great Kenya</td>
                <td>78,000</td>
                <td>67</td>
                <td>5</td>
                <td>8000</td>
              </tr>
              <tr>
                <td>The Great Kenya</td>
                <td>78,000</td>
                <td>67</td>
                <td>5</td>
                <td>8000</td>
              </tr>
              <tr>
                <td>The Great Kenya</td>
                <td>78,000</td>
                <td>67</td>
                <td>5</td>
                <td>8000</td>
              </tr>
              <tr>
                <td>The Great Kenya</td>
                <td>78,000</td>
                <td>67</td>
                <td>5</td>
                <td>8000</td>
              </tr>
              <tr>
                <td>The Great Kenya</td>
                <td>78,000</td>
                <td>67</td>
                <td>5</td>
                <td>8000</td>
              </tr>
              <tr>
                <td>The Great Kenya</td>
                <td>78,000</td>
                <td>67</td>
                <td>5</td>
                <td>8000</td>
              </tr>
            </tbody>
          </table>
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
