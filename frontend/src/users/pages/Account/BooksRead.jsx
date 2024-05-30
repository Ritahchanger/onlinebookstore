import "./Account.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useEffect, useState } from "react";
import ActiveBooks from "./ActiveBooks";
import TerminationModel from "../../components/TerminationModel/TerminationModel";

const BooksRead = () => {
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
          <p className="medium-header">BOOKS READ</p>
          <div className="table_wrapper">
            <table>
              <thead>
                <tr>
                  <td>NAME</td>
                  <td>AUTHOR</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Kifo kisimani</td>
                  <td>Dennis Munyao</td>
                </tr>
                <tr>
                  <td>Kifo kisimani</td>
                  <td>Dennis Munyao</td>
                </tr>
                <tr>
                  <td>Kifo kisimani</td>
                  <td>Dennis Munyao</td>
                </tr>
                <tr>
                  <td>Kifo kisimani</td>
                  <td>Dennis Munyao</td>
                </tr>
                <tr>
                  <td>Kifo kisimani</td>
                  <td>Dennis Munyao</td>
                </tr>
                <tr>
                  <td>Kifo kisimani</td>
                  <td>Dennis Munyao</td>
                </tr>
                <tr>
                  <td>Kifo kisimani</td>
                  <td>Dennis Munyao</td>
                </tr>
                <tr>
                  <td>Kifo kisimani</td>
                  <td>Dennis Munyao</td>
                </tr>
                <tr>
                  <td>Kifo kisimani</td>
                  <td>Dennis Munyao</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TerminationModel
        handleTerminationModel={handleTerminationModel}
        terminationModel={terminationModel}
      />
    </div>
  );
};

export default BooksRead;
