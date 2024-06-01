import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ActiveBooks = () => {
  const user = useSelector((state) => state.auth.user);

  const [books, setBooks] = useState(null);

  const getBooksByAuthor = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/books/authors/${user.user._id}`
      );

      if (response.status !== 200) {
        throw new Error(`Server returned status ${response.status}`);
      }

      setBooks(response.data.data);
    } catch (error) {
      console.log(
        `There was a problem fetching the data from the backend->${error.message}`
      );
    }
  };

  useEffect(() => {
    getBooksByAuthor();
  }, [user.user._id]);

  return (
    <div className="active-books">
      <div className="container">
        <p className="medium-header">ACTIVE BOOKS</p>
        <div className="table_wrapper">
          <table>
            <thead>
              <tr>
                <td>TITLE</td>
                <td>AUTHOR</td>
                <td>REVIEWS</td>
                <td>RATINGS</td>
                <td>VIEW</td>
              </tr>
            </thead>
            <tbody>
              {books &&
                books.map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{`${user.user.firstName} ${user.user.secondName}`}</td>
                    <td>{book.reviews}</td>
                    <td>{book.ratings}</td>
                    <td>
                      <i className="fa fa-eye"></i>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ActiveBooks;
