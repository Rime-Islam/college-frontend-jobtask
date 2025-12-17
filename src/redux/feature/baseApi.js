import axios from "axios";
import { createApi } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { tagTypesList } from "../tag-type.js";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

const axiosBaseQuery = async (args, api) => {
  try {
    const token = api.getState().auth.token;

    if (typeof args === "string") {
      args = { url: args };
    }

    const config = {
      ...args,
      headers: {
        "Content-Type": "application/json",
        ...(args.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    if (args.body) {
      config.data = args.body;
    }

    const result = await axiosInstance.request(config);
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError;
    const status = err.response?.status || 500;
    const data = err.response?.data || err.message;

    if (status === 401) {
      toast.error("Your session has expired. Please log in again.");
    } else if (status === 404) {
      toast.error("Response not found");
    } else {
      toast.error(
        typeof data === "object" && data && "message" in data
          ? data.message
          : "An unexpected error occurred."
      );
    }

    return { error: { status, data } };
  }
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery,
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});