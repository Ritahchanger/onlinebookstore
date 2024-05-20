import React, { useEffect, useState } from "react";
import LowerNavbar from "../LowerNavbar/LowerNavbar";
import "./BooksByAuthor.css";
import { books } from "../Data/BookData";

import { useParams } from "react-router-dom";

import Footer from "../Footer/Footer";

import BooksGrid from "./BooksGrid";

import BookDescriptionModal from "./BookDescriptionModal";


const BookByAuthor = () => {
  const [displayBook, setDisplayBook] = useState(false);

  const displayImageMoreDescription = () => {
    setDisplayBook(!displayBook);
  };

  const { id } = useParams();

  useEffect(function () {
    window.scrollTo(0, 0);
  }, []);

  console.log(id);

  return (
    <div className="books">
      <LowerNavbar />
      <div className="container">
        <div className="small-header">Wanjiru Mukami</div>

        <BooksGrid/>

        <p className="small-header">Audio</p>
      </div>

      <BookDescriptionModal />

      <Footer />
    </div>
  );
};

export default BookByAuthor;
