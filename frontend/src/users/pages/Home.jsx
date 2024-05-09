import React, { Fragment } from "react";
import Hero from "../components/Hero/Hero";
import Categories from "../components/HomePageComponents/categories/Categories";
import Ebook from "../components/HomePageComponents/ebooks/Ebook";
import NewRelease from "../components/HomePageComponents/NewReleases/NewRelease";

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <Categories />
      <Ebook />
      <NewRelease />
    </Fragment>
  );
};

export default Home;
