import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = "https://rnj64vmh-9050.inc1.devtunnels.ms/api/v1";

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: async (headers: any) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert({
        title: "Error",
        message: "No token found",
      });
      if (window !== undefined) {
        window.location.href = "/login";
      }
      return headers;
    }

    headers.set("Authorization", `${token}`);
    return headers;
  },
});

const baseQueryWithServerCheck: any = async (args: any, api: any, extraOptions: any) => {
  try {
    // health check request
    const response = await fetch(baseUrl.replace("/api/v1", ""));

    if (!response.ok) {
      if (window !== undefined) {
        window.location.href = "/server-down";
      }
      return { error: { status: "SERVER_DOWN" } };
    }

  } catch (error) {
    if (window !== undefined) {
      window.location.href = "/server-down";
    }
    return { error: { status: "SERVER_DOWN" } };
  }

  return rawBaseQuery(args, api, extraOptions);
};

const baseApis = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithServerCheck,
  tagTypes: [
    "auth",
  ],
  endpoints: () => ({}),
});

export default baseApis;