import { configureStore } from "@reduxjs/toolkit";

import alertSlice from "./features/alertSlice";

import authSlice from "./features/authSlice";

import userSlice from "./features/userSlice";

import cartSlice from "./features/cartSlice";

import booksSlice from "./features/booksSlice";

import BookDescriptionSlice from "./features/BookDescriptionSlice";

import blogsSlice from "./features/blogsSlice";

import AccountTerminationSlice from "./features/AccountTerminationSlice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
    cart:cartSlice.reducer,
    books:booksSlice.reducer,
    bookModal:BookDescriptionSlice.reducer,
    blogs:blogsSlice.reducer,
    accountTermination:AccountTerminationSlice.reducer
  }
});
