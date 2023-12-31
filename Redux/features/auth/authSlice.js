import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
    isAdmin: false,
  },
  reducers: {
    logOut: async () => {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAdmin = action.payload.isAdmin;
    },
    resetUser: (state, action) => {
      state.user = null;
    },
    getUserFromStorage: async (state) => {
      try {
        const jsonUser = await AsyncStorage.getItem("user");
        const user = jsonUser != null ? JSON.parse(jsonUser) : null;
        state.user = user;
        state.isAdmin = user.isAdmin;
        // console.log(user);
        return user;
      } catch (error) {
        console.error("Error while getting user from AsyncStorage:", error);
        return null;
      }
    },
    userIsAdmin: (state) => {
      return state.isAdmin;
    },
    isAuthenticated: async (state) => {
      const token = await AsyncStorage.getItem("token");
      return token ? true : false;
    },
  },
});

export const selectUser = (state) => state.auth.user;
export const selectIsAdmin = (state) => state.auth.isAdmin;

export const {
  logOut,
  setUser,
  resetUser,
  getUserFromStorage,
  userIsAdmin,
  isAuthenticated,
} = authSlice.actions;
export default authSlice.reducer;
