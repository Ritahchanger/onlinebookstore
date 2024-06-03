import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    getUserSuccess(state, action) {
      state.userData = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getUserFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserData(state, action) {
      state.userData = action.payload;
    },
  },
});


export const { getUserStart, getUserSuccess, getUserFailure, updateUserData } = userSlice.actions;
export default userSlice;
