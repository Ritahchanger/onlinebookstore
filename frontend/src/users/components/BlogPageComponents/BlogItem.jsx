import React from "react";
import { Link } from "react-router-dom"; 
import Config from "../../../Config";
const BlogItem = ({blog}) => {
  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(" ") + "...";
    }
    return text;
  };

  return (
    <div className="blog-card">
      <div className="img-wrapper">
        <img src={`${Config.apiUrl}/upload/blogs/${blog.filePath}`} alt={blog.title} />
      </div>
      <div className="overlay">
        <p className="small-header">{blog.title}</p>
        <p className="description">{truncateText(blog.content, 10)}</p>
        <div className="cardfooter">
          <span className="card_dates">{blog.createdOn}</span>
          <span className="blog-btn">
            <Link to={`/blog/${blog._id}`} className="single-button-blog">
              MORE <i className="fa fa-arrow-right"></i>
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
