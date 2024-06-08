import { useSelector, useDispatch } from "react-redux";

import { openBookModal } from "../../Redux/features/BookDescriptionSlice";
import { useState } from "react";

const SellingItem = ({ sellingAuthor }) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(
      openBookModal({
        title: sellingAuthor.mostSellingBookTitle,
        coverImage: sellingAuthor.mostSellingBookCoverImage,
        description: sellingAuthor.mostSellingBookDescription,
        _id:sellingAuthor.mostSellingBookId
      })
    );
  };

  return (
    <tr>
      <td>{`${sellingAuthor.firstName} ${sellingAuthor.secondName}`}</td>
      <td>{`${sellingAuthor.mostSellingBookTitle}`}</td>
      <td>{`${sellingAuthor.totalSales}`}</td>
      <td onClick={openModal}>
        <p className="shop-items-icons">
          <i className="fa-solid fa-cart-shopping"></i>
        </p>
      </td>
    </tr>
  );
};

export default SellingItem;
