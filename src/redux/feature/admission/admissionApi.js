import { tagTypes } from "../../tag-type";
import { baseApi } from "../baseApi";

const admissionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmission: builder.mutation({
      query: (data) => ({
        url: "/admission",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.admission],
    }),

    getAllAdmission: builder.query({
      query: (params) => ({
        url: "/admission",
        params: {
          limit: params?.limit,
          page: params?.page,
          ...(params.searchTerm && { searchTerm: params.searchTerm }),
        },
      }),
      providesTags: [tagTypes.admission],
    }),

    getAdmissionById: builder.query({
      query: (id) => ({
        url: `/admission/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.admission],
    }),

    getMyAdmission: builder.query({
      query: () => ({
        url: `/admission/my`,
        method: "GET",
      }),
      providesTags: [tagTypes.admission],
    }),
  }),
});

export const { 
useCreateAdmissionMutation,
useGetAdmissionByIdQuery,
useGetAllAdmissionQuery,
useGetMyAdmissionQuery,
 } = admissionApi;
