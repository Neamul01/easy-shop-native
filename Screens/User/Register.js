import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { useSignUpMutation } from "../../Redux/features/auth/authApi";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [
    signUp,
    { isLoading, isError, isSuccess, error: registerError, data },
  ] = useSignUpMutation();
  const navigation = useNavigation();

  const handleSubmit = () => {
    const user = {
      email,
      name,
      phone,
      passwordHash: password,
      country: "Bangladesh",
    };
    if (email === "" || password === "" || name === "" || phone === "") {
      setError("Please fill your credentials");
    } else {
      setError("");
      signUp(user);
    }
  };

  useEffect(() => {
    if (registerError || isError) {
      console.log(registerError);
    }
    if (isSuccess) {
      // console.log("register success", data);
      navigation.navigate("Login");
    }
  }, [isError, registerError, isSuccess, data]);

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar
      extraHeight={100}
      enableOnAndroid
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder="Enter your email"
          name="email"
          id="email"
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder="Your name"
          name="name"
          id="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Enter phone number"
          name="phone"
          id="phone"
          value={phone}
          keyboardType="numeric"
          onChangeText={(text) => setPhone(text)}
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
          <Button title="Register" onPress={handleSubmit} />
        </View>
        <View style={[styles.buttonGroup, { marginTop: 40 }]}>
          <Text style={styles.middleText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ color: "blue", textDecorationLine: "underline" }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
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
