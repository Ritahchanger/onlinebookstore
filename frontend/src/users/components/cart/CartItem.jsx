import React from "react";
import BookCover from "../../../assets/images/cover16.webp";
const CartItem = () => {
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
        <div className="quantity">
          <p className="cart-operator">-</p>
          <input type="text" name="" id="" maxLength="2" />
          <p className="cart-operator">+</p>
        </div>
      </td>

      <td className="cart-price">SH 8880</td>
      <td className="cart-price">SH 70000</td>
    </tr>
  );
};
export default CartItem;
