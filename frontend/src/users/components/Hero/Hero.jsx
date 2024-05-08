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
            <p className="header_title">Welcome!</p>
            <p className="description">
              Our online bookstore is a sanctuary for book lovers,
              <br />
              Offering an extensive collection of genres ranging from gripping
              <br />
              Thrillers to heartwarming romances, insightful non-fiction to
              enchanting children's tales.Immerse yourself in the magic of words as you explore our curated
              selection of bestselling novels,
              <br /> timeless classics, and hidden gems waiting to be
              discovered.
            </p>
            <a href="#" className="hero-btn">
              READ MORE
            </a>
          </div>
          <div className="col">
            <img src={BannerImage} alt="" />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Hero;
