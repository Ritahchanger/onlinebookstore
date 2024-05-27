import "./AccountNavbar.css";
import { Link } from "react-router-dom";
import CloseIcon from "../../../assets/icons/close.png";
import ProfileIcon from "../../../assets/icons/boy.png";

import { useNavigate } from "react-router-dom";

const AccountNavbar = ({ handleSidebar, sidebar }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/profile");
  };

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

      <div className="section date">
        <p>Joined on</p>
        <p>7-may-2015</p>
      </div>
      <div className="section amount">
        <p>Amount</p>
        <p>sh 78,000</p>
      </div>
      <div className="section id">
        <p>ID</p>
        <p>8986787</p>
      </div>

      <div className="profile-section">
        <div className="img-wrapper">
          <img src={ProfileIcon} alt="" onClick={handleNavigation} />
        </div>
        {/* <div className="name">
          <p>settings</p>
        </div> */}
      </div>
    </div>
  );
};

export default AccountNavbar;
