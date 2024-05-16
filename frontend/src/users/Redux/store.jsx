import { configureStore } from "@reduxjs/toolkit";

import alertSlice from "./features/alertSlice";

import authSlice from "./features/authSlice";

import userSlice from "./features/userSlice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
});
