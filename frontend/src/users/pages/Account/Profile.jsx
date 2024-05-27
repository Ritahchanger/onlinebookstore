import "./Profile.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useState } from "react";


const Profile = () => {

  const [sidebar,showSidebar] = useState(false)

  const handleSidebar = () =>{
    showSidebar(!sidebar)
  }

  return (
    <div className="account">
      <AccountNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <SideBar sidebar={sidebar}/>
      <div className="profile">
        <p className="medium-header">PROFILE SECTION</p>
      </div>
    </div>
  );
};

export default Profile;
