import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk action creator for fetching all blogs
export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async () => {
    const response = await axios.get('http://localhost:5000/api/blog/get');
    const data = response.data.data;
    return data;
  }
);

// Async thunk action creator for fetching a single blog post by its ID
export const fetchBlogById = createAsyncThunk(
  'blogs/fetchBlogById',
  async (blogId) => {
    const response = await axios.get(`http://localhost:5000/api/blog/get/${blogId}`);
    const data = response.data.data;
    return data;
  }
);

// Initial state
const initialState = {
  blogs: [],
  singleBlog: null, // Add field to store single blog post
  status: 'idle',
  error: null
};

// Create slice
const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Case for fetching all blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Case for fetching a single blog post
      .addCase(fetchBlogById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singleBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

// Export actions
export const blogsActions = { ...blogsSlice.actions, fetchBlogs, fetchBlogById };

// Export reducer
export default blogsSlice;
