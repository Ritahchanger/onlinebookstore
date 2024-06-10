import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import Config from "../../Config";
import "./Admin.css";
import CloseIcon from "../../assets/icons/close.png"

const UnapprovedBooks = () => {
  const [sidebar, showSidebar] = useState(false);
  const [unapprovedBooks, setUnapprovedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [ approveBook,setApproveBook ] = useState(null)

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Config.apiUrl}/api/books/unapproved`);
      setUnapprovedBooks(response.data.data);
    } catch (error) {
      console.log(
        `There was an error fetching the data from the backend => ${error.message}`
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = unapprovedBooks.filter((book) => {
    const fullName = `${book.author.firstName} ${book.author.secondName}`;
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm) ||
      fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleBookApproving = () =>{

    
  }

  return (
    <div className="admin">
      <AdminNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <AdminSidebar sidebar={sidebar} />
      <p className="medium-header">UNAPPROVED BOOKS</p>
      <div className="container">
        <div className="input_group">
          <input
            type="text"
            name="search_book"
            id=""
            placeholder="Search book..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="table_wrapper">
          <table>
            <thead>
              <tr>
                <td>COVER IMAGE</td>
                <td>TITLE</td>
                <td>AUTHOR</td>
                <td>CATEGORY</td>
                <td>UPLOADED ON</td>
                <td>APPROVE</td>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book._id}>
                  <td>
                    <img
                      src={`${Config.apiUrl}/upload/books/${book.coverImage}`}
                      alt={book.title}
                      width="50"
                    />
                  </td>
                  <td>{book.title}</td>
                  <td>{`${book.author.firstName} ${book.author.secondName}`}</td>
                  <td>{book.category}</td>
                  <td>{new Date(book.uploadedAt).toLocaleDateString()}</td>
                  <td>
                    <button className="cart-buttons">Approve</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="custom-modal">
        <div className="modal-dialog">
          <p className="close_icon">
            <img src={CloseIcon} alt="" />
          </p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui laudantium at nisi molestias maiores enim, animi deleniti voluptate quidem velit et itaque accusantium laborum praesentium blanditiis voluptatem neque quaerat quis!</p>
        </div>
      </div>

    </div>
  );
};

export default UnapprovedBooks;
