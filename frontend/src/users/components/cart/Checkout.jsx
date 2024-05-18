import React from "react";

import "./checkout.css";

import { Link } from "react-router-dom";

import MpesaLogo from "../../../assets/images/mpesa.png";

const Checkout = () => {
  return (
    <div className="checkout">
      <div className="container">
        <p className="medium-header">CHECKOUT</p>
        <div className="grid">
          <div className="col">
            
            <form action="#">
              <div className="input-group">
                <input type="text" placeholder="Email" />
              </div>
              <p className="small-header">Shipping address</p>
              <div className="input-group">
                <input type="text" placeholder="Country/Location" />
              </div>

              <div className="row">
                <div className="input-group">
                  <input type="text" name="" id="" placeholder="First name" />
                </div>
                <div className="input-group">
                  <input type="text" name="" id="" placeholder="Last name" />
                </div>
              </div>
              <div className="input-group">
                <input type="text" placeholder="Company " />
              </div>
              <div className="input-group">
                <input type="text" placeholder="Address " />
              </div>

              <div className="home">
                <div className="input-group">
                  <input type="text" placeholder="City" />
                </div>
                <div className="input-group">
                  <input type="text" placeholder="State" />
                </div>
                <div className="input-group">
                  <input type="text" placeholder="ZIP code" />
                </div>
              </div>

              <div className="input-group">
                <input type="text" placeholder="Phone (optional)" />

                
              </div>
            </form>
          </div>

          <div className="col">
            <div className="pay-row">
              <div className="card">
                <p>
                  <i class="fa-brands fa-paypal"></i>
                </p>
              </div>
              <div className="card">
                <p>
                  <img src={MpesaLogo} />
                </p>
              </div>
            </div>

            <div className="row check-items-cart">
              <p>Item(5) In Cart</p>
              <p>
                <Link>Details</Link>
              </p>
            </div>

            <div className="row cart-item">
              <p className="description">Order Subtotal</p>
              <p className="description">$34.99</p>
            </div>
            <div className="row cart-item">
              <p className="description">Sale Discount</p>
              <p className="description">$24.49</p>
            </div>
            <div className="row cart-item">
              <p className="description">Shopping Details</p>
              <p className="description">$8.99</p>
            </div>
            <div className="row cart-item">
              <p className="description">Pre-Tax Total</p>
              <p className="description">$33.48</p>
            </div>
            <div className="row cart-item">
              <p className="medium-header">Total savings</p>
              <p className="medium-header">$78.00</p>
            </div>
            <input
                  type="submit"
                  value="PROCEED TO PAY"
                  className="submit-btn"
                />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
