import React from "react";
import { Link } from "react-router-dom";
const AuthorItem = ({ item, key }) => {
  return (
    <div className="card">
      <div className="img-wrapper">
        <img src={item.imgUrl} alt="" />
      </div>
      <div className="card-body">
        <p className="small-header">{item.authorName}</p>
        <p>{item.authorDescription}</p>
        <Link to={`/${key}`} className="hero-btn">
          SEE BOOKS
          <i class="fa fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default AuthorItem;
