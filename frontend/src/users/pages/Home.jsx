import React, { Fragment } from "react";
import Hero from "../components/Hero/Hero";
import Categories from "../components/HomePageComponents/categories/Categories";
import Ebook from "../components/HomePageComponents/ebooks/Ebook";
import NewRelease from "../components/HomePageComponents/NewReleases/NewRelease";
import FeaturedBook from "../components/HomePageComponents/FeaturedBook/FeaturedBook";

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <Categories />
      <Ebook />
      <NewRelease />
      {/* <FeaturedBook/> */}
    </Fragment>
  );
};

export default Home;
