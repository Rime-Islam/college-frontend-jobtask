import React from "react";
import { Navigate } from "react-router-dom";
import { useCurrentRole } from "../redux/feature/auth/authSlice";
import { useAppSelector } from "../redux/hook";

const IsAdmin = ({ children }) => {
  const role = useAppSelector(useCurrentRole);

  if (!role || role !== "admin") {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default IsAdmin;
