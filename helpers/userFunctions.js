import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
// import { setUser } from "../Redux/features/auth/authSlice";

export const getUser = async () => {
  const jsonUser = await AsyncStorage.getItem("user");
  const user = jsonUser != null ? JSON.parse(jsonUser) : null;
  return user;
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const logOut = async () => {
  await AsyncStorage.removeItem("user");
  await AsyncStorage.removeItem("token");
  // dispatch(setUser(null));

  return true;
};
