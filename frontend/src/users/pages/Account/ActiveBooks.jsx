import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PdfViewer from "../../components/pdfViewer/pdfViewer";
import { openReadBookModal } from "../../Redux/features/readBookModalSlice";
import Config from "../../../Config";

const ActiveBooks = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [books, setBooks] = useState(null);

  const truncateDescription = (description) => {
    if (!description) return "No description available";
    const words = description.split(" ");
    if (words.length <= 15) {
      return description;
    }
    return words.slice(0, 15).join(" ") + "...";
  };

  useEffect(() => {
    const getBooksRead = async () => {
      try {
        const response = await axios.get(
          `${Config.apiUrl}/api/cart/purchase/${user?.user?._id}/get`
        );
        const backendData = response.data.data;
        const allItems = backendData.flatMap((purchase) => purchase.items);
        setBooks(allItems);
      } catch (error) {
        console.error("Error fetching books read:", error);
      }
    };
    if (user?.user?._id) {
      getBooksRead();
    }
  }, [user?.user?._id]);

  const openBookModal = (book) => {
    dispatch(
      openReadBookModal({
        title: book?.productId?.title || "Unknown Title",
        book: book?.productId?.book || "",
      })
    );
  };

  return (
    <div className="active-books">
      <div className="container">
        {books && books.length > 0 ? (
          <>
            <p className="medium-header">ACTIVE BOOKS</p>
            <div className="table_wrapper">
              <table>
                <thead>
                  <tr>
                    <td>COVER IMAGE</td>
                    <td>TITLE</td>
                    <td>DESCRIPTION</td>
                    <td>READ</td>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book?._id}>
                      <td>
                        {book?.productId?.coverImage ? (
                          <img
                            src={`${Config.apiUrl}/upload/books/${book.productId.coverImage}`}
                            alt={book?.productId?.title || "No Title"}
                            style={{ width: "50px" }}
                          />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>{book?.productId?.title.toUpperCase() || "No Title"}</td>
                      <td>
                        {truncateDescription(book?.productId?.description)}
                      </td>
                      <td onClick={() => openBookModal(book)}>
                        <i className="fa fa-eye"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p style={{ textAlign: "center" }} className="medium-header">
            No active books
          </p>
        )}
      </div>
      <PdfViewer />
    </div>
  );
};

export default ActiveBooks;
