import React, { useState } from 'react';
import CollegeCard from '../college/CollegeCard';
import { useGetAllCollegesQuery } from '../../redux/feature/college/collegeApi';
import { Link } from 'react-router-dom';


const CollegeSection = () => {
      const { data, isLoading } = useGetAllCollegesQuery({});
  const [visibleCount, setVisibleCount] = useState(3);
  
  const handleShowMore = () => {
    setVisibleCount(prevCount => prevCount + 3);
  };
  
  const colleges = data?.data;
  const displayedColleges = colleges ? colleges.slice(0, visibleCount) : [];

  if(isLoading)return <div className='text-center my-5'>Loading...</div>
  
  return (
    <div className="py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            Featured Colleges
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover top institutions that match your academic goals and aspirations
          </p>
        </div>
        
        {/* College Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayedColleges?.map((college) => (
            <div key={college?._id} className="transform transition-all duration-300 hover:-translate-y-2">
              <CollegeCard college={college} />
            </div>
          ))}
        </div>
        
        {/* Show More/Less Button */}
        <div className="mt-16 text-center">
         <Link to="/colleges">
            <button
              onClick={handleShowMore}
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105"
            >
              Show More Colleges
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button></Link>
          
        </div>
      </div>
    </div>
  );
};

export default CollegeSection;