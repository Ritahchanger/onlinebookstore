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
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/+254716271688`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-whatsapp"></i> {/* WhatsApp icon */}
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.youtube.com/channel/UC5B7dUS0pH45tASZ_IOgofg"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-youtube"></i> {/* YouTube icon */}
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
