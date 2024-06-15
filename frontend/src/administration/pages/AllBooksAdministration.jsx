import React, { useEffect, useState } from "react";
import axios from "axios";
import Config from "../../Config";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import { useDispatch, useSelector } from "react-redux";
import Preloaders from "../../users/components/Preloaders/Preloaders";
import { showLoading, hideLoading } from "../../users/Redux/features/alertSlice";

const AllBooksAdministration = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.alerts.loading);

  const [sidebar, showSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [allBooks, setAllBooks] = useState([]);

  // Fetch all books from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get(`${Config.apiUrl}/api/books/`);
      setAllBooks(response.data.data);
    } catch (error) {
      console.log(
        `There was an error fetching the data from the backend => ${error.message}`
      );
    }
  };

  // Initial fetch on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Function to handle opening/closing sidebar
  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to delete a book
  const deleteBook = async (bookId, authorId) => {
    try {
      dispatch(showLoading()); // Show loading indicator
      await axios.delete(
        `${Config.apiUrl}/api/books/delete/${bookId}/user/${authorId}`
      );
      // After deletion, update the books list by refetching
      fetchData();
    } catch (error) {
      console.log(`Error deleting book: ${error.message}`);
    } finally {
      dispatch(hideLoading()); // Hide loading indicator regardless of success or failure
    }
  };

  // Filter books based on search term
  const filteredData = allBooks.filter((book) => {
    const fullName = `${book.author.firstName} ${book.author.secondName}`;

    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="admin">
      <AdminNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <AdminSidebar sidebar={sidebar} />
      <p className="medium-header">ALL BOOKS</p>
      <div className="container">
        <div className="input_group">
          <input
            type="text"
            name="search_book"
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
                <th>COVER IMAGE</th>
                <th>TITLE</th>
                <th>AUTHOR</th>
                <th>CATEGORY</th>
                <th>UPLOADED ON</th>
                <th>APPROVED</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((book) => (
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
                  <td>{book.approved ? "True" : "False"}</td>
                  <td>
                    <button
                      className="cart-buttons"
                      onClick={() => deleteBook(book._id, book.author._id)}
                      disabled={loading} // Disable button during deletion process
                    >
                      {loading ? "Deleting..." : "DELETE"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <p>No books found matching your search criteria.</p>
          )}
        </div>
      </div>
      {loading && <Preloaders />}
    </div>
  );
};

export default AllBooksAdministration;
