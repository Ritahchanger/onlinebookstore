import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./Categories.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CategoriesData } from "../../Data/CategoriesData";
const Categories = () => {
  const [slidesToScroll, setSlidesToShow] = useState(3);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 670) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  });
  var settings = {
    dots: true,
    infinite: false,
    speed: 700,
    slidesToShow: slidesToScroll,
    slidesToScroll: 2,
  };
  return (
    <div className="categories">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="small-header">Categories</p>
            <div className="medium-header">Explore our Top Categories</div>
          </div>
          <div className="col">
            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
              ex, sit deserunt adipisci corrupti molestias excepturi, corporis
              nesciunt modi omnis odit quidem. Nulla molestiae, ducimus soluta
              aliquid, nostrum nobis magnam aliquam, animi placeat maiores
              dignissimos a perspiciatis sit quaerat porro!
            </p>
          </div>
        </div>

        <div className="books-categories">
          <Slider {...settings}>
            {CategoriesData.map((item, index) => (
              <div className="book-show">
                <div className="img-wrapper">
                  <img src={item.imgUrl} alt="" />
                </div>
                <div className="card-body">
                  <p className="small-header">{item.smallHeader}</p>
                  <p className="description">{item.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Categories;
