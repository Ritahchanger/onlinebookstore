import React from "react";
import { Link } from "react-router-dom";
import Config from "../../../Config";
const AuthorItem = ({ author }) => {
  return (
    <div className="card">
      <div className="img-wrapper">
        {author.passport ? (
          <img
            src={`${Config.apiUrl}/upload/authors/${author.passport}`}
            alt={`${author.firstName} ${author.secondName}`}
          />
        ) : (
          <div className="placeholder-image">No Image Available</div>
        )}
      </div>
      <div className="card-body">
        <p className="small-header">{`${author.firstName} ${author.secondName}`}</p>

        {author.description ? (
          <p>{author.description}</p>
        ) : (
          <p>
            Step into my reading sanctuary, where books are more than just
            stories—they're windows to different worlds and voices. At this
            online book store, my profile showcases a diverse collection shaped
            by curiosity and a love for meaningful narratives. From timeless
            classics that stand the test of time to modern masterpieces that
            challenge perceptions, explore a curated selection that celebrates
            the art of storytelling and the joy of reading.
          </p>
        )}

        <Link to={`/authors/books/${author._id}`} className="hero-btn">
          SEE BOOKS
          <i className="fa fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default AuthorItem;
