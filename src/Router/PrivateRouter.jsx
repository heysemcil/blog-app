import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRouter = () => {
  let currentUser = localStorage.getItem("user") || false;

  
  if (!currentUser) {
    toast.warning("You need to login first!");
    return <Navigate to="/auth/login" replace />;
  } else {
    return <Outlet />;
  }
};

export default PrivateRouter;
