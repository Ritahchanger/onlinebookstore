import React, { Fragment } from "react";
import LowerNavbar from "../components/LowerNavbar/LowerNavbar";
import Footer from "../components/Footer/Footer";

import { AuthorData } from "../components/Data/AuthorData";

import "./author.css";
import AuthorItem from "../components/AuthorComponents/AuthorItem";

import SearchComponent from "../components/AuthorComponents/SearchComponent";

const Authors = () => {
  return (
    <Fragment>
      <LowerNavbar />
      <div className="authors">
        <div className="container">
          <SearchComponent />
          <div className="grid">
            {AuthorData.map((item, index) => (
              <AuthorItem key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Authors;
