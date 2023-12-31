import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiSlice } from "../api/apiSlice";
import base64 from "react-native-base64";
import { setUser } from "./authSlice";
import { jwtDecode } from "jwt-decode";

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
          //----- onSuccess side-effect
          const token = data.token;

          const decodedToken = jwtDecode(token);
          const userData = {
            email: data.user,
            userId: decodedToken.userId,
            isAdmin: decodedToken.isAdmin,
          };

          const jsonUserData = JSON.stringify(userData);
          await AsyncStorage.setItem("user", jsonUserData);
          await AsyncStorage.setItem("token", token);
          dispatch(setUser(userData));
        } catch (err) {
          //--------- `onError` side-effect
          console.log("error token extract", err);
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
