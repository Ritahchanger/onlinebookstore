import React, { useState } from "react";
import ProfileImage from "../../../assets/icons/boy.png";
import "./Account.css";
import { Link } from "react-router-dom"
import ArrowBack from "../../../assets/icons/arrow.png"
const Account = () => {
  const [isProfileShown, setIsProfileShown] = useState(false);

  const [terminateModal, setTerminateModal] = useState(false);

  const handleTerminateModal = () => {
    setTerminateModal(!terminateModal);
  };

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
        <button className="profile-button" onClick={handleTerminateModal}>
          REQUEST ACCOUNT TERMINATION?
        </button>
      </div>

      <div className="books">
        <div className="header">
          <div className="navigation-items">
            <p className="arrow-back">
             <Link to="/shop"><img src={ArrowBack} alt="" /></Link>
            </p>
            <p className="menu-icon" onClick={handleProfileModal}>
              <img src={ProfileImage} alt="" />
            </p>
          </div>
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
            <p className="small-header">Pending Approvals</p>
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

        <div className="grid">
          <div className="card publishing">
            <p className="small-header">Editing and Publishing</p>
            <div className="instructions">
              <p>
                Before publishing a book, it has to be approved by the company.
                Then necessary charges relating to the book, considering issues
                like pages and length, will be calculated.After approval, you'll
                be notified by the system.
              </p>
            </div>
            <div className="uploading">
              <div className="input-group">
                <p className="file">Upload Ebook Here!</p>
                <input type="file" name="uploadEbook" id="uploadEbook" />
              </div>
              <div className="input-group">
                <p className="file">Upload Audio Here!</p>
                <input type="file" name="uploadAudio" id="uploadAudio" />
              </div>
            </div>
          </div>

          <div className="card">
            <p className="small-header">Books Read</p>
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Author</td>
                  <td>View</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The Great Kenya</td>
                  <td>Margaret Ogolla</td>
                  <td>
                    <p>
                      <i class="fa fa-eye"></i>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>The Great Kenya</td>
                  <td>Margaret Ogolla</td>
                  <td>
                    <p>
                      <i class="fa fa-eye"></i>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>The Great Kenya</td>
                  <td>Margaret Ogolla</td>
                  <td>
                    <p>
                      <i class="fa fa-eye"></i>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>The Great Kenya</td>
                  <td>Margaret Ogolla</td>
                  <td>
                    <p>
                      <i class="fa fa-eye"></i>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>The Great Kenya</td>
                  <td>Margaret Ogolla</td>
                  <td>
                    <p>
                      <i class="fa fa-eye"></i>
                    </p>
                  </td>
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

      <div
        className={`terminate-account-modal ${terminateModal ? "active" : ""}`}
      >
        <form>
          <a href="#" className="close-modal" onClick={handleTerminateModal}>
            &times;
          </a>
          <p className="medium-header">ACCOUNT TERMINATION</p>
          <div className="input-group">
            <input
              type="email"
              name="email"
              id=""
              placeholder="Enter your email.."
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              id=""
              placeholder="Enter your password.."
            />
          </div>
          <div className="input-group">
            <input type="submit" value="REQUEST TERMINATION" />
          </div>
        </form>
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
