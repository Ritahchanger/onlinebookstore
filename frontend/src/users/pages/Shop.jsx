import React, { useEffect } from "react";
import LowerNavbar from "../components/LowerNavbar/LowerNavbar";

import NewRelease from "../components/HomePageComponents/NewReleases/NewRelease";

import SectionTitle from "../components/shopComponents/SectionTitle";

import "./Shop.css";

import BooksList from "../components/shopComponents/BooksList";

const Shop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shop">
      <LowerNavbar />
      <SectionTitle sectionTitle="MOST SELLING BOOKS" />
      <div className="container">
        <div className="grid">
          
        </div>
      </div>
      <NewRelease />
    </div>
  );
};

export default Shop;
