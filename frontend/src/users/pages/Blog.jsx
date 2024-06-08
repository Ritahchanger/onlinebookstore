import React, { Fragment, useEffect, useState } from "react";
import LowerNavbar from "../components/LowerNavbar/LowerNavbar";
import Footer from "../components/Footer/Footer";
import "./Blog.css";
import BlogItem from "../components/BlogPageComponents/BlogItem";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../Redux/features/blogsSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("TITLE");

  useEffect(() => {
    dispatch(fetchBlogs());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const filteredBlogs = blogs.filter((blog) => {
    if (filterType === "TITLE") {
      return blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterType === "DATE" && blog.date) {
      return blog.date.includes(searchTerm); // Check if blog.date exists before calling includes
    }
    return false;
  });

  return (
    <Fragment>
      <LowerNavbar />
      <div className="blog">
        <div className="container">
          <div className="search_container">
            <div className="input-search">
              <input
                type="text"
                placeholder="Search blog.."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <button type="submit">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </div>
            <div className="filter-input">
              <p className="filter-title">Filter by</p>
              <select value={filterType} onChange={handleFilterChange}>
                <option value="TITLE">TITLE</option>
                <option value="DATE">DATE</option>
              </select>
            </div>
          </div>

          <p className="small-header">Latest Blogs</p>
          <div className="blog-grid">
            {filteredBlogs.map((blog) => (
              <BlogItem blog={blog} key={blog._id} />
            ))}
          </div>

          <div className="blogs-advert">
            <p className="medium-header">
              A blog for Passionate people
              <br />
              And website lovers.
            </p>
            <p className="small-header">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
              officia omnis cum, dolorum fugiat autem, earum nostrum voluptate,
              quas deleniti amet ipsam iusto placeat modi.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi
              aliquid dolorum ipsam ratione, omnis ab!
            </p>
          </div>

          <p className="small-header">Earlier Blogs</p>
          <div className="blog-grid">
            {filteredBlogs.map((blog) => (
              <BlogItem blog={blog} key={blog._id} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Blog;
