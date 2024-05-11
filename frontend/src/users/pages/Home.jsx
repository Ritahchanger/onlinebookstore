import React, { Fragment } from "react";
import Hero from "../components/Hero/Hero";
import Categories from "../components/HomePageComponents/categories/Categories";
import Ebook from "../components/HomePageComponents/ebooks/Ebook";
import NewRelease from "../components/HomePageComponents/NewReleases/NewRelease";
import FeaturedBook from "../components/HomePageComponents/FeaturedBook/FeaturedBook";
import NewsLetter from "../components/HomePageComponents/NewsLetter/NewsLetter";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <Categories />
      <Ebook /> 
       <NewRelease />
      <FeaturedBook/>
      <NewsLetter/>
      <Footer/>
    </Fragment>
  );
};

export default Home;
