import "./Account.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useState } from "react";
import ActiveBooks from "./ActiveBooks";
import TerminationModel from "../../components/TerminationModel/TerminationModel";

import "./EditingAndPublishing.css"

import { useSelector } from "react-redux"; 

const Account = () => {

  const accountTerminationRequest = useSelector((state)=>state.accountTermination.accountTerminationRequest);

  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(accountTerminationRequest);
  const handleSidebar = () => {
    showSidebar(!sidebar);
  };
  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };
  return (
    <div className="account">
      <AccountNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <SideBar
        sidebar={sidebar}
        handleTerminationModel={handleTerminationModel}
      />
      <TerminationModel
        handleTerminationModel={handleTerminationModel}
        terminationModel={terminationModel}
      />
      <ActiveBooks/>
    </div>
  );
};

export default Account;

