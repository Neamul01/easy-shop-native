import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUser = async () => {
  return await AsyncStorage.getItem("user");
};

export const getToken = async () => {
  return await AsyncStorage.getItem("token");
};

export const logOut = async () => {
  await AsyncStorage.removeItem("user");
  await AsyncStorage.removeItem("token");
  return true;
};
