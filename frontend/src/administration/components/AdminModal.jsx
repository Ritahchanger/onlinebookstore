import { useState } from "react";
import Config from "../../Config";
import axios from "axios";

const AdminModal = ({ approveBook, approveBookModal,onBookApproved }) => {
  const [ deletedBook,setBookDeleted ] = useState(false)
  const handleApproveBook = async () => {
    try {
      const response = await axios.post(
        `${Config.apiUrl}/api/books/approve/book`,
        {
          authorId: approveBook.author._id,
          bookId: approveBook._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      onBookApproved();
      approveBookModal()
    } catch (error) {
      console.log(`There was an error posting the data => ${error.message}`);
    }
  };

  return (
    <div className="modal-dialog">
      <div className="img-wrapper">
        <img
          src={`${Config.apiUrl}/upload/books/${approveBook?.coverImage}`}
          alt={approveBook?.title}
          width="50"
        />
      </div>
      <p className="medium-header">{`${approveBook?.title}`}</p>
      <p>{`${approveBook?.author.firstName} ${approveBook?.author.secondName}`}</p>
      <p>{approveBook?.category}</p>

      <div className="requirements">
        <p>Make sure the book has met all necessary requirements!</p>
      </div>
      <button className="cart-buttons ok" onClick={handleApproveBook}>
        APPROVE
      </button>
      <button className="cart-buttons cancel" onClick={approveBookModal}>
        CANCEL
      </button>
    </div>
  );
};

export default AdminModal;
