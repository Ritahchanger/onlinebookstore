import "./SideBar.css";
import { Link } from "react-router-dom";
import CloseIcon from "../../../assets/icons/close.png";
const SideBar = ({ sidebar,handleTerminationModel }) => {
  return (
    <div className={`sidebar ${sidebar && "active"}`}>
      <ul className="sidebar-navigation">
        <li>
          <Link to="#">
            <p>
              <i class="fas fa-book"></i>
            </p>
            <p>Active Books</p>
          </Link>
        </li>
        <li>
          <Link to="#">
            <p>
              <i class="fas fa-money-bill-wave"></i>
            </p>
            <p>Pending Payments</p>
          </Link>
        </li>
        <li>
          <Link to="#">
            <p>
              <i class="fas fa-book-open"></i>
            </p>
            <p>My Books</p>
          </Link>
        </li>
        <li>
          <Link to="#">
            <p>
              <i class="fas fa-hourglass-half"></i>
            </p>
            <p>Pending Approvals</p>
          </Link>
        </li>
        <li>
          <Link to="#">
            <p>
              <i class="fas fa-pen"></i>
            </p>
            <p>Editing & Publishing</p>
          </Link>
        </li>
        <li>
          <Link to="#">
            <p>
              <i class="fas fa-check"></i>
            </p>
            <p>Books Read</p>
          </Link>
        </li>
        <li>
          <Link to="#">
            <p>
              <i class="fas fa-credit-card"></i>
            </p>
            <p>Payment Details</p>
          </Link>
        </li>
        <li>
          <Link to="#" onClick={handleTerminationModel}>
            <p>
              <i class="fas fa-times"></i>
            </p>
            <p>Terminate Account</p>
          </Link>
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
