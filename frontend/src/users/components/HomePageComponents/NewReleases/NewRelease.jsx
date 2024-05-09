import React, { useState, useEffect } from "react";
import NewRelaseImage from "../../../../assets/images/cover.webp";
import "./NewReleases.css";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NewReleaseData } from "../../Data/NewRelasesData";

const NewRelease = () => {
  const [slidesToShow, setSlidesToShow] = useState(4);

  useEffect(() => {
    function determineSlidesToShow() {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 630) {
        setSlidesToShow(4);
      } else if (screenWidth >= 400) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(2);
      }
    }

    determineSlidesToShow();

    window.addEventListener("resize", determineSlidesToShow);
    return () => {
      window.removeEventListener("resize", determineSlidesToShow);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 700,
    slidesToShow: slidesToShow,
    slidesToScroll: 2,
  };

  return (
    <div className="new-releases">
      <div className="container">
        <p className="small-header">SOME QUALITY ITEMS</p>
        <p className="medium-header">New Release Books</p>

        <div className="container-wrapper">
          <Slider {...settings}>
            {NewReleaseData.map((item, index) => (
              <div className="book" key={index}>
                <div className="img-wrapper">
                  <img src={NewRelaseImage} alt="" />
                </div>
                <div className="book-body">
                  <p className="book-title">{item.bookTitle}</p>
                  <p className="book-author">{item.bookAuthor}</p>
                  <p className="book-price">{`${item.bookPrice} sh`}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default NewRelease;
