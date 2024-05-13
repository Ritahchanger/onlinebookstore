import React, { useState } from "react";
import LowerNavbar from "../LowerNavbar/LowerNavbar";
import "./BooksByAuthor.css";
import { books } from "../Data/BookData";
import FeaturedBook from "../../../assets/images/cover13.jpg";

const BookByAuthor = () => {
  const [ displayBook,setDisplayBook ] = useState(false);

  const displayImageMoreDescription=()=>{
    setDisplayBook(!displayBook);
  }

  return (
    <div className="books">
      <LowerNavbar />
      <div className="container">
        <div className="small-header">Wanjiru Mukami</div>
        <div className="grid">
          {books.map((book, index) => (
            <div className="card">
              <div className="img-wrapper">
                <img src={book.imgUrl} alt="" />
                <div className="overlay">
                  <p className="shop-items-icons">
                    <i class="fa-solid fa-cart-shopping"></i>
                  </p>
                  <p className="shop-items-icons">
                    <i class="fa-solid fa-heart"></i>
                  </p>
                  <p className="shop-items-icons" onClick={displayImageMoreDescription}>
                    <i class="fa fa-eye"></i>
                  </p>
                </div>
              </div>
              <div className="card-body">
                <p className="book_title">{book.bookTitle}</p>
                <p className="book_price">{book.price}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="small-header">Ebooks</p>
      </div>
      <div className={`showBookModal ${displayBook ? "active" : ""} `}>
      {/* <div className="showBookModal"> */}
        <div className="container">
             < p className="close-item" onClick={displayImageMoreDescription}>&times;</p>
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
    </div>
  );
};

export default BookByAuthor;
