import React, { useState, useEffect } from 'react';
import './EditModal.css';
import Config from '../../Config';
import axios from 'axios';

const EditBlogModal = ({ selectedBlog, handleDisplayModal, fetchData }) => {
  const [title, setTitle] = useState(selectedBlog.title);
  const [content, setContent] = useState(selectedBlog.content);
  const [blogImage, setBlogImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setTitle(selectedBlog.title);
    setContent(selectedBlog.content);
  }, [selectedBlog]);

  const editBlog = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (blogImage) {
        formData.append('file', blogImage);
      }

      // Log the form data to ensure it is being created correctly
      for (let pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
      }

      const response = await axios.patch(`${Config.apiUrl}/api/blog/update/${selectedBlog._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);

      if (response.data.success) {
        fetchData(); // Refresh the data after successful update
        setSuccessMessage('Blog updated successfully!');
        setTimeout(() => {
          handleDisplayModal(); // Close the modal after showing the success message
        }, 2000); // Close modal after 2 seconds
      } else {
        console.log(`Update failed: ${response.data.message}`);
      }
    } catch (error) {
      console.log(`There was an error sending the data to the backend: ${error.message}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editBlog();
  };

  return (
    <div className="modal-dialog edit">
      <p className="small-header">{`EDIT ${selectedBlog.title}`}</p>
      <form onSubmit={handleSubmit}>
        <div className="input_group">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Enter blog title...."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="input-group">
          <textarea
            name="content"
            cols="30"
            rows="10"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div className="img_wrapper">
          <img
            src={`${Config.apiUrl}/upload/blogs/${selectedBlog.filePath}`}
            alt={`${selectedBlog.title}`}
          />
        </div>
        <div className="input-group">
          <input
            type="file"
            name="blogImage"
            onChange={(e) => setBlogImage(e.target.files[0])}
          />
        </div>
        <div className="input-group">
          <input type="submit" value="SUBMIT" className="submit-btn" />
        </div>
      </form>
      {successMessage && (
        <div className="success-message">
          <p>{successMessage}</p>
        </div>
      )}
      <button
        className="cart-buttons cancel"
        onClick={handleDisplayModal}
      >
        CANCEL
      </button>
    </div>
  );
};

export default EditBlogModal;
