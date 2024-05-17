import React, { useEffect } from "react";
import LowerNavbar from "../components/LowerNavbar/LowerNavbar";

import NewRelease from "../components/HomePageComponents/NewReleases/NewRelease";

import SectionTitle from "../components/shopComponents/SectionTitle";

import "./Shop.css";

import BooksGrid from "../components/Books/BooksGrid";

import BooksList from "../components/shopComponents/BooksList";

import BookDescriptionModal from "../components/Books/BookDescriptionModal";

import { useState } from "react";
import BestSellingAuthors from "../components/AuthorComponents/BestSellingAuthors";

const Shop = () => {
  const [displayBook, setDisplayBook] = useState(false);

  const displayImageMoreDescription = () => {
    setDisplayBook(!displayBook);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="shop">
      <LowerNavbar />
      <SectionTitle sectionTitle="MOST SELLING BOOKS" />
      <div className="container">
        <section>
          <BooksGrid
            displayImageMoreDescription={displayImageMoreDescription}
          />
        </section>
      </div>
      <section>
        <NewRelease />
      </section>
      <SectionTitle sectionTitle="BOOKS OF THE YEAR" />

      <div className="container">
        <section>
          <BooksGrid
            displayImageMoreDescription={displayImageMoreDescription}
          />
        </section>
      </div>

      <BookDescriptionModal
        displayBook={displayBook}
        displayImageMoreDescription={displayImageMoreDescription}
      />

      <SectionTitle sectionTitle="HIGH SELLING AUTHORS" />

      <BestSellingAuthors />
    </div>
  );
};

export default Shop;
