import React from "react";

import BooksList from "../shopComponents/BooksList";

import { books } from "../Data/BookData";

import "./BooksGrid.css"


const BooksGrid = () => {
 

  return (
    <div className="grid">
      {books.map((book, index) => (
        <BooksList
          book={book}
          key={index}
        />
      ))}
    </div>
  );
};

export default BooksGrid;
