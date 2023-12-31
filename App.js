import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import Header from "./Shared/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./Navigators/Main";
import { Provider } from "react-redux";
import { store } from "./Redux/app/store";
import Toast from "react-native-toast-message";
import "core-js/stable/atob";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <Header />
          <Main />
          <Toast topOffset={60} />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#dee3e0",
  },
});
