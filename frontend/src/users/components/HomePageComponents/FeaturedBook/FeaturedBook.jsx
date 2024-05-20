import React from "react";
import FeaturedImage from "../../../../assets/images/cover4.jpg";

import "./FeatureBook.css";

const FeaturedBook = () => {
  return (
    <div className="featured">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="medium-header">Featured Book</p>
            <div className="img-wrapper">
              <img src={FeaturedImage} alt="" />
            </div>
          </div>
          <div className="col">
            <p className="small-header book-title">Soul</p>
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              expedita magni, aut iste culpa voluptate.
            </p>
            <p className="description featured-description">7,878</p>
            <p className="description featured-description">sh 6500</p>

            <div className="row">
              <button className="cart-buttons">VIEW MORE</button>
              <button className="cart-buttons">ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBook;
