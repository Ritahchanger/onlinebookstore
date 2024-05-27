import "./AccountNavbar.css";
import { Link } from "react-router-dom";
import CloseIcon from "../../../assets/icons/close.png"
import ProfileIcon from "../../../assets/icons/boy.png";


const AccountNavbar = () => {
  return (
    <div className="account-navigation">
      <div className="close-icon">
        <img src={CloseIcon} alt="" />
      </div>
      <div className="menu-icon">
        <p>&#9776;</p>
      </div>
      <div className="profile-section">
        <div className="img-wrapper">
          <img src={ProfileIcon} alt="" />
        </div>
        <div className="name">settings</div>
      </div>
    </div>
  );
};

export default AccountNavbar;
