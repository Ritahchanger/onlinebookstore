import "./Profile.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useEffect, useState } from "react";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import ProfileIcon from "../../../assets/icons/boy.png";
import { useSelector } from "react-redux";
import uploadIcon from "../../../assets/icons/upload.png";
import axios from "axios";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [wishlist, setWishlist] = useState([
    { id: 1, title: "Book Title 1", author: "Author 1", price: "10.99" },
    { id: 2, title: "Book Title 2", author: "Author 2", price: "15.49" },
  ]);
  const [fileMessage, setFileMessage] = useState(""); // New state for file upload message
  const [selectedFile, setSelectedFile] = useState(null); // State for the selected file

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  const removeBook = (id) => {
    setWishlist(wishlist.filter((book) => book.id !== id));
  };

  const addBook = () => {
    const newBook = {
      id: wishlist.length + 1,
      title: `Book Title ${wishlist.length + 1}`,
      author: `Author ${wishlist.length + 1}`,
      price: (Math.random() * 20 + 10).toFixed(2),
    };
    setWishlist([...wishlist, newBook]);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileMessage(`File "${file.name}" has been selected`);
    } else {
      setSelectedFile(null);
      setFileMessage("");
    }
  };

  const uploadProfileImage = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setFileMessage("Please select a file to upload.");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", selectedFile);

    console.log(formData)
  
    try {
      const result = await axios.post(
        `http://localhost:5000/api/users/${user.user._id}/update-profile`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      setFileMessage("File uploaded successfully");

      console.log(result.data); 

    } catch (error) {
      setFileMessage(
        `There was a problem accessing the server: ${error.message}`
      );
      console.error(error); // Log the error to the console
    }
  };
  

  return (
    <div className="account">
      <AccountNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <SideBar
        sidebar={sidebar}
        handleTerminationModel={handleTerminationModel}
      />
      <TerminationModel
        handleTerminationModel={handleTerminationModel}
        terminationModel={terminationModel}
      />

      <div className="profile">
        <p className="medium-header">PROFILE SECTION</p>
        <div className="container">
          <div className="user-information">
            <div className="profile-card">
              <div className="profile-image">
                {user.user.passport ? (
                  <img
                    src={`http://localhost:5000/upload/authors/${user.user.passport}`}
                    alt={`${user.user.firstName} ${user.user.lastName}`}
                  />
                ) : (
                  <img
                    src={ProfileIcon}
                    alt={`${user.user.firstName} ${user.user.lastName}`}
                  />
                )}
              </div>
              <form className="alter_profile" onSubmit={uploadProfileImage}>
                {/* <label htmlFor="change-profile" className="custom-file-label">
                  <img src={uploadIcon} alt="Upload Icon" />
                </label> */}
                <input
                  type="file"
                  name="changeProfile"
                  id="change-profile"
                  accept="image/*"
                  className="file-input"
                  onChange={handleFileChange}
                />

                {fileMessage && <p className="file-message">{fileMessage}</p>}
                {/* Display file upload message */}
                <button type="submit" className="cart-buttons">
                  SAVE
                </button>
              </form>
            </div>
            <div className="profile-card">
              <p className="small-header">{`${user.user.firstName} ${user.user.secondName}`}</p>
              <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio, dolore, iste odio recusandae in totam nihil,
                molestias officia voluptates error perspiciatis suscipit.
                Reprehenderit ducimus.
              </p>
              <div className="row profile-details">
                <p className="small-header">Phone</p>
                <p className="small-header">0712195228</p>
              </div>
              <div className="row profile-details">
                <p className="small-header">Peter</p>
                <p className="small-header">{`${user.user.email}`}</p>
              </div>
              <div className="row profile-details">
                <p className="small-header">Username</p>
                <p className="small-header">{`${user.user.username}`}</p>
              </div>
            </div>
          </div>

          <div className="main-section">
            <div className="wishlist-container">
              <h2>My Wishlist</h2>
              {wishlist.length > 0 ? (
                <ul>
                  {wishlist.map((book) => (
                    <li key={book.id}>
                      <div className="book-details">
                        <p className="book-title">{book.title}</p>
                        <p className="book-author">{book.author}</p>
                        <p className="book-price">${book.price}</p>
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => removeBook(book.id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Your wishlist is empty.</p>
              )}
              <button className="add-button" onClick={addBook}>
                Add Book
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
