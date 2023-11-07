import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const { width } = Dimensions.get("window");

export default function FormContainer({ title, children }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 400,
    width,
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    fontSize: 30,
  },
});
