import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import LowerNavbar from "../LowerNavbar/LowerNavbar";
import Footer from "../Footer/Footer";
import BooksGrid from "./BooksGrid";
import BookDescriptionModal from "./BookDescriptionModal";

import { useSelector, useDispatch } from "react-redux";

import "./BooksByAuthor.css";

import { showLoading, hideLoading } from "../../Redux/features/alertSlice";

import Preloaders from "../Preloaders/Preloaders";

const BookByAuthor = () => {
  const loading = useSelector((state) => state.alerts.loading);

  const dispatch = useDispatch();

  const [displayBook, setDisplayBook] = useState(false);
  const [books, setBooks] = useState(null);
  const [author, setAuthor] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAuthorAndBooks = async () => {
      try {
        dispatch(showLoading());

        const [authorResponse, booksResponse] = await Promise.all([
          axios.get(`http://localhost:5000/api/author/${id}`),

          axios.get(`http://localhost:5000/api/author/books/approved/${id}`),
        ]);

        if (authorResponse.status !== 200 || booksResponse.status !== 200) {
          throw new Error("There was a problem fetching data");

          dispatch(hideLoading());
        }

        dispatch(hideLoading());
        setAuthor(authorResponse.data.data);

        setBooks(booksResponse.data.data);
      } catch (error) {
        console.log(
          `There was a problem fetching data from backend: ${error.message}`
        );

        dispatch(hideLoading());
      }
    };

    window.scrollTo(0, 0);
    fetchAuthorAndBooks();
  }, [id]);

  const displayImageMoreDescription = (book) => {
    setDisplayBook(!displayBook);
  };

  return (
    <div className="books">
      <LowerNavbar />

      {books ? (
        <div className="container">
          <div className="small-header">{`${author.firstName} ${author.secondName}`}</div>
          <BooksGrid books={books} onBookClick={displayImageMoreDescription} />
          <p className="small-header">Audio</p>
        </div>
      ) : (
        <>
          <div className="content-wrapper">
            <p>Author's books have not been approved</p>
          </div>
        </>
      )}

      {displayBook && (
        <BookDescriptionModal
          book={selectedBook}
          onClose={displayImageMoreDescription}
        />
      )}

      <Footer />
      <BookDescriptionModal
        displayBook={displayBook}
        displayImageMoreDescription={displayImageMoreDescription}
      />
      {loading && <Preloaders />}
    </div>
  );
};

export default BookByAuthor;
