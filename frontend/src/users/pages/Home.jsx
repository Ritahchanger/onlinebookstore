import React, { div, useEffect } from "react";
import Hero from "../components/Hero/Hero";
import Categories from "../components/HomePageComponents/categories/Categories";
import Ebook from "../components/HomePageComponents/ebooks/Ebook";
import NewRelease from "../components/HomePageComponents/NewReleases/NewRelease";
import FeaturedBook from "../components/HomePageComponents/FeaturedBook/FeaturedBook";
import NewsLetter from "../components/HomePageComponents/NewsLetter/NewsLetter";
import Footer from "../components/Footer/Footer";

import './Home.css'
import Testmonials from "../components/Testmonials/Testmonials";

const Home = () => {

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  return (
    <div className="home">
      <Hero />
      <Categories />
      <Ebook /> 
       <NewRelease />
      <FeaturedBook/>
      <Testmonials/>
      <NewsLetter/>
      <Footer/>
    </div>
  );
};

export default Home;
