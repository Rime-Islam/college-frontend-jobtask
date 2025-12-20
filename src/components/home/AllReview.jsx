import React from 'react';
import { Star, Search } from "lucide-react";
import { useState } from "react";
import { useGetAllReviewQuery } from '../../redux/feature/review/reviewApi';
import { ReviewCard } from '../review/ReviewCard';




const ReviewFilter = ({ onSearchChange, onRatingFilterChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRating, setSelectedRating] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearchChange(term);
  };

  const handleRatingChange = (e) => {
    const rating = e.target.value;
    setSelectedRating(rating);
    onRatingFilterChange(rating);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Reviews</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by user or college..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Rating</label>
          <select
            className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={selectedRating}
            onChange={handleRatingChange}
          >
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export const AllReview = () => {
  const { data, isLoading, isError } = useGetAllReviewQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  
  const reviews = data?.data || [];

  // Filter reviews based on search term and rating
  const filteredReviews = reviews?.filter((review) => {
    const matchesSearch = searchTerm === "" || 
      (review?.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review?.collegeId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (review?.comment?.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesRating = ratingFilter === "" || review?.rating === parseInt(ratingFilter);
    
    return matchesSearch && matchesRating;
  });

  // Calculate average rating
  const averageRating = reviews?.length > 0
    ? reviews?.reduce((acc, review) => acc + review?.rating, 0) / reviews?.length
    : 0;

  // Group reviews by rating for statistics
  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews?.filter(r => r.rating === rating).length,
    percentage: reviews?.length > 0 
      ? (reviews?.filter(r => r.rating === rating).length / reviews?.length) * 100 
      : 0
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">All Reviews</h1>
            <p className="text-lg text-gray-600">Browse and search through all student reviews</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              <span className="ml-3 text-gray-600">Loading reviews?...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">All Reviews</h1>
            <p className="text-lg text-gray-600">Browse and search through all student reviews</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="text-center py-12">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">Error Loading Reviews</h3>
              <p className="text-gray-500">We couldn't retrieve the reviews at this time.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Reviews</h1>
          <p className="text-lg text-gray-600">Browse and search through all student reviews</p>
        </div>

        {/* Statistics Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{reviews?.length}</div>
              <div className="text-gray-600">Total Reviews</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-6 w-6 ${
                        i < Math.floor(averageRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-3xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">
                {ratingCounts?.reduce((acc, curr) => acc + curr.count, 0)}
              </div>
              <div className="text-gray-600">Active Reviews</div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Rating Distribution</h3>
            <div className="space-y-3">
              {ratingCounts?.map(({ rating, count, percentage }) => (
                <div key={rating} className="flex items-center">
                  <div className="w-12 text-sm text-gray-600">{rating} star</div>
                  <div className="flex-1 mx-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm text-gray-600 text-right">{count}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <ReviewFilter 
          onSearchChange={setSearchTerm}
          onRatingFilterChange={setRatingFilter}
        />

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {filteredReviews?.length} {filteredReviews?.length === 1 ? "Review" : "Reviews"}
              {(searchTerm || ratingFilter) && (
                <span className="text-sm font-normal text-gray-500 ml-2">
                  (filtered from {reviews?.length} total)
                </span>
              )}
            </h2>
          </div>
          
          {filteredReviews?.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No Reviews Found</h3>
              <p className="text-gray-500">
                {searchTerm || ratingFilter 
                  ? "Try adjusting your search or filter criteria." 
                  : "There are no reviews available at this time."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews?.map((review) => (
                <ReviewCard key={review?._id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllReview;