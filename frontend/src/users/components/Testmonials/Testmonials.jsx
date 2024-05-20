import React, { useEffect, useState } from "react";

import "./Testimonials.css";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TestmonialImage from "../../../assets/authors/profile-14.jpg";

const Testmonials = () => {

    const [slidesToScroll,setSlidesToShow] = useState(3);


    useEffect(()=>{

    const handleResize = () =>{


        if(window.innerWidth <= 670){

            setSlidesToShow(2)

        }else{

            setSlidesToShow(3)
        }

    };

    handleResize();

    window.addEventListener("resize",handleResize);


    })


    var settings = {
        dots: true,
        infinite: false,
        speed: 700,
        slidesToShow:slidesToScroll,
        slidesToScroll: 1,
      };
    
    

  return (
    <div className="testmonials">
      <div className="container">
        <div className="testmonials-wrapper">

            <p className="medium-header">Testmonials</p>
          
          <Slider {...settings} >

          <div className="card">
            <p className="description">
              <sup className="quotes">"</sup>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos
              maiores distinctio cupiditate vero in error, illo minus earum,
              nemo inventore facilis rerum natus quas voluptatibus pariatur
              provident? Modi, consequuntur? Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </p>
            <div className="row">
              <div className="profile-image">
                <img src={TestmonialImage} alt="" />
              </div>
              <div className="col">
                <p className="small-header">Alexander Ndanu</p>
                <p className="description">Senior Manager</p>
              </div>
            </div>
          </div>
          <div className="card">
            <p className="description">
              <sup className="quotes">"</sup>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos
              maiores distinctio cupiditate vero in error, illo minus earum,
              nemo inventore facilis rerum natus quas voluptatibus pariatur
              provident? Modi, consequuntur? Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </p>
            <div className="row">
              <div className="profile-image">
                <img src={TestmonialImage} alt="" />
              </div>
              <div className="col">
                <p className="small-header">Alexander Ndanu</p>
                <p className="description">Senior Manager</p>
              </div>
            </div>
          </div>
          <div className="card">
            <p className="description">
              <sup className="quotes">"</sup>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos
              maiores distinctio cupiditate vero in error, illo minus earum,
              nemo inventore facilis rerum natus quas voluptatibus pariatur
              provident? Modi, consequuntur? Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </p>
            <div className="row">
              <div className="profile-image">
                <img src={TestmonialImage} alt="" />
              </div>
              <div className="col">
                <p className="small-header">Alexander Ndanu</p>
                <p className="description">Senior Manager</p>
              </div>
            </div>
          </div>
          <div className="card">
            <p className="description">
              <sup className="quotes">"</sup>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos
              maiores distinctio cupiditate vero in error, illo minus earum,
              nemo inventore facilis rerum natus quas voluptatibus pariatur
              provident? Modi, consequuntur? Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </p>
            <div className="row">
              <div className="profile-image">
                <img src={TestmonialImage} alt="" />
              </div>
              <div className="col">
                <p className="small-header">Alexander Ndanu</p>
                <p className="description">Senior Manager</p>
              </div>
            </div>
          </div>
          <div className="card">
            <p className="description">
              <sup className="quotes">"</sup>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos
              maiores distinctio cupiditate vero in error, illo minus earum,
              nemo inventore facilis rerum natus quas voluptatibus pariatur
              provident? Modi, consequuntur? Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </p>
            <div className="row">
              <div className="profile-image">
                <img src={TestmonialImage} alt="" />
              </div>
              <div className="col">
                <p className="small-header">Alexander Ndanu</p>
                <p className="description">Senior Manager</p>
              </div>
            </div>
          </div>
          <div className="card">
            <p className="description">
              <sup className="quotes">"</sup>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos
              maiores distinctio cupiditate vero in error, illo minus earum,
              nemo inventore facilis rerum natus quas voluptatibus pariatur
              provident? Modi, consequuntur? Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </p>
            <div className="row">
              <div className="profile-image">
                <img src={TestmonialImage} alt="" />
              </div>
              <div className="col">
                <p className="small-header">Alexander Ndanu</p>
                <p className="description">Senior Manager</p>
              </div>
            </div>
          </div>
          <div className="card">
            <p className="description">
              <sup className="quotes">"</sup>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quos
              maiores distinctio cupiditate vero in error, illo minus earum,
              nemo inventore facilis rerum natus quas voluptatibus pariatur
              provident? Modi, consequuntur? Lorem ipsum dolor sit amet
              consectetur adipisicing elit.
            </p>
            <div className="row">
              <div className="profile-image">
                <img src={TestmonialImage} alt="" />
              </div>
              <div className="col">
                <p className="small-header">Alexander Ndanu</p>
                <p className="description">Senior Manager</p>
              </div>
            </div>
          </div>

          </Slider>


        </div>
      </div>
    </div>
  );
};

export default Testmonials;
