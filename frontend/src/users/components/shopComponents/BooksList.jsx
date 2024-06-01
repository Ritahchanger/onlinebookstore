import React from "react";

import sampleBook from "../../../assets/images/cover16.webp";

import "./BooksList.css";

import { openBookModal } from "../../Redux/features/BookDescriptionSlice";

import { useDispatch, useSelector } from "react-redux";

const BooksList = ({ book }) => {
  const dispatch = useDispatch();

  const handleBookModal = () => {
    dispatch(openBookModal(book));
  };

  return (
    <div className="card book-card" onClick={handleBookModal}>
      <div className="img-wrapper">
        <img
          src={`http://localhost:5000/upload/books/${book.coverImage}`}
          alt=""
        />
        <div className="overlay">
          <p className="shop-items-icons">
            <i class="fa-solid fa-cart-shopping"></i>
          </p>
          <p className="shop-items-icons">
            <i class="fa-solid fa-heart"></i>
          </p>
          <p className="shop-items-icons" onClick={handleBookModal}>
            <i class="fa fa-eye"></i>
          </p>
        </div>
      </div>
      <div className="card-body">
        <p className="book_title">{book.title}</p>
        <p className="book_price">{book.price}</p>
      </div>
    </div>
  );
};

export default BooksList;
