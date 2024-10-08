import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
import Config from "../../Config";
import "./Admin.css";
import "./blogs.css";
import DeleteBlogModal from "../components/deleteBlogModal";
import EditBlogModal from "../components/EditBlogModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BlogsAdministration = () => {
  const [sidebar, showSidebar] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [errors, setErrors] = useState({});
  const [displayModal, setDisplayModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [workingBlog, setWorkingBlog] = useState(null);

  const handleSidebar = () => {
    showSidebar(!sidebar);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Config.apiUrl}/api/blog/get`);
      setBlogs(response.data.data);
    } catch (error) {
      console.log(
        `There was an error fetching the data from the backend => ${error.message}`
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validateForm = () => {
    const errors = {};
    if (!title) errors.title = "Title is required";
    if (!description) errors.description = "Description is required";
    if (!image) errors.image = "Image is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", description);
    formData.append("file", image);

    try {
      const response = await axios.post(
        `${Config.apiUrl}/api/blog/post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchData();
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview(null); 
      setErrors({});

      if (!response.data.success) {
        toast.error("There was an error sending data to backend");
      }
      alert("BLOG ADDED SUCCESSFULLY");

      document.getElementById("image-input").value = null;
    } catch (error) {
    toast.error(`There was an error creating the blog => ${error.message}`);
    }
  };

  const handleBlogDelete = (blog) => {
    setWorkingBlog(blog);
    setDisplayModal(true);
  };

  const handleDisplayModal = () => {
    setDisplayModal(!displayModal);
  };

  const handleEditModal = () => {
    setEditModal(!editModal);
  };

  const editBlogModalHandler = (blog) => {
    setWorkingBlog(blog);
    setEditModal(true);
  };

  // Function to handle image selection and preview
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      const previewUrl = URL.createObjectURL(selectedImage);
      setImagePreview(previewUrl);
    }
  };

  return (
    <div className="admin blog">
      <AdminNavbar handleSidebar={handleSidebar} sidebar={sidebar} />
      <AdminSidebar sidebar={sidebar} />
      <div className="container">
        <div className="row">
          <form onSubmit={handleSubmit}>
            <p className="medium-header">ADD BLOGS</p>

            <div className="input-group">
              <input
                type="text"
                name="title"
                placeholder="Blog title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <span className="error">{errors.title}</span>}
            </div>
            <div className="input-group">
              <textarea
                name="description"
                cols="30"
                rows="20"
                placeholder="Blog description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </div>
            <div className="input-group">
              <input
                id="image-input" // Add an id to target this input element
                type="file"
                name="image"
                onChange={handleImageChange} // Update image input handler
              />
              {errors.image && <span className="error">{errors.image}</span>}
            </div>
            {imagePreview && ( // Conditionally render image preview
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
            <div className="input_type" style={{marginBottom:"2rem"}}>
              <input type="submit" value="SUBMIT" className="submit-btn" />
            </div>
          </form>
          <div className="books_list">
            <p className="medium-header">BLOGS</p>
            <div className="table_wrapper">
              <table>
                <thead>
                  <tr>
                    <td>TITLE</td>
                    <td>CREATED ON</td>
                    <td>DELETE</td>
                    <td>EDIT</td>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr key={blog._id}>
                      <td>{blog.title.toUpperCase()}</td>
                      <td>{new Date(blog.createdOn).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="cart-buttons"
                          onClick={() => {
                            handleBlogDelete(blog);
                          }}
                        >
                          DELETE
                        </button>
                      </td>
                      <td>
                        <button
                          className="cart-buttons"
                          onClick={() => {
                            editBlogModalHandler(blog);
                          }}
                        >
                          EDIT
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {displayModal && (
        <div className="custom-modal delete">
          <DeleteBlogModal
            handleDisplayModal={handleDisplayModal}
            workingBlog={workingBlog}
            fetchData={fetchData}
          />
        </div>
      )}
      {editModal && (
        <div className="custom-modal edit">
          <EditBlogModal
            workingBlog={workingBlog}
            handleEditModal={handleEditModal}
            fetchData={fetchData}
          />
        </div>
      )}
    </div>
  );
};

export default BlogsAdministration;
