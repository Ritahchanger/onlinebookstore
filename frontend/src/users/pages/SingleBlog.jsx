import React, { Fragment } from "react";
import LowerNavbar from "../components/LowerNavbar/LowerNavbar";

const SingleBlog = () => {
  return (
    <Fragment>
      <LowerNavbar />
      <div className="single_blog">
        <div className="container">
          <p className="small-header">MY LIFE IN MIAMI FLORIDA</p>
        </div>
      </div>
    </Fragment>
  );
};

export default SingleBlog;
