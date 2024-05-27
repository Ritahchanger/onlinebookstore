import "./Account.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useState } from "react";


const Account = () => {

  const [sidebar,showSidebar] = useState(false)

  return (
    <div className="account">
      <AccountNavbar/>
      <SideBar/>
    </div>
  );
};

export default Account;
