import React from "react";

const SellingItem = ({ sellingItem }) => {
  return (
    <tr>
      <td>{sellingItem.author}</td>
      <td>{sellingItem.book}</td>
      <td>{sellingItem.year}</td>
      <td>{sellingItem.reviews}</td>
      <td>
        <p className="shop-items-icons">
          <i class="fa fa-eye"></i>
        </p>
        <p className="shop-items-icons">
          <i class="fa-solid fa-cart-shopping"></i>
        </p>
      </td>
    </tr>
  );
};

export default SellingItem;
