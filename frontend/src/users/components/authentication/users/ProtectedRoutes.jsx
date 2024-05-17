import React from "react";

import { Navigate } from "react-router-dom";


import { login } from "../../../Redux/features/authSlice"; 


const ProtectedRoutes = ({ children }) => {

  

  const isAuthenticated = !!localStorage.getItem("userEmail");
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
