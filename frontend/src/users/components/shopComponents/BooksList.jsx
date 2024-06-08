import React from "react";
import sampleBook from "../../../assets/images/cover16.webp";
import "./BooksList.css";
import { openBookModal } from "../../Redux/features/BookDescriptionSlice";
import { useDispatch } from "react-redux";

// Rating component to display stars based on the book rating
const Rating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 1; i <= fullStars; i++) {
    stars.push(
      <i
        key={`full-${i}`}
        className="fa fa-star"
        aria-hidden="true"
        style={{ color: "#FFD700" }}
      ></i>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <i
        key="half"
        className="fa fa-star-half-o"
        aria-hidden="true"
        style={{ color: "#FFD700" }}
      ></i>
    );
  }

  for (let i = stars.length + 1; i <= 5; i++) {
    stars.push(
      <i
        key={`empty-${i}`}
        className="fa fa-star-o"
        aria-hidden="true"
        style={{ color: "#FFD700" }}
      ></i>
    );
  }

  return <div className="rating">{stars}</div>;
};

const BooksList = ({ book }) => {
  const dispatch = useDispatch();

  const handleBookModal = () => {
    dispatch(openBookModal(book));
  };

  // Ensure the book has a default rating of 3.5 if not provided
  const bookRating = book.rating || 3.5;

  return (
    <div className="card book-card">
      <div className="img-wrapper" onClick={handleBookModal}>
        <img
          src={`http://localhost:5000/upload/books/${book.coverImage}`}
          alt={book.title}
        />
        <div className="overlay">
          <p className="shop-items-icons">
            <i className="fa-solid fa-cart-shopping"></i>
          </p>
          <p className="shop-items-icons">
            <i className="fa-solid fa-heart"></i>
          </p>
          <p className="shop-items-icons" onClick={handleBookModal}>
            <i className="fa fa-eye"></i>
          </p>
        </div>
      </div>
      <div className="card-body">
        <p className="book_title">{book.title}</p>
        <Rating rating={bookRating} />
        <p className="book_price">{book.price}</p>
      </div>
    </div>
  );
};

export default BooksList;
