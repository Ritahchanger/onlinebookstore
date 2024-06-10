import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PdfViewer from "../../components/pdfViewer/pdfViewer";
import { openReadBookModal } from "../../Redux/features/readBookModalSlice";

const ActiveBooks = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [books, setBooks] = useState(null);

  const truncateDescription = (description) => {
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
          `http://localhost:5000/api/cart/purchase/${user.user._id}/get`
        );
        const backendData = response.data.data;
        const allItems = backendData.flatMap((purchase) => purchase.items);
        setBooks(allItems);
        console.log(allItems);
      } catch (error) {
        console.error("Error fetching books read:", error);
      }
    };
    getBooksRead();
  }, [user.user._id]);

  const openBookModal = (book) => {
    dispatch(openReadBookModal(
      {
        title:book.productId.title,
        book:book.productId.book
      }
    ));
  };

  return (
    <div className="active-books">
      <div className="container">
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
              {books &&
                books.map((book) => (
                  <tr key={book._id}>
                    <td>
                      <img
                       src={`http://localhost:5000/upload/books/${book.productId.coverImage}`}
                        alt={book.productId.title}
                        style={{ width: "50px" }}
                      />
                    </td>
                    <td>{book.productId.title}</td>
                    <td>{truncateDescription(book.productId.description)}</td>
                    <td onClick={() => openBookModal(book)}>
                      <i className="fa fa-eye"></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <PdfViewer />
    </div>
  );
};

export default ActiveBooks;
