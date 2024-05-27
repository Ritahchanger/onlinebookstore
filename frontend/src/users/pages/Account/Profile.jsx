import "./Profile.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useState } from "react";
import ProfileDetail from "./ProfileDetail";
import ProfileIcon from "../../../assets/icons/boy.png";

const Profile = () => {
  const [sidebar, showSidebar] = useState(false);

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  return (
    <div className="account">
      <AccountNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <SideBar sidebar={sidebar} />
      <div className="profile">
        <p className="medium-header">PROFILE SECTION</p>
        <div className="container">
          <div className="user-information">
              <div className="profile-card">
                <div className="profile-image">
                  <img src={ProfileIcon} alt="Profile" />
                </div>
                <p>Edit Profile</p>
                <input type="file" name="change-profile" id="" />
              </div>
              <div className="profile-card">
                <p className="small-header">JeremyRose</p>
                <p className="description">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Distinctio, dolore, iste odio recusandae in totam nihil,
                  molestias officia voluptates error perspiciatis suscipit.
                  Reprehenderit ducimus.
                </p>

                <div className="row profile-details">
                  <p className="small-header">Phone</p>
                  <p className="small-header">0712195228</p>
                </div>
                <div className="row profile-details">
                  <p className="small-header">Email</p>
                  <p className="small-header">peterdennis573@gmail.com</p>
                </div>
                <div className="row profile-details">
                  <p className="small-header">ID</p>
                  <p className="small-header">34758235</p>
                </div>
              </div>
            </div>
            <div className="main-section">
                
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
