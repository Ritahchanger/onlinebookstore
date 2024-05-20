import React from "react";

import SectionTitle from "../shopComponents/SectionTitle";

import "./sellingAuthors.css";

import { bestSellingAuthorsData } from "../Data/BestSellingAuthorsData";
import Footer from "../Footer/Footer";

import SellingItem from "./SellingItem";

const BestSellingAuthors = () => {
  return (
    <div className="selling-authors">
      <div className="container">
        <div className="selling-tables">
          <table>
            <thead>
              <tr>
                <td>AUTHORS</td>
                <td>BOOK</td>
                <td>YEAR</td>
                <td>REVIEWS</td>
                <td>SHOP</td>
              </tr>
            </thead>

            <tbody>
              {bestSellingAuthorsData.map((sellingItem, index) => (
                <SellingItem key={index} sellingItem={sellingItem} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingAuthors;
