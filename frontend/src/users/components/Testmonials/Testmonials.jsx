import React, { useEffect, useState } from "react";

import "./Testimonials.css";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TestmonialImage from "../../../assets/authors/profile-14.jpg";

import { TestmonialsData } from "../Data/TestmonialsData";

const Testmonials = () => {
  const [slidesToScroll, setSlidesToShow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 670) {
        setSlidesToShow(1);
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
    slidesToScroll: 1,
  };

  return (
    <div className="testmonials">
      <div className="container">
        <p className="medium-header">Testmonials</p>
        <div className="testmonials-wrapper">
          <Slider {...settings}>
            {TestmonialsData.map((item, index) => (
              <div className="card-item">
                <p className="description">
                  <sup className="quotes">"</sup>
                 {item.testmonialsDescription}
                </p>
                <div className="rating">
                  <p>
                    <i class="fa-regular fa-star"></i>
                  </p>
                  <p>
                    <i class="fa-regular fa-star"></i>
                  </p>
                  <p>
                    <i class="fa-regular fa-star"></i>
                  </p>
                  <p>
                    <i class="fa-regular fa-star-half-stroke"></i>
                  </p>
                  <p>
                    <i class="fa-regular fa-star-half-stroke"></i>
                  </p>
                </div>
                <div className="row">
                  <div className="profile-image">
                    <img src={item.imgUrl} alt="" />
                  </div>
                  <div className="col">
                    <p className="small-header">{item.testmoniacs}</p>
                    <p className="description">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testmonials;
