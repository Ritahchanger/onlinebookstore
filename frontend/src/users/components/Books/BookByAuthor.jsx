import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import LowerNavbar from "../LowerNavbar/LowerNavbar";
import Footer from "../Footer/Footer";
import BooksGrid from "./BooksGrid";
import BookDescriptionModal from "./BookDescriptionModal";

import "./BooksByAuthor.css";

const BookByAuthor = () => {
  const [displayBook, setDisplayBook] = useState(false);
  const [books, setBooks] = useState(null);
  const [author, setAuthor] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAuthorAndBooks = async () => {

      try {

        const [authorResponse, booksResponse] = await Promise.all([

          axios.get(`http://localhost:5000/api/author/${id}`),

          axios.get(`http://localhost:5000/api/author/books/${id}`)

        ]);

        if (authorResponse.status !== 200 || booksResponse.status !== 200) {

          throw new Error("There was a problem fetching data");

        }

        setAuthor(authorResponse.data.data);

        setBooks(booksResponse.data.data);


      } catch (error) {

        console.log(`There was a problem fetching data from backend: ${error.message}`);

      }

    };

    window.scrollTo(0, 0);
    fetchAuthorAndBooks();
  }, [id]);

  const displayImageMoreDescription = (book) => {
    setDisplayBook(!displayBook);
  };

  if (!books || !author) return <div>Loading...</div>;

  return (
    <div className="books">
      <LowerNavbar />
      <div className="container">
        <div className="small-header">{`${author.firstName} ${author.secondName}`}</div>
        <BooksGrid
          books={books}
          onBookClick={displayImageMoreDescription}
        />
        <p className="small-header">Audio</p>
      </div>

      {displayBook && (
        <BookDescriptionModal
          book={selectedBook}
          onClose={displayImageMoreDescription}
        />
      )}

      <Footer />
      <BookDescriptionModal displayBook={displayBook} displayImageMoreDescription={displayImageMoreDescription} />
    </div>
  );
};

export default BookByAuthor;
