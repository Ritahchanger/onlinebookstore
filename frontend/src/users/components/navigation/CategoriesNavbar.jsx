import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./categories.css";
import { nav__categories } from "../Data/NavbarData";

const CategoriesNavbar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="classifications">
      <Link to="/home" className="arrow">
        <i className="fa fa-arrow-left"></i>
      </Link>
      <div className="container">
        <div className="categories-wrapper">
          {nav__categories.map((item, index) => (
            <div
              className={`accordion ${activeIndex === index ? "active" : ""}`}
              key={index}
            >
              <div
                className="categories-title"
                onClick={() => toggleAccordion(index)}
              >
                <p>{item.booksTypes}</p>
                <i class="fa fa-angle-down"></i>
              </div>
              <div className="accordion-body">
                {item.books.map((book, bookIndex) => (
                  <p key={bookIndex}>{book}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesNavbar;
