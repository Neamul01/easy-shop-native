import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://easy-pink-bandicoot-gear.cyclic.app/api/v1",
    credentials: "include",
    prepareHeaders: async (headers) => {
      try {
        const token = await AsyncStorage.getItem("token");
        console.log("inside api call", token);

        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }

        return headers;
      } catch (error) {
        console.error("Error retrieving token from async storage:", error);
        return headers;
      }
    },
  }),
  tagTypes: ["users", "products"],
  endpoints: (builder) => ({}),
});
