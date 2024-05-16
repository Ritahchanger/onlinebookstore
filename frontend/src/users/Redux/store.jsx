import { configureStore } from "@reduxjs/toolkit";

import alertSlice from "./features/alertSlice";

import authSlice from "./features/authSlice";

import userSlice from "./features/userSlice";

import cartSlice from "./features/cartSlice";


import booksSlice from "./features/booksSlice";


export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    cart:cartSlice.reducer,
    books:booksSlice.reducer,
  },
});
