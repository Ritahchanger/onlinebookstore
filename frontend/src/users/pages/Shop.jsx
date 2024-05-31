import React, { useEffect, useState } from "react";
import LowerNavbar from "../components/LowerNavbar/LowerNavbar";
import NewRelease from "../components/HomePageComponents/NewReleases/NewRelease";
import SectionTitle from "../components/shopComponents/SectionTitle";
import "./Shop.css";
import BooksGrid from "../components/Books/BooksGrid";
import BookDescriptionModal from "../components/Books/BookDescriptionModal";
import BestSellingAuthors from "../components/AuthorComponents/BestSellingAuthors";
import axios from "axios";

const Shop = () => {
  const [displayBook, setDisplayBook] = useState(false);
  const [books, setBooks] = useState([]);

  const displayImageMoreDescription = () => {
    setDisplayBook(!displayBook);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    <div className="shop">
      <LowerNavbar />
      <SectionTitle sectionTitle="MOST SELLING BOOKS" />
      <div className="container">
        <section>
          <BooksGrid books={books} displayImageMoreDescription={displayImageMoreDescription} />
        </section>
      </div>
      <section>
        <NewRelease />
      </section>
      <SectionTitle sectionTitle="BOOKS OF THE YEAR" />
      <div className="container">
        <section>
          <BooksGrid books={books} displayImageMoreDescription={displayImageMoreDescription} />
        </section>
      </div>
      <BookDescriptionModal displayBook={displayBook} displayImageMoreDescription={displayImageMoreDescription} />
      <SectionTitle sectionTitle="HIGH SELLING AUTHORS" />
      <BestSellingAuthors />
    </div>
  );
};

export default Shop;
