import "./Account.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useEffect, useState } from "react";
import ActiveBooks from "./ActiveBooks";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import axios from "axios"; // Import axios for making API calls
import { useSelector } from "react-redux";

const PendingApprovals = () => {
  const user = useSelector((state) => state.auth.user);

  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [unapprovedBooks, setUnapprovedBooks] = useState([]); // State to store unapproved books

  useEffect(() => {
    const getUnapprovedBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/author/books/unapproved/${user.user._id}`
        );
        setUnapprovedBooks(response.data.data); // Update state with unapproved books from the server
      } catch (error) {
        console.error("Error fetching unapproved books:", error);
      }
    };

    getUnapprovedBooks(); // Call the function to fetch unapproved books when the component mounts
  }, [user.user._id]); // Trigger useEffect whenever user ID changes

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  return (
    <div className="account">
      <AccountNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <SideBar
        sidebar={sidebar}
        handleTerminationModel={handleTerminationModel}
      />

      <div className="my-books">
        <div className="container">
          {unapprovedBooks && unapprovedBooks.length > 0 ? (
            <>
              <p className="medium-header">PENDING APPROVALS</p>
              <div className="table_wrapper">
                <table>
                  <thead>
                    <tr>
                      <td>NAME</td>
                      <td>AUTHOR</td>
                      <td>VIEW</td>
                    </tr>
                  </thead>
                  <tbody>
                    {unapprovedBooks.map((book) => (
                      <tr key={book._id}>
                        <td>{book.title}</td>
                        <td>{`${user.user.firstName} ${user.user.secondName}`}</td>
                        <td>
                          <i className="fa fa-eye"></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <p className="books_message">No unapproved books found</p>
          )}
        </div>
      </div>

      <TerminationModel
        handleTerminationModel={handleTerminationModel}
        terminationModel={terminationModel}
      />
    </div>
  );
};

export default PendingApprovals;
