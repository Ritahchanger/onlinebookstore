import React, { Fragment, useEffect } from "react";
import LowerNavbar from "../LowerNavbar/LowerNavbar";
import "./cart.css";

import { Link } from "react-router-dom";

import CartItem from "./CartItem";

import Footer from "../Footer/Footer";

const Cart = () => {

  useEffect(()=>{
    window.scrollTo(0,0)
  })


  return (
    <Fragment>
      <LowerNavbar />
      <div className="cart">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="header">
                <p className="medium-header">SHOPPING CART</p>
                <p className="medium-header">3 Items</p>
              </div>
              <hr />
              <table className="cart-table">
                <thead>
                  <tr>
                    <td>DETAILS</td>
                    <td>QUANTITY</td>
                    <td>PRICE</td>
                    <td>TOTAL</td>
                  </tr>
                </thead>
                <tbody>
                  <CartItem />
                  <CartItem />
                  <CartItem />
                </tbody>
              </table>
            </div>
            <div className="col">
              <div className="header">
                <p className="medium-header">Order Summary</p>
                <hr />
              </div>

              <div className="row">
                <p className="small-header">ITEMS 3</p>
                <p className="small-header">SH 78000</p>
              </div>

              <p className="small-header">SHIPPING</p>
              <select name="#" id="#">
                <option value="standard">Standard Delivery -sh 7999</option>
              </select>
              <p className="small-header">PROMO CODE</p>
              <input type="text" placeholder="Enter promo code.." />
              <input type="submit" value="APPLY" className="submit-btn" />
              <hr />
              <div className="row">
                <p className="small-header">TOTAL COST</p>
                <p className="small-header">SH 78000</p>
              </div>
              <input type="submit" value="CHECKOUT" className="submit-btn" />
            </div>
          </div>
          <p className="link-text">
            <Link to="/78546894386">
              {" "}
              <i className="fa fa-arrow-left"></i>Continue shopping?
            </Link>
          </p>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Cart;
