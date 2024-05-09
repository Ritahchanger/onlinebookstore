import React from "react";
import { companyData } from "../Data/FooterData";
import "./Footer.css"


const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
              aspernatur, consequatur sunt quisquam rem quidem?
            </p>
            <ul className="social_media">
              <li>
                <a href="#">
                  <i class="fa-brands fa-facebook"></i>
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
          <div className="col company">
            <p className="small-header">COMPANY</p>
            <div className="company_data">
              {companyData.map((item, index) => (
                <p>
                  <a href={item.path}>{item.name}</a>
                </p>
              ))}
            </div>
          </div>
          <div className="col company">
            <p className="small-header">COMPANY</p>
            <div className="company_data">
              {companyData.map((item, index) => (
                <p>
                  <a href={item.path}>{item.name}</a>
                </p>
              ))}
            </div>
          </div>
          <div className="col company">
            <p className="small-header">COMPANY</p>
            <div className="company_data">
              {companyData.map((item, index) => (
                <p>
                  <a href={item.path}>{item.name}</a>
                </p>
              ))}
            </div>
          </div>
         
        </div>
        <hr />
        <div className="section-b-footer">
          <p className="description">
            &copy; 2024 Bemi Tech<br/>All rights preserved
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
