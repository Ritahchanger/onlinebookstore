import React, { useEffect, useState } from "react";
import SectionTitle from "../shopComponents/SectionTitle";
import "./sellingAuthors.css";
import SellingItem from "./SellingItem";
import Footer from "../Footer/Footer";
import axios from "axios";

const BestSellingAuthors = () => {

  const [sellingAuthors, setSellingAuthors] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const getSellingAuthors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/author/selling/books/"
      );

      if (!response.data.success) {
        throw new Error("Internal server error");
      }

      setSellingAuthors(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSellingAuthors();
  }, []);

  return (
    <div className="selling-authors">
      <div className="container">
        <div className="selling-tables">
          <table>
            <thead>
              <tr>
                <td>NAME</td>
                <td>MOST SELLING BOOK</td>
                <td>BOOKS TOTAL SALE</td>
                <td>SHOP</td>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="3">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="3">Error: {error}</td>
                </tr>
              ) : (
                sellingAuthors &&
                sellingAuthors.map((sellingAuthor) => (
                  <SellingItem
                    key={sellingAuthor._id}
                    sellingAuthor={sellingAuthor}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingAuthors;
