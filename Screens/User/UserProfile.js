import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getUser, logOut } from "../../helpers/userFunctions";
import { useNavigation } from "@react-navigation/native";
import { useSingleUserMutation } from "../../Redux/features/users/usersApi";

export default function UserProfile() {
  const [userId, setUserId] = useState("");
  const navigation = useNavigation();
  const [singleUser, { isLoading, data: userProfile, isSuccess, error }] =
    useSingleUserMutation();

  const fetchUserProfile = async () => {
    try {
      const user = await getUser();
      console.log("user", user);
      setUserId(user.userId);
      if (!user) {
        navigation.navigate("Login");
      } else {
        await singleUser(user.userId);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLogOut = async () => {
    await logOut();
    navigation.navigate("Login");
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("single user", userProfile);
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
