import React, { useEffect, useState } from "react";
import { sectioncNavigation } from "../Data/NavbarData";
import ProfileImage from "../../../assets/images/bemi.png";
import "./LowerNavbar.css";
const LowerNavbar = () => {
  const [isFixed, setIsFixed] = useState(false);

  const [sidebar, setSideBar] = useState(false);

  const handleSideBar = () => {
    setSideBar(!sidebar);
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
          <a href="#">
            <img src={ProfileImage} alt="" />
          </a>
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
              <p key={index} className="nav_li">
                <a href={item.path}>{item.menu_name}</a>
              </p>
            ))}
          </div>
        </div>

        <a href="#" className="menu-icon" onClick={handleSideBar}>
          <i class="fa-solid fa-bars-staggered"></i>
        </a>
      </div>
    </div>
  );
};

export default LowerNavbar;
