import { tagTypes } from "../../tag-type";
import { baseApi } from "../baseApi";

const collegeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCollege: builder.mutation({
      query: (collegeData) => ({
        url: "/college",
        method: "POST",
        body: collegeData,
      }),
      invalidatesTags: [tagTypes.college],
    }),

    getAllColleges: builder.query({
      query: (params) => ({
        url: "/college",
        params: {
          limit: params?.limit,
          page: params?.page,
          ...(params.searchTerm && { searchTerm: params.searchTerm }),
        },
      }),
      providesTags: [tagTypes.college],
    }),
  }),
});

export const {
    useCreateCollegeMutation,
    useGetAllCollegesQuery,
} = collegeApi;
