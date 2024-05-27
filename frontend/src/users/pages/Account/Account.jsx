import "./Account.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useState } from "react";


const Account = () => {

  const [sidebar,showSidebar] = useState(false)

  const handleSidebar = () =>{
    showSidebar(!sidebar)
  }

  return (
    <div className="account">
      <AccountNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <SideBar sidebar={sidebar}/>
    </div>
  );
};

export default Account;
