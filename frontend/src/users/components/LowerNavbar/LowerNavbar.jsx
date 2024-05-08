import React, { useEffect, useState } from "react";
import { sectioncNavigation } from "../Data/NavbarData";
import "./LowerNavbar.css";
const LowerNavbar = () => {

  const [isFixed,setIsFixed]=useState(false);

  useEffect(()=>{

    const handleScroll = () =>{
      const offset = window.scrollY;
      if(offset > 100){
        setIsFixed(true);
      }else{
        setIsFixed(false);
      }
    }
    window.addEventListener("scroll",handleScroll);
    return ()=>{
      window.removeEventListener("scroll",handleScroll);
    };
  },[]);


  return (
    <div className={isFixed ? "lower_navbar fixed" : "lower_navbar"}>
      <div className="container">
        {sectioncNavigation.map((item, index) => (
          <p key={index} className="nav_li">
            <a href={item.path}>{item.menu_name}</a>
          </p>
        ))}
      </div>
    </div>
  );
};

export default LowerNavbar;
