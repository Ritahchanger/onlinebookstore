import React, { Fragment, useEffect, useState } from "react";
import LowerNavbar from "../components/LowerNavbar/LowerNavbar";
import Footer from "../components/Footer/Footer";

// import { AuthorData } from "../components/Data/AuthorData";

import "./author.css";
import AuthorItem from "../components/AuthorComponents/AuthorItem";

import SearchComponent from "../components/AuthorComponents/SearchComponent";

import axios from "axios";

const Authors = () => {
  const [authorData, setAuthorData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/authors"
      );

      if (response.status !== 200) {
        throw new Error("Internal server error");
      }

      setAuthorData(response.data.data);
    } catch (error) {
      console.log(`There was a problem `);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(authorData);
  }, [authorData]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Fragment>
      <LowerNavbar />
      <div className="authors">
        <div className="container">
          <SearchComponent />

          {authorData.length === 0 ? (
            <p className="medium-header">Loading</p>
          ) : (
            <div className="grid">
              {authorData.map((author, key) => (
                <AuthorItem key={key} author={author} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Authors;
