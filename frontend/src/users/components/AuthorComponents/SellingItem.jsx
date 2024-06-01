import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; 

const SellingItem = ({ sellingAuthor }) => {
  const user = useSelector((state) => state.auth.user);
  const isUserLogged = useSelector((state) => state.auth.isUserLogged);
  const userId = user?.user?._id; // Use optional chaining to prevent errors
  const [message, setMessage] = useState("");

  const addToCart = async () => {
    if (!isUserLogged || !userId) {
      // Set the message to prompt user to log in
      setMessage("Please log in to add item to cart");
      // Clear the message after 2 minutes
      setTimeout(() => {
        setMessage("");
      }, 10 * 1000); // 2 minutes in milliseconds
      return;
    }

    try {
      const url = `http://localhost:5000/api/cart/post`;
      const requestBody = {
        userId: userId,
        productId: sellingAuthor.mostSellingBookId, 
        quantity: 1, 
      };

      const response = await axios.post(url, requestBody);

      if (response.status === 200) {
        setMessage("Item added to cart successfully");
        // Clear the message after 2 minutes
        setTimeout(() => {
          setMessage("");
        }, 2 * 60 * 1000); // 2 minutes in milliseconds
      } else {
        setMessage("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error.message);
      setMessage("An error occurred while adding item to cart");
    }
  };

  return (
    <tr>
      <td>{`${sellingAuthor.firstName} ${sellingAuthor.secondName}`}</td>
      <td>{`${sellingAuthor.mostSellingBookTitle}`}</td>
      <td>{`${sellingAuthor.totalSales}`}</td>
      <td>
        <p className="shop-items-icons">
          <i className="fa fa-eye"></i>
        </p>
        <p className="shop-items-icons" onClick={addToCart}>
          <i className="fa-solid fa-cart-shopping"></i>
        </p>
        {message && <p>{message}</p>}
      </td>
    </tr>
  );
};

export default SellingItem;
