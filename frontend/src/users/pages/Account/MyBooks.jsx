import "./Account.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useEffect, useState } from "react";
import ActiveBooks from "./ActiveBooks";
import TerminationModel from "../../components/TerminationModel/TerminationModel";

const MyBooks = () => {
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
          <p className="medium-header">PUBLISHED BOOKS</p>
          <table>
            <thead>
              <tr>
                <td>NAME</td>
                <td>AUTHOR</td>
                <td>REVIEWS</td>
                <td>RATINGS</td>
                <td>VIEW</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>78000</td>
                <td>5</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>78000</td>
                <td>5</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>78000</td>
                <td>5</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>78000</td>
                <td>5</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>78000</td>
                <td>5</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>78000</td>
                <td>5</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>78000</td>
                <td>5</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>78000</td>
                <td>5</td>
                <td>
                  {" "}
                  <i class="fa fa-eye"></i>
                </td>
              </tr>
              <tr>
                <td>Kifo kisimani</td>
                <td>Dennis Munyao</td>
                <td>78000</td>
                <td>5</td>
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

export default MyBooks;
