import React, { Fragment } from "react";
import LowerNavbar from "../components/LowerNavbar/LowerNavbar";

import "./Blog.css";
import { blogSampleData } from "../components/Data/BlogData";
import { Link } from "react-router-dom";

const Blog = () => {
  return (
    <Fragment>
      <LowerNavbar />
      <div className="blog">
        <div className="container">
          <div className="search_container">
            <div className="input-search">
              <input type="text" name="" id="" placeholder="Search blog.." />
              <button type="submit">
                <i class="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="filter-input">
              <p className="fiter-title">Filter by</p>
              <select>
                <option value="DATE">DATE</option>
                <option value="DATE">BLOG NAME</option>
              </select>
            </div>
          </div>

          <p className="small-header">Latest Blogs</p>
          <div className="blog-grid">
            {blogSampleData.map((item, index) => (
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
                      <Link to="/single-blog">
                        MORE <i class="fa fa-arrow-right"></i>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="small-header">Earlier Blogs</p>
          <div className="blog-grid">
            {blogSampleData.map((item, index) => (
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
                      <Link to="/single-blog">
                        MORE <i class="fa fa-arrow-right"></i>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Blog;
