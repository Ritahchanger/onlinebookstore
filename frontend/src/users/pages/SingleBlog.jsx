import React, { Fragment } from "react";
import LowerNavbar from "../components/LowerNavbar/LowerNavbar";

import { blogSampleData } from "../components/Data/BlogData";

import BlogItem from "../components/BlogPageComponents/BlogItem"

import Footer from "../components/Footer/Footer";

import "./single-page.css";

const SingleBlog = () => {
  return (
    <Fragment>
      <LowerNavbar />
      <div className="single_blog">
        <div className="container">
          <div className="blog-post">
            <p className="small-header">MIAMI LIFE</p>
            <div className="img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1440151050977-247552660a3b?q=80&w=1390&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
            <div className="blog-post-body">
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                nesciunt laborum quod quae nostrum ipsam quisquam placeat atque
                totam commodi inventore quaerat accusantium maiores consectetur
                eveniet alias tempore, veritatis consequatur, impedit optio.
                Quas, cupiditate perferendis! Ipsa ducimus hic nemo sequi at
                doloremque sint? Dicta magni cum rerum aut doloribus voluptates
                facere soluta, assumenda at, reiciendis perferendis quod maiores
                odio! Expedita, nobis similique quia sint facere itaque
                dignissimos recusandae at fuga?
              </p>
              <div className="img-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1578878703120-42d9fb8fd0af?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
              </div>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                nesciunt laborum quod quae nostrum ipsam quisquam placeat atque
                totam commodi inventore quaerat accusantium maiores consectetur
                eveniet alias tempore, veritatis consequatur, impedit optio.
                Quas, cupiditate perferendis! Ipsa ducimus hic nemo sequi at
                doloremque sint? Dicta magni cum rerum aut doloribus voluptates
                facere soluta, assumenda at, reiciendis perferendis quod maiores
                odio! Expedita, nobis similique quia sint facere itaque
                dignissimos recusandae at fuga?
              </p>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                nesciunt laborum quod quae nostrum ipsam quisquam placeat atque
                totam commodi inventore quaerat accusantium maiores consectetur
                eveniet alias tempore, veritatis consequatur, impedit optio.
                Quas, cupiditate perferendis! Ipsa ducimus hic nemo sequi at
                doloremque sint? Dicta magni cum rerum aut doloribus voluptates
                facere soluta, assumenda at, reiciendis perferendis quod maiores
                odio! Expedita, nobis similique quia sint facere itaque
                dignissimos recusandae at fuga?
              </p>
              <p className="date">6/12/2024</p>
            </div>
          </div>
        </div>
        <div className="container">
        <p className="small-header">Related Blogs</p>
          <div className="grid">
            {blogSampleData.map((item, index) => (
              <BlogItem item={item} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </Fragment>
  );
};

export default SingleBlog;
