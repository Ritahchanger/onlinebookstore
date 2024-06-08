import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom"; 

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="section">
          <ul className="social_media">
            <li>
              <Link to="#">
              <i class="fa-brands fa-facebook"></i>
              </Link>
            </li>
            <li>
              <a href="#">
                <i class="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
              <i className="fab fa-whatsapp"></i> 
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa-brands fa-twitter"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fa-brands fa-youtube"></i>
              </a>
            </li>
          </ul>
        </div>
        <hr />
        <div className="section-b-footer">
          <p className="description">
            &copy; 2024 Bemi Tech
            <br />
            All rights preserved
          </p>
          <p className="description">
            <span>Privacy</span>
            <span>Terms of Service</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
