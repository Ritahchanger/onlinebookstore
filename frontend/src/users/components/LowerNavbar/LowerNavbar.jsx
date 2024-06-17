import React, { useEffect, useState } from "react";
import { sectioncNavigation } from "../Data/NavbarData";
import ProfileImage from "../../../assets/images/bemi.png";
import "./LowerNavbar.css";

import { Link, NavLink } from "react-router-dom";

const LowerNavbar = () => {
  const [isFixed, setIsFixed] = useState(false);

  const [sidebar, setSideBar] = useState(false);

  const [activeIndex, setActiveIndex] = useState(null);


  const [dropdownArrow, showDropDownArrow] = useState(false);


  const handleArrow = () => {
    showDropDownArrow(!dropdownArrow);
  };

  const handleSideBar = () => {
    setSideBar(!sidebar);
    showDropDownArrow(!dropdownArrow);
  };
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 100) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div className={isFixed ? "lower_navbar fixed" : "lower_navbar"}>
      <div className="container">
        <div className="profile-logo">
          <NavLink to="/" activeClassName="active">
            <img src={ProfileImage} alt="" />
          </NavLink>
        </div>

        <div className={`navigation ${sidebar ? "active" : null}`}>
          <a
            href="#"
            className="close-menu"
            style={{ fontSize: "3rem" }}
            id="close-menu"
            onClick={handleSideBar}
          >
            &times;
          </a>
          <div className="nav-ul">
            {sectioncNavigation.map((item) => (
              <p
                key={item.path}
                className="nav_li"
                
              >
                <NavLink to={item.path} activeClassName="active">
                  {item.menu_name}
                </NavLink>
                {item.navItems && (
                  <>
                    <Link to="#" className="angle">
                      <i className="fa fa-angle-down"></i>
                    </Link>
                    <Link to="#" className="arrow">
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </>
                )}
              </p>
            ))}
          </div>
          <div className="accounts">
            <p onClick={handleSideBar}>
              <Link to="/account">ACCOUNT</Link>
            </p>
            <p onClick={handleSideBar}>
              <Link to="/login">LOGIN</Link>
            </p>
          </div>
        </div>
        <div className="left-icon">
         
          
          <Link to="#" className="menu-icon" onClick={handleSideBar}>
            <i className="fa-solid fa-bars-staggered"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LowerNavbar;
