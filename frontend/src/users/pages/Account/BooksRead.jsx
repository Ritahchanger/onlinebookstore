import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import axios from "axios";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import { useSelector } from "react-redux";

const BooksRead = () => {
  const user = useSelector((state) => state.auth.user);
  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [booksRead, setBooksRead] = useState([]);

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length <= 15) {
      return description;
    }
    return words.slice(0, 15).join(" ") + "...";
  };

  useEffect(() => {
    const getBooksRead = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cart/purchase/${user.user._id}/get`
        );
        const backendData = response.data.data;
        const allItems = backendData.flatMap((purchase) => purchase.items);
        setBooksRead(allItems);
        console.log(allItems);
      } catch (error) {
        console.error("Error fetching books read:", error);
      }
    };
    getBooksRead();
  }, [user.user._id]);

  return (
    <div className="account">
      <AccountNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <SideBar
        sidebar={sidebar}
        handleTerminationModel={handleTerminationModel}
      />

      <div className="my-books">
        <div className="container">
          <p className="medium-header">BOOKS READ</p>
          <div className="table_wrapper">
            {booksRead.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Cover Image</th>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {booksRead.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={`http://localhost:5000/upload/books/${item.productId.coverImage}`}
                          alt={item.productId.title}
                          style={{ width: "50px" }}
                        />
                      </td>
                      <td>{item.productId.title}</td>
                      <td>{truncateDescription(item.productId.description)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No books read</p>
            )}
          </div>
        </div>
      </div>

      <TerminationModel
        handleTerminationModel={handleTerminationModel}
        terminationModel={terminationModel}
      />
    </div>
  );
};

export default BooksRead;
