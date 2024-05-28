import "./Account.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useEffect, useState } from "react";
import TerminationModel from "../../components/TerminationModel/TerminationModel";

import "./EditingAndPublishing.css"

const EditingAndPublishing = () => {
  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [books, setBooks] = useState([]);
  const [pendingBooks, setPendingBooks] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // Assume we have a way to check if user is admin

  useEffect(() => {
    // Fetch books and pending books from API
    // setBooks(fetchedBooks);
    // setPendingBooks(fetchedPendingBooks);
  }, []);

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };
  
  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  const handleUpload = (newBook) => {
    setPendingBooks([...pendingBooks, newBook]);
  };

  const handleApproval = (approvedBook) => {
    setPendingBooks(pendingBooks.filter(book => book.id !== approvedBook.id));
    setBooks([...books, approvedBook]);
  };

  const UploadForm = ({ handleUpload }) => {
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [type, setType] = useState("ebook");

    const handleSubmit = (e) => {
      e.preventDefault();
      const newBook = { id: Date.now(), title, file, type, status: "pending" };
      handleUpload(newBook);
    };

    return (
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="ebook">eBook</option>
          <option value="audiobook">Audiobook</option>
        </select>
        <button type="submit" className="submit-btn">Upload</button>
      </form>
    );
  };

  const BookList = ({ books }) => {
    return (
      <div>
        <ul>
          {books.map(book => (
            <li key={book.id}>{book.title} ({book.type}) - {book.status}</li>
          ))}
        </ul>
      </div>
    );
  };

  const ApprovalPanel = ({ pendingBooks, handleApproval }) => {
    const approveBook = (book) => {
      const approvedBook = { ...book, status: "approved" };
      handleApproval(approvedBook);
    };

    return (
      <div>
        <h3>Pending Approvals</h3>
        <ul>
          {pendingBooks.map(book => (
            <li key={book.id}>
              {book.title} ({book.type}) 
              <button onClick={() => approveBook(book)}>Approve</button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="account">
      <AccountNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <SideBar
        sidebar={sidebar}
        handleTerminationModel={handleTerminationModel}
      />

      <div className="editing">
        <div className="container">
          <p className="medium-header">EDITING AND PUBLISHING</p>
          <div className="notice">
            <p>Please note that your eBook and audiobook must be approved by an admin before they can be published.</p>
          </div>
          <UploadForm handleUpload={handleUpload} />
          <BookList books={books} />
          {isAdmin && <ApprovalPanel pendingBooks={pendingBooks} handleApproval={handleApproval} />}
        </div>
      </div>

      <TerminationModel
        handleTerminationModel={handleTerminationModel}
        terminationModel={terminationModel}
      />
    </div>
  );
};

export default EditingAndPublishing;
