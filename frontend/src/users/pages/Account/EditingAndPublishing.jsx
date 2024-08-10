import { useState } from "react";
import "./Account.css";
import SideBar from "./SideBar";
import AccountNavbar from "./AccountNavbar";
import TerminationModel from "../../components/TerminationModel/TerminationModel";
import axios from 'axios';
import { useSelector } from "react-redux";
import "./EditingAndPublishing.css";
import Config from "../../../Config";

const EditingAndPublishing = () => {
  const user = useSelector((state) => state.auth.user);

  const [sidebar, showSidebar] = useState(false);
  const [terminationModel, showTerminationModel] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [category, setCategory] = useState("spiritual");

  const [formValues, setFormValues] = useState({
    title: "",
    bookFile: null,
    coverImageFile: null,
    type: "ebook",
    description: "",
    price: "",
  });

  const [errors, setErrors] = useState({});

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const handleTerminationModel = () => {
    showTerminationModel(!terminationModel);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormValues({
        ...formValues,
        [name]: files[0],
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: value,
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    const { title, bookFile, coverImageFile, price, description, type } = formValues;

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
    formData.append("title", formValues.title);
    formData.append("author", user.user._id);
    formData.append("price", formValues.price);
    formData.append("description", formValues.description);
    formData.append("book", formValues.bookFile);
    formData.append("coverImage", formValues.coverImageFile);
    formData.append("category", category);

    try {
      const response = await axios.post(`${Config.apiUrl}/api/books/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setUploadMessage("Book uploaded successfully!");

      console.log(response.data);

      // Clear form fields after successful upload if needed
      setFormValues({
        title: "",
        bookFile: null,
        coverImageFile: null,
        type: "ebook",
        description: "",
        price: "",
      });
      setErrors({});
    } catch (error) {
      console.log(`There was an error uploading the book: ${error.message}`);
    }
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
          <form onSubmit={handleSubmit} noValidate>
            <div>
              <input
                type="text"
                placeholder="Title"
                name="title"
                value={formValues.title}
                onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                value={formValues.price}
                onChange={handleInputChange}
                required
              />
              {errors.price && <span className="error">{errors.price}</span>}
            </div>
            <div>
              <label htmlFor="category">Category</label>
              <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="spiritual">SPIRITUAL</option>
                <option value="academic">ACADEMIC</option>
                <option value="business">BUSINESS</option>
              </select>
            </div>
            <div>
              <textarea
                placeholder="Description"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                required
                rows={5}
                cols={50}
              ></textarea>
              {errors.description && <span className="error">{errors.description}</span>}
            </div>
            <div>
              <label htmlFor="type">Type</label>
              <select name="type" value={formValues.type} onChange={handleInputChange}>
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
