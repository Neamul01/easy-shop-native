import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Error from "../../Shared/Error";
import { useSignInMutation } from "../../Redux/features/auth/authApi";
import { getToken, getUser } from "../../helpers/userFunctions";
import Toast from "react-native-toast-message";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const [logIn, { isError, isLoading, isSuccess, error: loginError, data }] =
    useSignInMutation();

  const handleLogin = () => {
    const user = {
      email,
      password,
    };
    if (email === "" || password === "") {
      setError("Please fill your credentials");
    } else {
      setError("");
      logIn(user);
    }
  };

  useEffect(() => {
    if (loginError || isError) {
      console.log(loginError);
    }
    if (isSuccess) {
      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Login Success",
      });
      navigation.navigate("Home");
    }
  }, [isError, loginError, isSuccess, data]);

  const fetchUserProfile = async () => {
    const user = await getToken();
    if (user) {
      navigation.navigate("UserProfile");
    } else {
      // console.log("inside console", user);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // console.log("focus effect");
      fetchUserProfile();
    })
  );

  return (
    <FormContainer title={"Login"}>
      <Input
        placeholder="Enter your email"
        name="email"
        id="email"
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder="Enter Password"
        name="password"
        id="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
      />
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}
        <Button title="Login" onPress={handleLogin} />
      </View>
      <View style={[styles.buttonGroup, { marginTop: 40 }]}>
        <Text style={styles.middleText}>Don't have an account yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "blue", textDecorationLine: "underline" }}>
            Register now
          </Text>
        </TouchableOpacity>
      </View>
    </FormContainer>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginBottom: 5,
    alignSelf: "center",
  },
});
