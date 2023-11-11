import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import MMKV from "react-native-mmkv-storage";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://easy-pink-bandicoot-gear.cyclic.app/api/v1",
    credentials: "include",
    // prepareHeaders: async (headers) => {
    //   try {
    //     const token = await MMKV.getStringAsync("token");

    //     if (token) {
    //       headers.set("Authorization", `Bearer ${token}`);
    //     }

    //     return headers;
    //   } catch (error) {
    //     console.error("Error retrieving token from MMKV:", error);
    //     return headers;
    //   }
    // },
  }),
  tagTypes: ["users", "products"],
  endpoints: (builder) => ({}),
});
