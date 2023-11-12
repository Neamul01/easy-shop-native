import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getToken, getUser, logOut } from "../../helpers/userFunctions";
import { useNavigation } from "@react-navigation/native";
import { useSingleUserMutation } from "../../Redux/features/users/usersApi";
import { jwtDecode } from "jwt-decode";

export default function UserProfile() {
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState("");
  const navigation = useNavigation();
  const [singleUser, { isLoading, data, isSuccess, error }] =
    useSingleUserMutation();

  const fetchUserProfile = async () => {
    const user = await getToken();
    setUserProfile(user);
    setUserId(user.userId);
    if (!user) {
      navigation.navigate("Login");
    } else {
      const extractToken = jwtDecode(user);
      console.log("inside console", extractToken);
      // await singleUser(user.userId);
    }
  };

  const handleLogOut = async () => {
    await logOut();
    navigation.navigate("Login");
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("single user", data);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <View>
      <Text>UserProfile</Text>
      <Text>
        {userProfile ? userProfile.email : "No user profile available"}
      </Text>
      <Button title="Logout" onPress={handleLogOut} />
    </View>
  );
}

const styles = StyleSheet.create({});
