import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FeaturedBook from "../../../assets/images/cover17.webp";
import { closeBookModal } from "../../Redux/features/BookDescriptionSlice";
import "./bookDescriptionModal.css";

const BookDescriptionModal = () => {
  const dispatch = useDispatch();
  const displayBookModal = useSelector(state => state.bookModal.displayBookModal);
  const selectedBook = useSelector(state => state.bookModal.selectedBook);

  const handleCloseModal = () => {
    dispatch(closeBookModal());
  };

  if (!selectedBook) {
    return null;
  }

  return (
    <div className={`showBookModal ${displayBookModal ? "active" : ""}`}>
      <div className="container">
        <p className="close-item" onClick={handleCloseModal}>
          &times;
        </p>
        <div className="row">
          <div className="col">
            <div className="img-wrapper">
              <img
                src={selectedBook.imgUrl || FeaturedBook}
                alt={selectedBook.bookTitle || "Book cover"}
              />
            </div>
          </div>
          <div className="col">
            <p className="small-header">{selectedBook.bookTitle || "No Title Available"}</p>
            <p className="description">
              {selectedBook.description || "No description available for this book."}
            </p>
            <a href="#" className="hero-btn">
              ADD TO CART
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDescriptionModal;
