import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  isLoggedIn: sessionStorage.getItem('user') ? true : false,
  user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
};

// Create the slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      const { payload } = action;
      state.isLoggedIn = true;
      state.user = payload;
      sessionStorage.setItem('user', JSON.stringify(payload));
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      sessionStorage.removeItem('user');
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice;
