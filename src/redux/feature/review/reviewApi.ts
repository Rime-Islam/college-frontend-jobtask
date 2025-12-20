import { tagTypes } from "../../tag-type";
import { baseApi } from "../baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new review
    createReview: builder.mutation({
      query: (data) => ({
        url: "/review",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.review, tagTypes.college],
    }),

    // Get all reviews
    getAllReview: builder.query({
      query: () => ({
        url: "/review",
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),

    // Get reviews by college ID
    getReviewsByCollege: builder.query({
      query: (collegeId) => ({
        url: `/review/college/${collegeId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),

    // Get all my reviews
    getMyReviews: builder.query({
      query: () => ({
        url: "/review/my-reviews",
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),

    // Update a review
    updateReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.review, tagTypes.college],
    }),

    // Delete a review
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/review/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.review, tagTypes.college],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetAllReviewQuery,
  useGetReviewsByCollegeQuery,
  useGetMyReviewsQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;