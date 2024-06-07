import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux"; 

const SellingItem = ({ sellingAuthor }) => {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [message, setMessage] = useState("");

  useEffect(() => {
    let timer;
    if (message) {
      timer = setTimeout(() => {
        setMessage("");
      }, 2 * 60 * 1000); // 2 minutes in milliseconds
    }
    return () => clearTimeout(timer);
  }, [message]);

  const addToCart = async () => {
    if (!isLoggedIn || !user?.user?._id) {
      setMessage("Please log in to add item to cart");
      setTimeout(() => {
        setMessage("");
      }, 10 * 1000); // 10 seconds in milliseconds
      return;
    }

    try {
      const url = `http://localhost:5000/api/cart/post`;
      const requestBody = {
        userId: user.user._id,
        productId: sellingAuthor._id, 
        quantity: 1, 
      };

      const response = await axios.post(url, requestBody, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log(response.data)

      if (response.status === 200) {
        setMessage("Item added to cart successfully");
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
