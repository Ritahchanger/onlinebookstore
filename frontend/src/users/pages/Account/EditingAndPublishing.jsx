import React, { useState } from "react";
import "./Account.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import axios from 'axios';
import { useSelector } from "react-redux";
import "./EditingAndPublishing.css";

const EditingAndPublishing = () => {
  const user = useSelector((state) => state.auth.user);

  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [category, setCategory] = useState("spiritual"); // Initialize category state

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  const UploadForm = () => {
    const [title, setTitle] = useState("");
    const [bookFile, setBookFile] = useState(null);
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [type, setType] = useState("ebook");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [errors, setErrors] = useState({});

    const validate = () => {
      const newErrors = {};

      if (!title) newErrors.title = "Title is required";
      if (!bookFile) newErrors.bookFile = "Book file is required";
      if (!coverImageFile) newErrors.coverImageFile = "Cover image is required";
      if (!price || isNaN(price)) newErrors.price = "Valid price is required";
      if (!description) newErrors.description = "Description is required";
      if (type !== "ebook") newErrors.type = "Only eBooks can be uploaded";

      return newErrors;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const newErrors = validate();

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("author", user.user._id);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("book", bookFile);
      formData.append("coverImage", coverImageFile);
      formData.append("category", category); // Add category to form data

      try {
        const response = await axios.post('http://localhost:5000/api/books/add', formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
        setUploadMessage("Book uploaded successfully!");

        console.log(response.data)

        // Clear form fields after successful upload if needed
        setTitle("");
        setBookFile(null);
        setCoverImageFile(null);
        setType("ebook");
        setDescription("");
        setPrice("");
        setErrors({});
      } catch (error) {
        console.log(`There was an error uploading the book: ${error.message}`);
      }
    };

    return (
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>
        <div className="row">
          <div>
            <label htmlFor="bookFile">Book (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              name="bookFile"
              onChange={(e) => setBookFile(e.target.files[0])}
              required
            />
            {errors.bookFile && <span className="error">{errors.bookFile}</span>}
          </div>
          <div>
            <label htmlFor="coverImageFile">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              name="coverImageFile"
              onChange={(e) => setCoverImageFile(e.target.files[0])}
              required
            />
            {errors.coverImageFile && <span className="error">{errors.coverImageFile}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            placeholder="Price.."
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>
        <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="spiritual">SPIRITUAL</option>
          <option value="academic">ACADEMIC</option>
          <option value="business">BUSINESS</option>
        </select>
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={5}
            cols={50}
          ></textarea>
          {errors.description && <span className="error">{errors.description}</span>}
        </div>
        <div>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="ebook">eBook</option>
            <option value="audiobook">Audiobook</option>
          </select>
          {errors.type && <span className="error">{errors.type}</span>}
        </div>
        <button type="submit" className="submit-btn">
          Upload
        </button>
        {uploadMessage && <div className="upload-message">{uploadMessage}</div>}
      </form>
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
          <p className="medium-header" style={{ textTransform: "uppercase" }}>
            Files to be edited and/or Published
          </p>
          <div className="notice">
            <p>
              Please note that your eBook and audiobook must be approved by an
              admin before they can be published.
            </p>
          </div>
          <UploadForm />
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
