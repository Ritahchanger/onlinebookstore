import "./SideBar.css";
import { NavLink } from "react-router-dom";
import CloseIcon from "../../../assets/icons/close.png";

const SideBar = ({ sidebar, handleTerminationModel }) => {
  return (
    <div className={`sidebar ${sidebar && "active"}`}>
      <ul className="sidebar-navigation">
        <li>
          <NavLink to="/account" activeClassName="active">
            <p>
              <i className="fas fa-book"></i>
            </p>
            <p>Active Books</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/pending-payments" activeClassName="active">
            <p>
              <i className="fas fa-money-bill-wave"></i>
            </p>
            <p>Pending Payments</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/mybooks" activeClassName="active">
            <p>
              <i className="fas fa-book-open"></i>
            </p>
            <p>Published Books</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/approvals" activeClassName="active">
            <p>
              <i className="fas fa-hourglass-half"></i>
            </p>
            <p>Pending Approvals</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/editing-publishing" activeClassName="active">
            <p>
              <i className="fas fa-pen"></i>
            </p>
            <p>Editing & Publishing</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/books-read" activeClassName="active">
            <p>
              <i className="fas fa-check"></i>
            </p>
            <p>Books Read</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/payment-details" activeClassName="active">
            <p>
              <i className="fas fa-credit-card"></i>
            </p>
            <p>Payment Details</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="#" onClick={handleTerminationModel}>
            <p>
              <i className="fas fa-times"></i>
            </p>
            <p>Terminate Account</p>
          </NavLink>
        </li>
      </ul>
      <div className="section amount">
        <p>Amount</p>
        <p>sh 78,000</p>
      </div>
    </div>
  );
};

export default SideBar;
