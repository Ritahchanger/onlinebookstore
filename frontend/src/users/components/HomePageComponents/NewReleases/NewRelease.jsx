import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewReleases.css";
import NewRelaseImage from "../../../../assets/images/cover.webp";

import { useSelector,useDispatch} from "react-redux"; 

import { openBookModal } from "../../../Redux/features/BookDescriptionSlice"; 

const NewRelease = () => {

  const dispatch = useDispatch();

  const [slidesToShow, setSlidesToShow] = useState(4);
  const [newReleaseBooks, setNewReleaseBooks] = useState([]);

  const fetchNewRelease = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books/new/release");

      if (!response.data.success) {
        throw new Error('Internal server error');
      }

      setNewReleaseBooks(response.data.data);

    } catch (error) {
      console.log(`There was a problem fetching the data from the backend => ${error.message}`);
    }
  };

  useEffect(() => {
    fetchNewRelease();

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


  const viewBook = (book) =>{
    dispatch(openBookModal(book))
  }

  return (
  <div className="new-releases">
      <div className="container">
        <p className="small-header">SOME QUALITY ITEMS</p>
        <p className="medium-header">New Release Books</p>

        <div className="container-wrapper">
          <Slider {...settings}>
            {newReleaseBooks.map((book, index) => (
              <div className="book" key={index} onClick={()=>{
                viewBook(book)
              }}>
                <div className="img-wrapper">
                  {book.coverImage ? (
                    <img src={`http://localhost:5000/upload/books/${book.coverImage}`} alt={book.title} />
                  ) : (
                    <img src={NewRelaseImage} alt={book.title} />
                  )}
                </div>
                <div className="book-body">
                  <p className="book-title">{book.title || "Title not available"}</p>
                  <p className="book-author">{`${book.author?.firstName || 'Unknown'} ${book.author?.secondName || 'Author'}`}</p>
                  <p className="book-price">{`${book.price || 0} sh`}</p>
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
