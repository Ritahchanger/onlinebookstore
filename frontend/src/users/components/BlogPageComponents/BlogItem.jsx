import React from "react";
import { Link } from "react-router-dom"; 

const BlogItem = ({item}) => {
  return (
    <div className="blog-card">
      <div className="img-wrapper">
        <img src={item.imgUrl} alt="" />
      </div>
      <div className="overlay">
        <p className="small-header">{item.blogTitle}</p>
        <p className="description">{item.description}</p>
        <div className="cardfooter">
          <span className="card_dates">{item.cardDates}</span>
          <span className="blog-btn">
            <Link to="/single-blog" className="single-button-blog">
              MORE <i class="fa fa-arrow-right"></i>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
