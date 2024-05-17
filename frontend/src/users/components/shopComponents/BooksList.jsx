import React from "react";

import sampleBook from "../../../assets/images/cover16.webp";

import "./BooksList.css";

const BooksList = ({ book, displayImageMoreDescription,key }) => {
  return (
    <div className="books_list">
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
            <p
              className="shop-items-icons"
              onClick={displayImageMoreDescription}
            >
              <i class="fa fa-eye"></i>
            </p>
          </div>
        </div>
        <div className="card-body">
          <p className="book_title">{book.bookTitle}</p>
          <p className="book_price">{book.price}</p>
        </div>
      </div>
    </div>
  );
};

export default BooksList;
