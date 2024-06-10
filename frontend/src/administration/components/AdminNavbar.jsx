import "./AdminNavbar.css";
import CloseIcon from "../../assets/icons/close.png";

import ProfileImage from "../../assets/icons/boy.png"

const AdminNavbar = ({ handleSidebar, sidebar }) => {
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
      <p className="small-heade">
        ADMINISTRATION PANEL
      </p>
      <div className="profile-section">
        <div className="img-wrapper">
          <img src={ProfileImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
