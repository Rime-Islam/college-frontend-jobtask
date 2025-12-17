import React from "react";
import { Outlet,useLocation } from "react-router-dom";
import Navbar from "../components/navber/Navbar";
import { Footer } from "../components/footer/Footer";

export default function MainLayout() {
  const location = useLocation();
  const noHeaderFooter =
    location.pathname.includes("login") ||
    location.pathname.includes("register");
  return (
        <div className="lg:container mx-auto bg-white ">
            <div className="flex flex-col min-h-screen">
         <div className="grow">
         { noHeaderFooter || <Navbar></Navbar>}
           <div className="container mx-auto">
             <Outlet></Outlet>
             </div>
         </div>
            <div className="shrink-0">
            { noHeaderFooter || <Footer></Footer>}
            </div>
        </div>
        </div>
  );
}
