import { AsyncStorage } from "react-native";
import { apiSlice } from "../api/apiSlice";
import MMKV from "react-native-mmkv-storage";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: `/users/login`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch }) {
        try {
          const { data } = await queryFulfilled;
          // onSuccess side-effect
          const token = data.token;

          MMKV.set("token", token);

          //   dispatch(setToken())
        } catch (err) {
          // `onError` side-effect
          console.log("error", err);
        }
      },
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: `/users/register`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch }) {
        try {
          const { data } = await queryFulfilled;
          // onsuccess side-effect
          const token = data.token;
          MMKV.set("token", token);
        } catch (err) {
          console.log("error", err);
        }
      },
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
