import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink } from "react-router-dom";
import { FaUser, FaUniversity, FaSignOutAlt } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, useCurrentRole, useCurrentToken } from "../../redux/feature/auth/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentToken);
  const role = useAppSelector(useCurrentRole);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = async () => {
    dispatch(logout());
    setShowProfile(false);
  };

  return (
    <nav className="w-full bg-white shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <FaUniversity className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">EduPortal</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex space-x-6">
              {['/', '/colleges', '/admission', '/about', '/contact'].map((path, index) => (
                <li key={index}>
                  <NavLink
                    to={path}
                    className={({ isActive }) => 
                      `font-medium ${isActive ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-500'} transition-colors pb-1`
                    }
                  >
                    {path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* User Profile */}
          <div className="flex items-center">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <FaUser className="text-blue-600" />
                  </div>
                </button>
                
                {/* Profile Dropdown */}
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                   
                   {
                    role === 'admin' && (
                         <Link 
                      to="/admin/create-college" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setShowProfile(false)}
                    >
                      <FaUser className="mr-2" /> Create College
                    </Link>
                    )
                   }
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      onClick={() => setShowProfile(false)}
                    >
                      <FaUser className="mr-2" /> My Profile
                    </Link>
                    <button 
                      onClick={handleLogOut}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors">
                  Sign In
                </button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button 
              onClick={toggleMenu}
              className="md:hidden ml-4 p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <RxCross2 className="w-6 h-6" /> : <AiOutlineMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} pb-4`}>
          <div className="flex flex-col space-y-2 pt-2">
            <ul className="flex flex-col space-y-2">
              {['/', '/colleges', '/admission','/about'].map((path, index) => (
                <li key={index}>
                  <NavLink
                    to={path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => 
                      `block py-2 px-4 rounded-md font-medium ${isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'} transition-colors`
                    }
                  >
                    {path === '/' ? 'Home' : path.substring(1).charAt(0).toUpperCase() + path.substring(2)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;