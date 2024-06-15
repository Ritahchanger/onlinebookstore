import { Link } from "react-router-dom";
import "./Navbar.css";
import ProfileImage from "../../../assets/images/bemi.png";

import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const isAdmin = user?.user?.roles?.includes("admin");

  return (
    <nav className="nav">
      <section className="section-a">
        <div className="container">
          <div className="phone-number">
            <span>+254 712 633413</span>
          </div>
          <div className="social-media-links">
            <i className="fab fa-facebook"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </section>
      <section className="section-b">
        <div className="container">
          <div className="profile-logo">
            <a href="#">
              <img src={ProfileImage} alt="" />
            </a>
          </div>

          {/* <div className="search_container">
            <input type="text" placeholder="Search..." />
            <button className="search">
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
          </div> */}

          <div className="section-navigation">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <p className="nav-li">
                    <Link to="/admin/unapproved" className="cart-buttons">
                      ADMIN
                    </Link>
                  </p>
                )}
                <p className="nav-li">
                  <Link to="/pending-payments" className="cart-buttons">
                    CART
                  </Link>
                </p>
                <p className="nav-li">
                  <Link to="/account" className="cart-buttons">
                    ACCOUNT
                  </Link>
                </p>
                <p className="nav-li">
                  <Link to="/logout" className="cart-buttons">
                    LOGOUT
                  </Link>
                </p>
              </>
            ) : (
              <>
                <p className="nav-li">
                  <Link to="/cart" className="cart-buttons">
                    CART
                  </Link>
                </p>

                <p className="nav-li">
                  <Link to="/account" className="cart-buttons">
                    ACCOUNT
                  </Link>
                </p>
                <p className="nav-li">
                  <Link to="/login" className="cart-buttons">
                    LOGIN
                  </Link>
                </p>
                <p className="nav-li">
                  <Link to="/signup" className="cart-buttons">
                    SIGNUP
                  </Link>
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
