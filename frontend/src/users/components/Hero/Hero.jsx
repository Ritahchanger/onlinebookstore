import React, { Fragment } from "react";
import "./Hero.css";
import Navbar from "../navigation/Navbar";
import BannerImage from "../../../assets/images/book.jpg";
import LowerNavbar from "../LowerNavbar/LowerNavbar";
import "./Hero.css";
const Hero = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="hero">
        <LowerNavbar />
        <div className="hero_content">
          <div className="col">
            <p className="header_title">Find Your Favourite<br/><span style={{color:"var(--blue)"}}>Book Here</span></p>
            <p className="description">
              Our online bookstore is a sanctuary for book lovers,
              <br />
              Offering an extensive collection of genres ranging from gripping
              <br />
              Thrillers to heartwarming romances, insightful non-fiction to
              enchanting children's tales.
            </p>
            <a href="#" className="hero-btn">
              READ MORE
            </a>
          </div>
          <div className="col">
            <img src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
