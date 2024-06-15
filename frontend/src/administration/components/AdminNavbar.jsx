import "./AdminNavbar.css";

import { Link } from "react-router-dom";
import CloseIcon from "../../assets/icons/close.png";

import ProfileImage from "../../assets/icons/boy.png";

import { useSelector } from "react-redux";

import Config from "../../Config";

const AdminNavbar = ({ handleSidebar, sidebar }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="adminNavbar">
      {sidebar ? (
        <p className="close-icon" onClick={handleSidebar}>
          <img src={CloseIcon} alt="" />
        </p>
      ) : (
        <p className="menu-icon" onClick={handleSidebar}>
          &#9776;
        </p>
      )}
      <div className="section id">
        <p>SYSTEM ID</p>
        <p className="subtitles" style={{ color: "var(--orange)" }}>
          {user.user.userId}
        </p>
      </div>
      <p className="small-header" style={{ color: "var(--orange)" }}>
        ADMINISTRATION PANEL
      </p>
      <Link to="/account" className="linker cart-buttons">
        ACCOUNT
      </Link>
      <Link to="/" className="linker cart-buttons">
        HOME
      </Link>
      <div className="profile-section">
        {user.user.passport ? (
          <Link to="/profile">
            <div className="img-wrapper">
              <img
                src={`${Config.apiUrl}/upload/authors/${user.user.passport}`}
                alt=""
              />
            </div>
          </Link>
        ) : (
          <Link to="/profile">
            <div className="img-wrapper">
              <img src={ProfileImage} alt="" />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
