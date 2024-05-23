import React, { Fragment, useEffect, useState } from "react";
import LowerNavbar from "../components/LowerNavbar/LowerNavbar";
import Footer from "../components/Footer/Footer";
import "./Blog.css";
import { blogSampleData } from "../components/Data/BlogData";

import axios from "axios"
import { Link, useBeforeUnload } from "react-router-dom";

import BlogItem from "../components/BlogPageComponents/BlogItem";

const Blog = () => {


  const [data,getData] = useState([]);

  const handleDataFromBackend = async () =>{

    try{

      const response = await axios.get("http://localhost:5000/api/blog/get");

      if(response.status!=200){

        throw new Error("Error getting data from the backend");

      }

      getData(response.data);


    }catch(err){

      console.log(err)

    }

  }

  // useEffect(()=>{

  //   handleDataFromBackend()

  //   console.log(data);

  // })


  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

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
              <BlogItem item={item} />
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
            {blogSampleData.map((item, index) => (
              <BlogItem item={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Blog;
