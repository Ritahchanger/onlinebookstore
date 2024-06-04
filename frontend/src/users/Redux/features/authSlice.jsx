import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    isLoggedIn: !!localStorage.getItem('user'),
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
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
            localStorage.setItem('user', JSON.stringify(payload));
        },
        logout(state) {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.clear('user');
        },
    },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice
