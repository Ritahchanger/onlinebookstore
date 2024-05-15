import LowerNavbar from "../components/LowerNavbar/LowerNavbar";

import { Fragment } from "react";

import { blogSampleData } from "../components/Data/BlogData";

import BlogItem from "../components/BlogPageComponents/BlogItem";

import Footer from "../components/Footer/Footer";

import "./single-page.css";

const SingleBlog = () => {
  return (
    <Fragment>
      <LowerNavbar />
      <div className="single_blog">
        <div className="container">
          <p className="small-header">Related Blogs</p>
          <div className="grid">
            {blogSampleData.map((item, index) => (
              <BlogItem item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default SingleBlog;
