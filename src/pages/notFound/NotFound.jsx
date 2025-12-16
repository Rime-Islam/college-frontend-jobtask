import React from 'react';
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col justify-center items-center p-6 text-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 md:p-12 transform transition-all duration-300 hover:shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-red-500 to-red-400 rounded-t-2xl"></div>
        
        <div className="relative mb-8">
          <div className="text-9xl md:text-[10rem] font-bold text-gray-100 select-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl md:text-8xl font-bold text-red-500 animate-pulse">404</div>
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-10 max-w-md mx-auto">
          We're sorry, the page you requested could not be found. 
          Please go back to the homepage or try using the navigation.
        </p>
        

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Go Back
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition duration-300 shadow-md hover:shadow-lg"
          >
            Home page
          </button>
        </div>
        

        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            If you believe this is an error, please contact our support team at{' '}
            <a href="mailto:support@example.com" className="text-green-600 hover:text-green-800 font-medium">
              support@example.com
            </a>
          </p>
        </div>
      </div>
      
 
      <p className="mt-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} Your Company Name. All rights reserved.
      </p>
    </div>
  );
};

export default NotFound;