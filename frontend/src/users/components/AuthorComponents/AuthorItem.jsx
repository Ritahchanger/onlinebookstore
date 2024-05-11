import React from "react";

const AuthorItem = ({ item }) => {
  return (
    <div className="card">
      <div className="img-wrapper">
        <img src={item.imgUrl} alt="" />
      </div>
      <div className="card-body">
        <p className="small-header">{item.authorName}</p>
        <p>{item.authorDescription}</p>
        <a href="#" className="hero-btn">
          SEE BOOKS
          <i class="fa fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );
};

export default AuthorItem;
