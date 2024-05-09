import React from "react";
import "./NewsLetter.css";
const NewsLetter = () => {
  return (
    <div className="newsletter">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="medium-header">Subscribe To Our Newsletter</p>
          </div>
          <div className="col">
            <p className="description">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum quas
              ea fugiat tempore totam! Mollitia earum laboriosam qui.
            </p>
            <form action="#" className="newsLetterForm">
              <input
                type="email"
                placeholder="Enter your email is address here..."
              />
              <button type="submit">
                SEND
                <i class="fa-regular fa-envelope"></i>
              </button>
            </form>
          </div>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero possimus, in fuga quibusdam sed ex adipisci facere enim magni perspiciatis porro ullam earum cupiditate odio ab eveniet, dolorum veritatis corporis similique nihil a alias! Sapiente doloremque dignissimos quam voluptates voluptas voluptatibus illo quaerat iure porro eaque culpa hic numquam, harum voluptatem sunt quos eligendi, eum magnam sed repudiandae a, ratione earum perspiciatis ex?</p>
      </div>
    </div>
  );
};

export default NewsLetter;
