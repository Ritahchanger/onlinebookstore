import React, { useEffect, useState } from "react";
import BooksList from "../shopComponents/BooksList";
import axios from "axios";
import "./BooksGrid.css";

const BooksGrid = () => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books/");
      if (response.status !== 200) {
        throw new Error("There was a problem fetching data from the server");
      }
      setBooks(response.data.data);
    } catch (error) {
      console.error(`There was a problem fetching the data from the backend: ${error.message}`);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="grid">
      {books.length > 0 ? (
        books.map((book, index) => <BooksList book={book} key={index} />)
      ) : (
        <p>No books available</p>
      )}
    </div>
  );
};

export default BooksGrid;
