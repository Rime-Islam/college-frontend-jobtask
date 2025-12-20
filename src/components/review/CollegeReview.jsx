import React from "react";
import { useGetReviewsByCollegeQuery } from "../../redux/feature/review/reviewApi";
import { ReviewCard } from "./ReviewCard";


export const CollegeReview = ({ collegeId }) => {
  const { data, isLoading } = useGetReviewsByCollegeQuery(collegeId);

  if (isLoading) return <div>Loading reviews...</div>;

  return (
    <div>
      {data?.data?.map(review => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </div>
  );
};