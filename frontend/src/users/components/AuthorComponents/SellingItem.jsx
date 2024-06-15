import { useSelector, useDispatch } from "react-redux";

import { openBookModal } from "../../Redux/features/BookDescriptionSlice";
import { useState } from "react";

const SellingItem = ({ sellingAuthor }) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(
      openBookModal({
        title: sellingAuthor.title,
        coverImage: sellingAuthor.coverImage,
        description: sellingAuthor.description,
        _id:sellingAuthor._id
      })
    );
  };

  return (
    <tr>
      <td>{`${sellingAuthor.authorFirstName} ${sellingAuthor.authorSecondName}`}</td>
      <td>{`${sellingAuthor.title}`}</td>
      <td>{`${sellingAuthor.purchaseCount}`}</td>
      <td onClick={openModal}>
        <p className="shop-items-icons">
          <i className="fa-solid fa-cart-shopping"></i>
        </p>
      </td>
    </tr>
  );
};

export default SellingItem;
