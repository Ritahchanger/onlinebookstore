import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    async ()=>{
        const response = await fetch('backend-endPoint');
        const data = await response.json();
        return data;
    }
)
const initialState={
    books:[],
    status:'idle',
    error:null
}
const booksSlice = createSlice({

    name:'books',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBooks.pending,(state)=>{
            state.status = 'loading';
        })
        .addCase(fetchBooks.fulfilled,(state,action)=>{
            state.status ='succeeded';
            state.books = action.payload;
        })
        .addCase(fetchBooks.rejected,(state,action)=>{
            state.status = 'failed';
            state.error = action.error.message;
        })
    }

})


export const booksActions = { ...booksSlice.actions,fetchBooks};

export default booksSlice;