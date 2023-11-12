import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    const user = {
      email,
      password,
    };
    if (email === "" || password === "") {
      setError("Please fill your credentials");
    } else {
      console.log("success");
    }
  };
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
    marginBottom: 20,
    alignSelf: "center",
  },
});
