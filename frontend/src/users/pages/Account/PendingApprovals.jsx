import "./Account.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useEffect, useState } from "react";
import ActiveBooks from "./ActiveBooks";
import TerminationModel from "../../components/TerminationModel/TerminationModel";

const PendingApprovals = () => {
  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
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

      <div className="my-books">
        <div className="container">
          <p className="medium-header">PENDING APPROVALS</p>
          <table>
            <thead>
              <tr>
                <td>NAME</td>
                <td>AUTHOR</td>
                <td>VIEW</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <TerminationModel
        handleTerminationModel={handleTerminationModel}
        terminationModel={terminationModel}
      />
    </div>
  );
};

export default PendingApprovals;
