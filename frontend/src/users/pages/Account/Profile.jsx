import "./Profile.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import { useState } from "react";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import ProfileIcon from "../../../assets/icons/boy.png";

const Profile = () => {
  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [wishlist, setWishlist] = useState([
    { id: 1, title: "Book Title 1", author: "Author 1", price: "10.99" },
    { id: 2, title: "Book Title 2", author: "Author 2", price: "15.49" },
  ]);

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
                <img src={ProfileIcon} alt="Profile" />
              </div>
              <label htmlFor="change-profile" className="edit-profile-label">
                Edit Profile
              </label>
              <input type="file" name="change-profile" id="change-profile" />
            </div>
            <div className="profile-card">
              <p className="small-header">Jeremy Rose</p>
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
                <p className="small-header">Email</p>
                <p className="small-header">peterdennis573@gmail.com</p>
              </div>
              <div className="row profile-details">
                <p className="small-header">ID</p>
                <p className="small-header">34758235</p>
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
