import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import Config from "../../Config";
import axios from "axios";

import { useEffect, useState } from "react";
const AllBooksAdministration = () => {
  const [sidebar, showSidebar] = useState(false);
  const [ searchTerm,setSearchTerm ] = useState("");
  const handleSidebar = () => {
    showSidebar(!sidebar);
  };
  const [allBooks, setAllBooks] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

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
  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = allBooks.filter((book) => {
    const fullName = `${book.author.firstName} ${book.author.secondName}`;

    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm) ||
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
                <td>APPROVED</td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((book) => (
                <tr>
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
                  <td>{`${book.upproved ? "True" : "False"} `}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllBooksAdministration;
