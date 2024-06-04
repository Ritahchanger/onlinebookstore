import "./SideBar.css";
import { Link, NavLink } from "react-router-dom";
import CloseIcon from "../../../assets/icons/close.png";

import { useDispatch, useSelector } from "react-redux";

import { logout } from "../../Redux/features/authSlice";

import { useNavigate } from "react-router-dom";

import { authenticateTerminatingUser } from "../../Redux/features/AccountTerminationSlice";

import axios from "axios";

const SideBar = ({ sidebar, handleTerminationModel }) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const accountTerminationRequest = useSelector(
    (state) => state.accountTermination.accountTerminationRequest
  );

  const handleAccountTermination = () => {
    const user = {
      userId: "39688058",
      phoneNo: "0712195228",
    };

    dispatch(authenticateTerminatingUser(user));
  };

  const handleUserLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout"
      );

      navigate("/login");

      dispatch(logout());
    } catch (error) {
      console.log(`A process occurred ${error.message}`);
    }
  };

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
            <p>Previously read books</p>
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
          <NavLink to="/login" onClick={handleAccountTermination}>
            <p>
              <i className="fas fa-times"></i>
            </p>
            <p>Terminate Account</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/" activeClassName="active">
            <p>
              <i className="fas fa-home"></i>
            </p>
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <Link to="#" onClick={handleUserLogout}>
            <p>
              <i className="fas fa-lock-open"></i>
            </p>
            <p>Logout</p>
          </Link>
        </li>
      </ul>
      <div className="section amount">
        <p>Amount</p>
        <p>sh 78,000</p>
      </div>
      <p className="link-text">
        <Link to="/shop">
          {" "}
          <i className="fa fa-arrow-left"></i>Continue shopping?
        </Link>
      </p>
    </div>
  );
};

export default SideBar;
