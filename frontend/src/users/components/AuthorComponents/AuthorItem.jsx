import React from "react";
import { Link } from "react-router-dom";

const AuthorItem = ({ author }) => {
  return (
    <div className="card">
      <div className="img-wrapper">
        {author.passport ? (
          <img
            src={`http://localhost:5000/uploads/${author.passport}`}
            alt={`${author.firstName} ${author.secondName}`}
          />
        ) : (
          <div className="placeholder-image">No Image Available</div>
        )}
      </div>
      <div className="card-body">
        <p className="small-header">{`${author.firstName} ${author.secondName}`}</p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Perspiciatis, asperiores? Soluta, a tempora suscipit necessitatibus
          esse magnam quas porro nobis aspernatur! Quia optio et fugiat dolorum
          rem obcaecati, architecto delectus.
        </p>
        <Link to={`/authors/books/${author._id}`} className="hero-btn">
          SEE BOOKS
          <i className="fa fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default AuthorItem;


