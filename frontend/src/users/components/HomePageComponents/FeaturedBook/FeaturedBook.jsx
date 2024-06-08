import axios from "axios";
import { useSelector,useDispatch } from "react-redux";
import FeaturedImage from "../../../../assets/images/cover4.jpg";
import "./FeatureBook.css";

import { useEffect,useState } from "react"; 

import { openBookModal } from "../../../Redux/features/BookDescriptionSlice"; 



const FeaturedBook = () => {
  const [ cartItem,sendToCart ] = useState(false);
  const dispatch = useDispatch();
  const [featuredBook, setFeaturedBook] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const fetchBook = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/books/highest/rating"
      );

      if (response.data.success) {
        setFeaturedBook(response.data.data);
        sendToCart(true)
      } else {
        throw new Error("There was a problem fetching data from the backend");
        sendToCart(false)
      }
    } catch (error) {
      console.log(
        `There was an error sending request to the server check network issues => ${error.message}`
      );
    }
  };

  const addToCart = async () => {
    if (!isLoggedIn) {
      console.log("User is not logged in. Please log in to add items to the cart.");
      return;
    }

    try {
      const payload = {
        userId:user.user._id, 
        productId: featuredBook._id,
        quantity: 1 
      };

      const response = await axios.post("http://localhost:5000/api/cart/post", payload);

      console.log("Item added to cart successfully:", response.data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const displayBook = () =>{
    dispatch(openBookModal(featuredBook))
  }
  return (
    <div className="featured">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="medium-header">Featured Book</p>
            <div className="img-wrapper">
              <img
                src={featuredBook ? `http://localhost:5000/upload/books/${featuredBook.coverImage}` : FeaturedImage}
                alt={featuredBook ? featuredBook.title : "Featured Book"}
              />
            </div>
          </div>
          <div className="col">
            {featuredBook && (
              <>
                <p className="small-header book-title">{featuredBook.title}</p>
                <p className="description">{featuredBook.description}</p>
                <p className="description featured-description">{featuredBook.reviews} Reviews</p>
                <p className="description featured-description">{`sh ${featuredBook.price}`}</p>

                <div className="row">
                  <button className="cart-buttons" onClick={displayBook}>VIEW MORE</button>
                  <button className="cart-buttons" onClick={addToCart}>{cartItem ? "Added to Cart" : "ADD TO CART"}</button>
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
