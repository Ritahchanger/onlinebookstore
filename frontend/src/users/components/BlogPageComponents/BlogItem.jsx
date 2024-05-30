import React from "react";
import { Link } from "react-router-dom"; 

const BlogItem = ({blog}) => {
  return (
    <div className="blog-card">
      <div className="img-wrapper">
        <img src={`http://localhost:5000/uploads/${blog.filePath}`} alt={blog.title} />
      </div>
      <div className="overlay">
        <p className="small-header">{blog.title}</p>
        <p className="description">{blog.content}</p>
        <div className="cardfooter">
          <span className="card_dates">{blog.createdOn}</span>
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
