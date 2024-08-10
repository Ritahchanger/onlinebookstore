import React from "react";

import "./Ebook.css";
const Ebook = () => {

  return (
    <div className="ebook">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="small-header">eBook</p>
            <p className="medium-header">
              Access, Read, Practice & Engage
              <br />
              with Digital Content (eBook)
            </p>
            <p className="description">
              Dive into a world of knowledge with our extensive collection of eBooks. Whether you’re looking to learn something new, enhance your skills, or simply enjoy a good read, our digital library offers a variety of content to suit your needs. Easy to access, interactive, and available at your fingertips, our eBooks are designed to provide a seamless reading experience. Join us and start your journey towards lifelong learning today!
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="img-fluid" // Bootstrap class to make image responsive
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ebook;
