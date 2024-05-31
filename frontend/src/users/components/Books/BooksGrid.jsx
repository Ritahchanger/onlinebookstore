import React, { useEffect, useState } from "react";
import BooksList from "../shopComponents/BooksList";
import axios from "axios";
import "./BooksGrid.css";

const BooksGrid = ({books}) => {
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
