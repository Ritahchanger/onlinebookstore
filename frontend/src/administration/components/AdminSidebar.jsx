import { Link, NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = ({ sidebar }) => {
  return (
    <div className={`sidebar ${sidebar ? "active" : ""}`}>
      <ul className="sidebar-navigation">
        <li>
          <NavLink
            to="/admin/unapproved"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <p>
              <i className="fas fa-book"></i>
            </p>
            <p>Unapproved Books</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/all-books"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <p>
              <i className="fas fa-book-open"></i>
            </p>
            <p>Available Books</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/termination-accounts"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <p>
              <i className="fas fa-user-times"></i>
            </p>
            <p>Termination Accounts</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/blogs"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <p>
              <i className="fas fa-blog"></i>
            </p>
            <p>Blogs</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/authors"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <p>
              <i className="fas fa-user-edit"></i>
            </p>
            <p>Authors</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <p>
              <i className="fas fa-users"></i>
            </p>
            <p>Users</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/newsletter"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <p>
              <i className="fas fa-envelope"></i>
            </p>
            <p>NewsLetter</p>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/withdrawals"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <p>
              <i class="fas fa-dollar-sign"></i>
            </p>
            <p>Withdrawals requests!</p>
          </NavLink>
        </li>
      </ul>
      <p className="link-text">
        <Link to="/shop">
          <i className="fas fa-arrow-left"></i> Continue Shopping?
        </Link>
      </p>
    </div>
  );
};

export default AdminSidebar;
