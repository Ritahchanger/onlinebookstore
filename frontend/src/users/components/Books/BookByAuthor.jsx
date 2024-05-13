import React from "react";
import LowerNavbar from "../LowerNavbar/LowerNavbar";
import "./BooksByAuthor.css"
import { books } from "../Data/BookData";

const BookByAuthor = () => {
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
    </div>
  );
};

export default BookByAuthor;
