import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeBookModal } from "../../Redux/features/BookDescriptionSlice";
import "./bookDescriptionModal.css";
import axios from "axios";

const BookDescriptionModal = () => {
  const dispatch = useDispatch();
  const isUserLogged = useSelector((state) => state.auth.isUserLogged);
  const displayBookModal = useSelector((state) => state.bookModal.displayBookModal);
  const selectedBook = useSelector((state) => state.bookModal.selectedBook);
  const userId = useSelector((state) => state.auth.user?.user._id);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleCloseModal = () => {
    dispatch(closeBookModal());
    setShowSuccessMessage(false);
    setShowLoginMessage(false);
  };

  if (!selectedBook) {
    return null;
  }

  const descriptionShortened = selectedBook.description
    ? selectedBook.description.split(" ").slice(0, 80).join(" ") + "..."
    : "No description available for this book.";

  const addItemToCart = async () => {
    if (!isUserLogged) {
      setShowLoginMessage(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/cart/post", {
        userId: userId,
        productId: selectedBook._id,
        quantity: 1
      });
      setShowSuccessMessage(true);
      setShowLoginMessage(false);
      console.log("Item added to cart:", response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

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
                src={`http://localhost:5000/upload/books/${selectedBook.coverImage}`}
                alt={selectedBook.title || "Book cover"}
              />
            </div>
          </div>
          <div className="col">
            <p className="small-header">
              {selectedBook.title || "No Title Available"}
            </p>
            <p className="description">{descriptionShortened}</p>
            {showSuccessMessage ? (
              <p className="small-header">Book added to cart!</p>
            ) : (
              <>
                <button className="hero-btn" onClick={addItemToCart}>
                  ADD TO CART
                </button>
                {showLoginMessage && (
                  <p className="small-header">Please log in to add items to the cart.</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDescriptionModal;
