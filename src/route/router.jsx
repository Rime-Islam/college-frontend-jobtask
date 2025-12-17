import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import NotFound from "../pages/notFound/NotFound";
import MainLayout from "../layouts/MainLayOut.jsx";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import ForgotPassword from "../pages/auth/ForgetPassword.jsx";
import ResetPassword from "../pages/auth/ResetPassword.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import IsAdmin from "./IsAdmin.jsx";
import CreateCollege from "../pages/college/CreateCollege.jsx";
import College from "../pages/college/College.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/auth/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/auth/reset-password/:id/:token",
        element: <ResetPassword />,
      },
      {
        path: "/colleges",
        element: <College />,
      },
      // {
      //   path: "/admin/profile",
      //   element: <ProtectedRoute> <ResetPassword /> </ProtectedRoute>,
      // },
      {
        path: "/admin/create-college",
        element: <IsAdmin> <CreateCollege /> </IsAdmin>,
      },
    ],
  },
]);

export default router;
