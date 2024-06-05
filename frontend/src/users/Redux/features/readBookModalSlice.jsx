import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayReadBookModal:false,
  selectedBook: null,
};

const readBookModalSlice = createSlice({
  name: 'readModal',
  initialState,
  reducers: {
    openReadBookModal(state, action) {
      state.displayReadBookModal = true;
      state.selectedBook = action.payload;
    },
    closeReadBookModal(state) {
      state.displayReadBookModal = false;
      state.selectedBook = null;
    }
  }
});

export const { openReadBookModal, closeReadBookModal } = readBookModalSlice.actions;

export default readBookModalSlice;
