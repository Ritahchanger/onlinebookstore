const Blog = require('../models/Blog.model')

const path = require('path')

const uploadDirectory = path.join(__dirname, '../upload/blogs/')

const fs = require("fs");
const { findById } = require('../models/Counter.model');

function formatCurrentDate () {
  const now = new Date()

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }

  return now.toLocaleDateString('en-US', options)
}

const postBlogs = async (req, res) => {
  try {
    const { title, content } = req.body

    const filePath = req.file.filename

    const formattedDate = formatCurrentDate()

    const newBlog = await Blog.create({
      title: title,
      content: content,
      filePath: filePath,
      createdOn: formattedDate
    })

    return res.status(200).json({ status: 200, success: true, data: newBlog })
  } catch (error) {
    return res.status(500).json({ success: false, error: `${error.message}` })
  }
}

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdOn: 1 }) // Sort by createdAt field in descending order

    if (blogs.length === 0) {
      return res.status(404).json({
        status: 404,
        success: false,
        message: 'There are no blogs in the system'
      })
    }

    return res.status(200).json({ status: 200, success: true, data: blogs })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}


const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog entry by ID
    const blogToDelete = await Blog.findById(id);

    // Check if the blog entry exists
    if (!blogToDelete) {
      return res.status(404).json({ success: false, message: 'No such blog with the provided Id' });
    }

    // Check if there's a file associated with the blog entry
    if (blogToDelete.filePath) {
      // Delete the file from the file system
      const filePath = path.join(uploadDirectory, blogToDelete.filePath);
      await fs.promises.unlink(filePath); // Using async-await for fs.promises.unlink
    }

    // Delete the blog entry from the database
    await Blog.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error); // Log the error for debugging purposes
    return res.status(500).json({ success: false, error: error.message });
  }
};





const updateBlog = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the blog post to check if it exists and to get the old image path
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }

    // Log the fetched blog to verify it exists
    console.log('Fetched Blog:', blog);

    // Check if a new file is uploaded
    const newFilePath = req.file?.filename;
    if (newFilePath) {
      // Delete the old image if it exists
      const oldFilePath = blog.filePath;
      if (oldFilePath) {
        try {
          await fs.promises.unlink(path.join(uploadDirectory, oldFilePath));
          console.log('Deleted old blog image:', oldFilePath);
        } catch (err) {
          console.error('Error deleting old blog image:', err);
          // Handle error deleting file (optional based on your requirements)
        }
      }

      // Update the blog post with the new file path
      blog.filePath = newFilePath;
      console.log('Updated blog file path:', newFilePath);
    }

    // Update the blog fields if provided in the request body
    if (req.body.title) {
      blog.title = req.body.title;
      console.log('Updated blog title:', req.body.title);
    }
    if (req.body.content) {
      blog.content = req.body.content;
      console.log('Updated blog content:', req.body.content);
    }

    // Save the updated blog post
    const updatedBlog = await blog.save();
    console.log('Updated Blog:', updatedBlog);

    return res.status(200).json({ success: true, data: updatedBlog });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};


// const updateBlog = async (req,res) =>{
//   const { id } = req.params;
//   try{

//     const blog = await Blog.findById(id)

//     console.log(blog)

//   }catch(error){
//     return res.status(500).json({ success: false, error: error.message })
//   }
  
// }

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params

    const singleBlog = await Blog.findById(id)

    if (!singleBlog) {
      return res
        .status(200)
        .json({ status: 404, success: false, error: 'Blog post not found' })
    }

    return res.status(200).json({ success: true, data: singleBlog })
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message })
  }
}

module.exports = { updateBlog }

module.exports = { getBlogs, postBlogs, deleteBlog, updateBlog, getBlogById }
