import React, { Fragment } from "react";
import Hero from "../components/Hero/Hero";
import Categories from "../components/HomePageComponents/categories/Categories";
import Ebook from "../components/HomePageComponents/ebooks/Ebook";

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <Categories />
      <Ebook/>
    </Fragment>
  );
};

export default Home;
