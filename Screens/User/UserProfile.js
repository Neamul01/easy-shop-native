import { Button, ScrollView, StyleSheet, Text, View } from "react-native";
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
      // console.log("user", user);
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
      // console.log("single user", userProfile);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.user}>{userProfile && userProfile.name}</Text>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.text}>
          Email: {userProfile && userProfile.email}{" "}
        </Text>
        <Text style={styles.text}>
          Phone: {userProfile && userProfile.phone}{" "}
        </Text>
      </View>
      <View style={styles.submitButton}>
        <Button title="Logout" onPress={handleLogOut} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    paddingHorizontal: 5,
    alignSelf: "center",
  },
  user: {
    fontSize: 30,
    alignSelf: "center",
  },
  text: {
    marginTop: 10,
  },
  submitButton: {
    marginTop: 40,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
