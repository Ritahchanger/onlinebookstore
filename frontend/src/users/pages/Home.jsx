import React, { div, useEffect } from "react";
import Hero from "../components/Hero/Hero";
import Categories from "../components/HomePageComponents/categories/Categories";
import Ebook from "../components/HomePageComponents/ebooks/Ebook";
import NewRelease from "../components/HomePageComponents/NewReleases/NewRelease";
import FeaturedBook from "../components/HomePageComponents/FeaturedBook/FeaturedBook";
import NewsLetter from "../components/HomePageComponents/NewsLetter/NewsLetter";
import Footer from "../components/Footer/Footer";

import "./Home.css";
import Testmonials from "../components/Testmonials/Testmonials";

import BookDescriptionModal from "../components/Books/BookDescriptionModal";

import { useSelector } from "react-redux";

const Home = () => {
  const isUserLogged = useSelector((state) => state.auth.isLoggedIn);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  console.log(process.env.REACT_APP_BASE_URL);

  return (
    <div className="home">
      <Hero />
      <Categories />
      <Ebook />
      <NewRelease />
      <FeaturedBook />
      <Testmonials />
      {isUserLogged && !user.user.newsLetter ? <NewsLetter /> : null}
      <BookDescriptionModal />
      <Footer />
    </div>
  );
};

export default Home;
