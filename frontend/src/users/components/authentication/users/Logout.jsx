import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../../Redux/features/authSlice";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/auth/logout"
        );

        navigate("/login");

        dispatch(logout());
      } catch (error) {
        console.log(`An error occurred: ${error.message}`);
      }
    };

    handleLogout(); // Call the logout function when the component mounts
  }, [dispatch, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
