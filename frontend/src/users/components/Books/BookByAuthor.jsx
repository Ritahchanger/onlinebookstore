import React, { useEffect, useState } from "react";
import LowerNavbar from "../LowerNavbar/LowerNavbar";
import "./BooksByAuthor.css";
import { books } from "../Data/BookData";
import FeaturedBook from "../../../assets/images/cover13.jpg";
import { useParams } from "react-router-dom";

import Footer from "../Footer/Footer";

import BooksGrid from "./BooksGrid";

const BookByAuthor = () => {
  const [displayBook, setDisplayBook] = useState(false);

  const displayImageMoreDescription = () => {
    setDisplayBook(!displayBook);
  };

  const { id } = useParams();

  useEffect(function () {
    window.scrollTo(0, 0);
  }, []);

  console.log(id);

  return (
    <div className="books">
      <LowerNavbar />
      <div className="container">
        <div className="small-header">Wanjiru Mukami</div>

        <BooksGrid displayImageMoreDescription={displayImageMoreDescription} />

        <p className="small-header">Ebooks</p>
      </div>
      <div className={`showBookModal ${displayBook ? "active" : ""} `}>
        
        
        <div className="container">
          <p className="close-item" onClick={displayImageMoreDescription}>
            &times;
          </p>
          <div className="row">
            <div className="col">
              <div className="img-wrapper">
                <img src={FeaturedBook} alt="" />
              </div>
            </div>
            <div className="col">
              <p className="small-header">The return of the maasai's</p>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                nulla maiores iure quasi, laboriosam delectus animi
                reprehenderit quibusdam impedit et quia ad repellat ratione
                perspiciatis quidem eaque sed in consequuntur libero, vero
                distinctio explicabo quo? Iure suscipit, vitae voluptas labore
                assumenda beatae unde tempore excepturi. Accusamus deserunt id
                saepe tenetur odio aspernatur culpa soluta maiores reprehenderit
                ullam, qui corporis voluptate?
              </p>
              <a href="#" className="hero-btn">
                ADD TO CART
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookByAuthor;
