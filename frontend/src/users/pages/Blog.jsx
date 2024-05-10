import React, { Fragment } from "react";
import LowerNavbar from "../components/LowerNavbar/LowerNavbar";

import "./Blog.css";
import { blogSampleData } from "../components/Data/BlogData";

const Blog = () => {
  return (
    <Fragment>
      <LowerNavbar />
      <div className="blog">
        <div className="container">
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
                      <a href="#">
                        MORE <i class="fa fa-arrow-right"></i>{" "}
                      </a>
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
                      <a href="#">
                        MORE <i class="fa fa-arrow-right"></i>{" "}
                      </a>
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
