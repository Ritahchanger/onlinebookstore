import React, { Fragment, useEffect, useState } from "react";
import LowerNavbar from "../components/LowerNavbar/LowerNavbar";
import Footer from "../components/Footer/Footer";
import SearchComponent from "../components/AuthorComponents/SearchComponent"; // Import the SearchComponent
import "./author.css";
import AuthorItem from "../components/AuthorComponents/AuthorItem";
import axios from "axios";
import Config from "../../Config";


const Authors = () => {
  const [authorData, setAuthorData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("gender");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Config.apiUrl}/api/users/authors`);

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
    window.scrollTo(0, 0);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  // Filter the authorData based on the searchTerm
  const filteredAuthors = authorData.filter((author) =>
    author.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Fragment>
      <LowerNavbar />
      <div className="authors">
        <div className="container">
          {/* Use the SearchComponent with necessary props */}
          <SearchComponent
            searchTerm={searchTerm}
            filterType={filterType}
            handleSearchChange={handleSearchChange}
            handleFilterChange={handleFilterChange}
          />

          {filteredAuthors.length === 0 ? (
            <p className="medium-header">No authors found</p>
          ) : (
            <div className="grid">
              {filteredAuthors.map((author) => (
                <AuthorItem key={author._id} author={author} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Authors;
