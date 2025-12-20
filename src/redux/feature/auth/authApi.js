import { tagTypes } from "../../tag-type";
import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // login user
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/register",
        method: "POST",
        body: userData,
      }),
    }),

    // logout
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    // forget pass request
    requestForgotPasswordOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/forget_password",
        method: "POST",
        body: data,
      }),
    }),

    // reset pass
    resetPasswordWithOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
      }),
    }),

    // refresh token
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    // google facebook login
    googleLogin: builder.mutation({
      query: (userData) => ({
        url: "/auth/google",
        method: "POST",
        body: userData,
        credentials: "include",
      }),
      invalidatesTags: [tagTypes.auth],
    }),

    // change password
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PUT",
        body: data,
      }),
    }),

    getMyProfile: builder.query({
      query: () => ({
        url: `/auth`,
        method: "GET",
      }),
      providesTags: [tagTypes.auth],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/auth/profile",
        method: "Patch",
        body: data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutUserMutation,
  useRequestForgotPasswordOtpMutation,
  useResetPasswordWithOtpMutation,
  useRefreshTokenMutation,
  useGoogleLoginMutation,
  useChangePasswordMutation,
  useGetMyProfileQuery,
  useUpdateProfileMutation,
} = authApi;
