import React, { useState, useEffect } from "react";
import axios from "axios";
import FeaturedImage from "../../../../assets/images/cover4.jpg";
import "./FeatureBook.css";

const FeaturedBook = () => {
  const [featuredBook, setFeaturedBook] = useState(null);

  const fetchBook = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/books/highest/rating"
      );

      if (response.data.success) {
        setFeaturedBook(response.data.data);
      } else {
        throw new Error("There was a problem fetching data from the backend");
      }
    } catch (error) {
      console.log(
        `There was an error sending request to the server check network issues => ${error.message}`
      );
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  return (
    <div className="featured">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="medium-header">Featured Book</p>
            <div className="img-wrapper">
              <img src={featuredBook ? `http://localhost:5000/upload/books/${featuredBook.coverImage}` : FeaturedImage} alt={featuredBook ? featuredBook.title : "Featured Book"} />
            </div>
          </div>
          <div className="col">
            {featuredBook && (
              <>
                <p className="small-header book-title">{featuredBook.title}</p>
                <p className="description">{featuredBook.description}</p>
                <p className="description featured-description">{featuredBook.reviews} Reviews</p>
                <p className="description featured-description">{`sh ${featuredBook.price}`}</p>

                <div className="row">
                  <button className="cart-buttons">VIEW MORE</button>
                  <button className="cart-buttons">ADD TO CART</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBook;
