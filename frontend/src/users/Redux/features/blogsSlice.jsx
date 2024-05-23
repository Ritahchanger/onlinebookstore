import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

export const fetchBlogs = createAsyncThunk(
    'blogs/fetchBlogs',
    async ()=>{
        const response = await fetch('http://localhost:5000/api/blog/get');
        const data = await response.json();
        return data;
    }
)
const initialState={
    blogs:[],
    status:'idle',
    error:null
}
const blogsSlice = createSlice({

    name:'blogs',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBlogs.pending,(state)=>{
            state.status = 'loading';
        })
        .addCase(fetchBlogs.fulfilled,(state,action)=>{
            state.status ='succeeded';
            state.blogs = action.payload;
        })
        .addCase(fetchBlogs.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }

})


export const booksActions = { ...blogsSlice.actions,fetchBlogs};

export default blogsSlice;