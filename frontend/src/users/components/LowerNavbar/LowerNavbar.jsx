import React, { useEffect, useState } from "react";
import { sectioncNavigation } from "../Data/NavbarData";
import ProfileImage from "../../../assets/images/bemi.png";
import "./LowerNavbar.css";

import { Link } from "react-router-dom";

const LowerNavbar = () => {
  const [isFixed, setIsFixed] = useState(false);

  const [sidebar, setSideBar] = useState(false);

  const [activeIndex, setActiveIndex] = useState(null);

  const [cartIcons, displayCartIcons] = useState(false);

  const [dropdownArrow, showDropDownArrow] = useState(false);

  const handleCartIcons = () => {
    displayCartIcons(!cartIcons);
  };

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

  const handleActiveNavItems = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={isFixed ? "lower_navbar fixed" : "lower_navbar"}>
      <div className="container">
        <div className="profile-logo">
          <Link to="/home">
            <img src={ProfileImage} alt="" />
          </Link>
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
            {sectioncNavigation.map((item, index) => (
              <p
                key={index}
                className={`nav_li ${index === activeIndex ? "active" : ""}`}
                onClick={() => handleActiveNavItems(index)}
              >
                <Link to={item.path}>{item.menu_name}</Link>
                {item.navItems && (
                  <>
                    <Link to="#" className="angle">
                      <i class="fa fa-angle-down"></i>
                    </Link>
                    <Link to="#" className="arrow">
                      <i className="fa fa-arrow-right"></i>
                    </Link>
                  </>
                )}
                <div className="child_navigation">
                  {item.navItems &&
                    item.navItems.map((navli, index) => (
                      <div className="sub_navigation">
                        <p className="small-header">{navli.booksTypes}</p>
                        {navli.books &&
                          navli.books.map((book, index) => (
                            <ul key={index}>
                              <p>
                                <Link to="#">{book}</Link>
                              </p>
                            </ul>
                          ))}
                      </div>
                    ))}
                </div>
              </p>
            ))}
          </div>
          <div className="accounts">
            <p onClick={handleSideBar}>
              <Link to="#">ACCOUNT</Link>
            </p>
            <p onClick={handleSideBar}>
              <Link to="/login">LOGIN</Link>
            </p>
          </div>
        </div>
        <div className="left-icon">
          <p
            className={`angle ${dropdownArrow ? "active" : ""}`}
            onClick={() => {
              handleCartIcons();
              handleArrow();
            }}
          >
            <i class="fa-sharp fa-solid fa-angle-down"></i>
          </p>
          <div className={`cart-icons ${cartIcons ? "active" : ""}`}>
            <Link to="/cart">
              <sup>4</sup> <i class="fa-solid fa-cart-shopping"></i>
            </Link>
            <Link to="#">
              {" "}
              <i class="fa-solid fa-heart"></i>
            </Link>
          </div>
          <Link to="#" className="menu-icon" onClick={handleSideBar}>
            <i class="fa-solid fa-bars-staggered"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LowerNavbar;
