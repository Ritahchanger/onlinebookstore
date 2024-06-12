import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeBookModal } from "../../Redux/features/BookDescriptionSlice";
import "./bookDescriptionModal.css";
import axios from "axios";
import Config from "../../../Config";

const BookDescriptionModal = () => {
  const dispatch = useDispatch();
  const isUserLogged = useSelector((state) => state.auth.isLoggedIn);
  const displayBookModal = useSelector((state) => state.bookModal.displayBookModal);
  const selectedBook = useSelector((state) => state.bookModal.selectedBook);
  const user = useSelector((state) => state.auth.user);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const handleCloseModal = () => {
    dispatch(closeBookModal());
    setShowSuccessMessage(false);
    setShowLoginMessage(false);
  };

  useEffect(() => {
    console.log("User logged in:", isUserLogged);
    if (user && user.user) {
      console.log("User ID:", user.user._id);
    }
  }, [isUserLogged, user]);

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

    if (!user || !user.user) {
      console.error("User information is missing.");
      return;
    }

    console.log("User is logged in. Proceeding to add item to cart.");

    try {
      const response = await axios.post(`${Config.apiUrl}/api/cart/post`, {
        userId: user.user._id,
        productId: selectedBook._id,
        quantity: 1
      });

      if (!response.data.success) {
        throw new Error("There was a problem posting the data to the backend");
      }

      setShowSuccessMessage(true);
      setShowLoginMessage(false);
      
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
                src={`${Config.apiUrl}/upload/books/${selectedBook.coverImage}`}
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
              <p className="cart_success">Book added to cart!</p>
            ) : (
              <>
                <button className="hero-btn" onClick={addItemToCart}>
                  ADD TO CART
                </button>
                {showLoginMessage && (
                  <p className="cart_success">Please log in to add items to the cart.</p>
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
