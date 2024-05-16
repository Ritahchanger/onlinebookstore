import React, { useState } from "react";
import BookCover from "../../../assets/images/cover16.webp";
const CartItem = () => {
  const [quantity, setQuantity] = useState(0);

  const [total, setTotal] = useState(0);

  const [price, setPrice] = useState(500);

  const getItemTotal = () => {
    setTotal(price * quantity);
  };

  const handleQuantityIncrement = (e) => {
    e.preventDefault();
  };

  const decrementQuantity = () => {
    setQuantity(quantity - 1);
  };
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <tr>
      <td className="cart-image">
        <div className="img-wrapper">
          <img src={BookCover} alt="" />
        </div>
        <div className="product-description">
          <p className="book-title">Books of savannah</p>
          <p className="book-title">Jacob Mutinda</p>
          <p className="remove">
            <i class="fa-solid fa-trash"></i>
          </p>
        </div>
      </td>
      <td>
        <form className="quantity" onSubmit={handleQuantityIncrement}>
          <p
            className="cart-operator"
            onClick={() => {
              decrementQuantity();
              getItemTotal();
            }}
          >
            -
          </p>
          <input type="text" name="" id="" maxLength="2" value={quantity} />
          <p
            className="cart-operator"
            onClick={() => {
              incrementQuantity();
              getItemTotal();
            }}
          >
            +
          </p>
        </form>
      </td>

      <td className="cart-price price">{`sh ${price}`}</td>
      <td className="cart-price total">{`sh ${total}`}</td>
    </tr>
  );
};
export default CartItem;
