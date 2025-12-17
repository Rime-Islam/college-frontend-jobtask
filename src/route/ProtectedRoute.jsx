import React from "react";
import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../redux/feature/auth/authSlice";
import { useAppSelector } from "../redux/hook";


const ProtectedRoute = ({ children }) => {
   const token = useAppSelector(useCurrentToken);

   if (!token) {
    return <Navigate to="/login" replace={true} ></Navigate>
   }
    return children;
};

export default ProtectedRoute;