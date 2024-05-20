import React from "react";
import "./NewsLetter.css";
const NewsLetter = () => {
  return (
    <div className="newsletter">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="subscribe medium-header">Subscribe To Our Newsletter</p>
          </div>
          <div className="col">
            <p className="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum quas
              ea fugiat tempore totam! Mollitia earum laboriosam qui.
            </p>
            <form action="#" className="newsLetterForm">
              <input
                type="email"
                placeholder="Enter your email is address..."
              />
              <button type="submit">
                SEND
                <i class="fa-regular fa-envelope"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
