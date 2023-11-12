import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSlice } from "../api/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => ({
        url: `/users/login`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // onSuccess side-effect
          const token = data.token;
          await AsyncStorage.setItem("token", token);
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // onsuccess side-effect
          const token = data.token;
          await AsyncStorage.setItem("token", token);
          console.log("token", data);
        } catch (err) {
          console.log("error", err);
        }
      },
    }),
  }),
  overrideExisting: true,
});

export const { useSignInMutation, useSignUpMutation } = authApi;
