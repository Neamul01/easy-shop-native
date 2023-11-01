import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsContainer from "../Screens/Products/ProductsContainer";
import SingleProduct from "../Screens/Products/SingleProduct";

const Stack = createStackNavigator();
const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ProductsContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SingleProduct"
        component={SingleProduct}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
