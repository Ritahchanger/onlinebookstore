import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import AccountNavbar from "./AccountNavbar";
import SideBar from "./SideBar";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import PdfViewer from "../../components/pdfViewer/pdfViewer";
import { openReadBookModal } from "../../Redux/features/readBookModalSlice";

import "./Account.css";

const PendingApprovals = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [unapprovedBooks, setUnapprovedBooks] = useState([]);

  useEffect(() => {
    const getUnapprovedBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/author/books/unapproved/${user.user._id}`
        );
        setUnapprovedBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching unapproved books:", error);
      }
    };

    getUnapprovedBooks();
  }, [user.user._id]);

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  const openBookModal = (book) => {
    dispatch(openReadBookModal(book));
  };

  return (
    <div className="account">
      <AccountNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <SideBar
        sidebar={sidebar}
        handleTerminationModel={handleTerminationModel}
      />

      <div className="my-books">
        <div className="container">
          {unapprovedBooks && unapprovedBooks.length > 0 ? (
            <>
              <p className="medium-header">PENDING APPROVALS</p>
              <div className="table_wrapper">
                <table>
                  <thead>
                    <tr>
                      <td>NAME</td>
                      <td>AUTHOR</td>
                      <td>VIEW</td>
                    </tr>
                  </thead>
                  <tbody>
                    {unapprovedBooks.map((book) => (
                      <tr key={book._id}>
                        <td>{book.title}</td>
                        <td>{`${user.user.firstName} ${user.user.secondName}`}</td>
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
            <p className="books_message">No unapproved books found</p>
          )}
        </div>
      </div>

      <TerminationModel
        handleTerminationModel={handleTerminationModel}
        terminationModel={terminationModel}
      />
      <PdfViewer />
    </div>
  );
};

export default PendingApprovals;
