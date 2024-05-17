import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayBookModal: false,
  selectedBook: null,
};

const BookDescriptionSlice = createSlice({
  name: 'bookModal',
  initialState,
  reducers: {
    openBookModal(state, action) {
      state.displayBookModal = true;
      state.selectedBook = action.payload;
    },
    closeBookModal(state) {
      state.displayBookModal = false;
      state.selectedBook = null;
    }
  }
});

export const { openBookModal, closeBookModal } = BookDescriptionSlice.actions;

export default BookDescriptionSlice;
