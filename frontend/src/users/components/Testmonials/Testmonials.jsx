import React, { useEffect, useState } from "react";

import "./Testimonials.css";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TestmonialImage from "../../../assets/authors/profile-14.jpg";

import axios from "axios";

import { TestmonialsData } from "../Data/TestmonialsData";

import { useSelector } from "react-redux";

const Testmonials = () => {
  const user = useSelector((state) => state.auth.user);

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

  const [testmonies, setTestmonies] = useState(null);

  var settings = {
    dots: true,
    infinite: false,
    speed: 700,
    slidesToShow: slidesToScroll,
    slidesToScroll: 1,
  };

  const fetchTestimonies = async (req, res) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/testmonials/get`
      );

      if (!response.data.success) {
        throw new Error(
          `There was an error fetching the data from the backend`
        );
      }

      setTestmonies(response.data.data);

      console.log(response);
    } catch (error) {
      console.error(
        `There was an error fetching the data from the backend :${error.message}`
      );
    }
  };

  useEffect(() => {
    fetchTestimonies();
    console.log(testmonies);
  }, [user.user._id]);

  return (
    <div className="testmonials">
      {testmonies ? (
        <div className="container">
          <p className="medium-header">Testmonials</p>
          <div className="testmonials-wrapper">
            <Slider {...settings}>
              {testmonies.map((item) => (
                <div className="card-item" key={item._id}>
                  <p className="description">
                    <sup className="quotes">"</sup>
                    {item.description}
                  </p>
                  {/* <div className="rating">
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
                  </div> */}
                  <div className="row">
                    <div className="profile-image">
                      <img src={`http://localhost:5000/upload/authors/${item.passport}`} alt="" />
                    </div>
                    
                      <p className="small-header">{`${item.firstName} ${item.secondName}`}</p>
                    
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      ) : (
        <p>Testmonies were not properly fetched</p>
      )}
    </div>
  );
};

export default Testmonials;
