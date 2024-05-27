import "./AccountNavbar.css";
import { Link } from "react-router-dom";
import CloseIcon from "../../../assets/icons/close.png";
import ProfileIcon from "../../../assets/icons/boy.png";

const AccountNavbar = ({ handleSidebar, sidebar }) => {
  return (
    <div className="account-navigation">
      {sidebar ? (
        <div className="menu-icon">
          <p onClick={handleSidebar}>&#9776;</p>
        </div>
      ) : (
        <div className="close-icon">
          <img src={CloseIcon} alt="" onClick={handleSidebar} />
        </div>
      )}

      <div className="section">
        <p>Joined on</p>
        <p>7-may-2015</p>
      </div>
      <div className="section">
        <p>Amount</p>
        <p>sh 78,000</p>
      </div>
      <div className="section">
        <p>ID</p>
        <p>8986787</p>
      </div>

      <div className="profile">
        <div className="img-wrapper">
          <img src={ProfileIcon} alt="" />
        </div>
        <div className="name">
          <p>settings</p>
        </div>
      </div>
    </div>
  );
};

export default AccountNavbar;
