import { Link, NavLink } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = ({ sidebar }) => {
  return (
    <div className={`sidebar ${sidebar && "active"}`}>
      <ul className="sidebar-navigation">
        <li>
          <NavLink to="/admin/unapproved" activeClassName="active">
            <p>
              <i className="fas fa-book"></i>
            </p>
            <p>Unapproved Books</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/all-books" activeClassName="active">
            <p>
              <i className="fas fa-book-open"></i>
            </p>
            <p>Available Books</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/termination-accounts" activeClassName="active">
            <p>
              <i className="fas fa-user-times"></i>
            </p>
            <p>Termination Accounts</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/blogs" activeClassName="active">
            <p>
              <i className="fas fa-blog"></i>
            </p>
            <p>Blogs</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/authors" activeClassName="active">
            <p>
              <i className="fas fa-user-edit"></i>
            </p>
            <p>Authors</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/users" activeClassName="active">
            <p>
              <i className="fas fa-users"></i>
            </p>
            <p>Users</p>
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
          <Link to="/logout">
            <p>
              <i className="fas fa-sign-out-alt"></i>
            </p>
            <p>Logout</p>
          </Link>
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
