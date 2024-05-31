import React from "react";

import { Navigate } from "react-router-dom";

import { login } from "../../../Redux/features/authSlice";

import { useDispatch, useSelector } from "react-redux";

const ProtectedRoutes = ({ children }) => {
  const dispatch = useDispatch();

  const isUserLogged = useSelector((state) => state.auth.isLoggedIn);

  if (isUserLogged) {

    return children;

  } else {

    return <Navigate to="/login" />;

  }
};

export default ProtectedRoutes;
