import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import FeaturedImage from "../../../../assets/images/cover4.jpg";
import "./FeatureBook.css";
import { useEffect, useState } from "react";
import { openBookModal } from "../../../Redux/features/BookDescriptionSlice";
import Config from "../../../../Config";

const FeaturedBook = () => {
  const [cartItem, setCartItem] = useState(false);
  const dispatch = useDispatch();
  const [featuredBook, setFeaturedBook] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`${Config.apiUrl}/api/books/highest/rating`);

      if (response.data.success) {
        setFeaturedBook(response.data.data);
        setCartItem(true);
      } else {
        throw new Error("Failed to fetch data from the server");
      }
    } catch (error) {
      console.log(`Error fetching data: ${error.message}`);
    }
  };

  const addToCart = async () => {
    if (!isLoggedIn) {
      console.log("Please log in to add items to the cart.");
      return;
    }

    try {
      const payload = {
        userId: user.user._id,
        productId: featuredBook._id,
        quantity: 1,
      };

      const response = await axios.post(`${Config.apiUrl}/api/cart/post`, payload);
      console.log("Item added to cart:", response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const displayBook = () => {
    dispatch(openBookModal(featuredBook));
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
              <img
                src={featuredBook ? `${Config.apiUrl}/upload/books/${featuredBook.coverImage}` : FeaturedImage}
                alt={featuredBook ? featuredBook.title : "Featured Book"}
              />
            </div>
          </div>
          <div className="col">
            {featuredBook && (
              <>
                <p className="small-header book-title">{featuredBook.title}</p>
                <p className="description">{featuredBook.description}</p>
                <p className="description featured-description">{featuredBook.purchaseCount} Purchases</p>
                <p className="description featured-description">{`$${featuredBook.price}`}</p>

                <div className="row">
                  <button className="cart-buttons" onClick={displayBook}>
                    VIEW MORE
                  </button>
                  <button className="cart-buttons" onClick={addToCart}>
                    {cartItem ? "Added to Cart" : "ADD TO CART"}
                  </button>
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
