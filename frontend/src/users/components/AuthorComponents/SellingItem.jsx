import React from "react";

const SellingItem = ({ sellingAuthor }) => {
  return (
    <tr>
      <td>{`${sellingAuthor.firstName} ${sellingAuthor.secondName}`}</td>
      <td>{`${sellingAuthor.mostSellingBookTitle}`}</td>
      <td>{`${sellingAuthor.totalSales}`}</td>
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
