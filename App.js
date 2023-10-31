import { StyleSheet, Text, View } from "react-native";
import ProductsContainer from "./Screens/Products/ProductsContainer";
import Header from "./Shared/Header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ProductsContainer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    // flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
