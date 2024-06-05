import "./Account.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useEffect, useState } from "react";
import ActiveBooks from "./ActiveBooks";
import TerminationModel from "../../components/TerminationModel/TerminationModel";

import { useDispatch, useSelector } from "react-redux";

import PdfViewer from "../../components/pdfViewer/pdfViewer";

import { openReadBookModal } from "../../Redux/features/readBookModalSlice"; 

import axios from "axios";

const MyBooks = () => {

  const dispatch = useDispatch()


  const user = useSelector((state) => state.auth.user);

  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const handleSidebar = () => {
    showSidebar(!sidebar);
  };
  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  const [books, setBooks] = useState(null);

  const getApprovedBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/author/books/approved/${user.user._id}`
      );

      if (response.status !== 200) {
        throw new Error(`Server returned status ${response.status}`);
      }

      setBooks(response.data.data);
    } catch (error) {
      console.log(
        `There was a problem fetching the data from the backend->${error.message}`
      );
    }
  };

  useEffect(() => {
    getApprovedBooks();
  }, [user.user._id]);

  const openBookModal = (book) =>{ // Modify to accept book as argument
    dispatch(openReadBookModal(book)) // Pass book along with action
  }



  return (
    <div className="account">
      <AccountNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <SideBar
        sidebar={sidebar}
        handleTerminationModel={handleTerminationModel}
      />

      <div className="my-books">
        <div className="container">
          {books ? (
            <>
              <p className="medium-header">PUBLISHED BOOKS</p>
              <div className="table_wrapper">
                <table>
                  <thead>
                    <tr>
                      <td>TITLE</td>
                      <td>AUTHOR</td>
                      <td>REVIEWS</td>
                      <td>RATINGS</td>
                      <td>VIEW</td>
                    </tr>
                  </thead>
                  <tbody>
                    {books.map((book) => (
                      <tr key={book._id}>
                        <td>{book.title}</td>
                        <td>{`${user.user.firstName} ${user.user.secondName}`}</td>
                        <td>{book.reviews}</td>
                        <td>{book.ratings}</td>
                        <td onClick={() => openBookModal(book)}> {/* Pass book when clicked */}
                          <i className="fa fa-eye"></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="books_message">
              No books have been approved yet.
            </p>
          )}
        </div>
      </div>

      <TerminationModel
        handleTerminationModel={handleTerminationModel}
        terminationModel={terminationModel}
      />
       <PdfViewer/>
    </div>
  );
};

export default MyBooks;
