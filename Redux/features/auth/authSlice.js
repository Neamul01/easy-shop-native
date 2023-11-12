import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    user: null,
  },
  reducers: {
    logOut: async () => {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;
      console.log("inside set user", state.user);
    },
    getUser: async (state) => {
      return state.user;
    },
  },
});

export const selectUser = (state) => state.authSlice.user;
export const { logOut, getUser, setUser } = authSlice.actions;
export default authSlice.reducer;
