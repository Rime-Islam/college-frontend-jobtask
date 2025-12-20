import React from 'react';
import { Star, Calendar, User } from "lucide-react";

const StarRating = ({ rating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export const ReviewCard = ({ review }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4 transition-all hover:shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
            <User className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {review.userId?.name || "Anonymous User"}
            </h3>
            <div className="flex items-center mt-1">
              <StarRating rating={review.rating} />
              <span className="ml-2 text-sm text-gray-600">
                {review.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          {formatDate(review.createdAt)}
        </div>
      </div>
      
      {review.comment && (
        <div className="mt-3">
          <p className="text-gray-700 leading-relaxed">{review.comment}</p>
        </div>
      )}
      
      {review.updatedAt && review.updatedAt !== review.createdAt && (
        <div className="mt-3 text-xs text-gray-400">
          Edited on {formatDate(review.updatedAt)}
        </div>
      )}
    </div>
  );
};
