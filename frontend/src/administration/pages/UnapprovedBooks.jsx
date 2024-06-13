import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import Config from "../../Config";
import "./Admin.css";
import AdminModal from "../components/AdminModal";
import PdfViewer from "../../users/components/pdfViewer/pdfViewer";
import { useDispatch, useSelector } from "react-redux";
import { openReadBookModal } from "../../users/Redux/features/readBookModalSlice";
import "./unapproved.css";

import DisapproveModal from "../components/DisapproveModal";

const UnapprovedBooks = () => {
  const dispatch = useDispatch();
  const [sidebar, showSidebar] = useState(false);
  const [unapprovedBooks, setUnapprovedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [approveBook, setApproveBook] = useState(null);
  const [approveModal, setApproveModal] = useState(false);

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Config.apiUrl}/api/books/unapproved`);
      setUnapprovedBooks(response.data.data);
    } catch (error) {
      console.log(
        `There was an error fetching the data from the backend => ${error.message}`
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = unapprovedBooks.filter((book) => {
    const fullName = `${book.author?.firstName || ""} ${
      book.author?.secondName || ""
    }`;
    return (
      book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleBookApproving = (book) => {
    setApproveBook(book);
    approveBookModal();
  };

  const approveBookModal = () => {
    setApproveModal(!approveModal);
  };

  const openBookModal = (book) => {
    dispatch(
      openReadBookModal({
        title: book.title || "Unknown Title",
        book: book.book || "",
      })
    );
  };

  const [workingBook, setWorkingBook] = useState();

  const [disapproveModal, setDisapproveModal] = useState(false);

  const handleDisapproveBook = (book) => {
    setWorkingBook(book);
    disapproveDisplayModal();
  };

  const disapproveDisplayModal = () => {
    setDisapproveModal(!disapproveModal);
  };

  return (
    <div className="admin unapproved">
      <AdminNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <AdminSidebar sidebar={sidebar} />
      <div className="container">
        {filteredBooks.length > 0 ? (
          <>
            <p className="medium-header">UNAPPROVED BOOKS</p>
            <div className="input_group">
              <input
                type="text"
                name="search_book"
                placeholder="Search book..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            <div className="table_wrapper">
              <table>
                <thead>
                  <tr>
                    <td>COVER IMAGE</td>
                    <td>TITLE</td>
                    <td>AUTHOR</td>
                    <td>CATEGORY</td>
                    <td>UPLOADED ON</td>
                    <td>READ</td>
                    <td>APPROVE</td>
                    <td>REJECT</td>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book) => (
                    <tr key={book._id}>
                      <td>
                        <img
                          src={`${Config.apiUrl}/upload/books/${
                            book.coverImage || "default.png"
                          }`}
                          alt={book.title.toUpperCase() || "No Title"}
                          width="50"
                        />
                      </td>
                      <td>{book.title.toUpperCase() || "No Title"}</td>
                      <td>{`${book.author?.firstName || "Unknown"} ${
                        book.author?.secondName || "Author"
                      }`}</td>
                      <td>{book.category || "No Category"}</td>
                      <td>
                        {new Date(book.uploadedAt).toLocaleDateString() ||
                          "No Date"}
                      </td>
                      <td className="view" onClick={() => openBookModal(book)}>
                        <i className="fa fa-eye"></i>
                      </td>
                      <td>
                        <button
                          className="cart-buttons"
                          onClick={() => handleBookApproving(book)}
                        >
                          Approve
                        </button>
                      </td>
                      <td>
                        <button
                          className="cart-buttons"
                          onClick={() => handleDisapproveBook(book)}
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="medium-header" style={{ textAlign: "center" }}>
            No unapproved books
          </p>
        )}
      </div>

      <div className={`custom-modal ${approveModal ? "active" : ""}`}>
        <AdminModal
          approveBook={approveBook}
          approveBookModal={approveBookModal}
          onBookApproved={fetchData}
        />
      </div>

      <PdfViewer />

      <div className={`custom-modal ${disapproveModal ? "disapprove" : null}`}>
        <DisapproveModal
          workingBook={workingBook}
          disapproveDisplayModal={disapproveDisplayModal}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
};

export default UnapprovedBooks;
