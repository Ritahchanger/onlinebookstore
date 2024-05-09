import React, { Fragment } from "react";
import Hero from "../components/Hero/Hero";
import Categories from "../components/HomePageComponents/categories/Categories";

const Home = () => {
  return (
    <Fragment>
      <Hero />
      <Categories />
    </Fragment>
  );
};

export default Home;
