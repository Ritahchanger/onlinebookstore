import React, { Fragment, useEffect, useState } from "react";
import LowerNavbar from "../components/LowerNavbar/LowerNavbar";
import BlogItem from "../components/BlogPageComponents/BlogItem";
import Footer from "../components/Footer/Footer";
import "./single-page.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const { userId } = useParams(); 
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const [singleBlog, setSingleBlog] = useState(null);

  const handleSingleBlogCall = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/blog/get/${userId}`);
      
      if (!response.data.success) {
        throw new Error("An error occurred while fetching data from the backend");
      }

      setSingleBlog(response.data.data);
    } catch (error) {
      console.log(`There was a problem accessing the server! -> ${error.message}`);
    }
  };

  useEffect(() => {
    handleSingleBlogCall(); // Call the function to fetch single blog
    window.scrollTo(0, 0);
  }, [userId]); // Fetch when component mounts or userId changes

  return (
    <Fragment>
      <LowerNavbar />
      <div className="single_blog">
        <div className="container">
          <div className="blog-post">
            <div className="blog-post-body">
              {/* Render single blog post if available */}
              {singleBlog && (
                <Fragment>
                  <p className="small-header">{singleBlog.title}</p>
                  <div className="description-body">
                    <p className="description">{singleBlog.content}</p>
                    <img src={`http://localhost:5000/upload/blogs/${singleBlog.filePath}`} alt="" />
                  </div>
                  <p className="date">{`Created on ${singleBlog.createdOn}`}</p>
                </Fragment>
              )}
            </div>
          </div>
        </div>
        <div className="container">
          <p className="small-header">Related Blogs</p>
          <div className="blog-grid">
            {blogs.map((blog) => (
              <BlogItem blog={blog} key={blog._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default SingleBlog;
