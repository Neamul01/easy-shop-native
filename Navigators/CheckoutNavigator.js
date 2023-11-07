import { View, Text } from "react-native";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Checkout from "../Screens/Cart/Checkout/Checkout";
import Payment from "../Screens/Cart/Checkout/Payment";
import Confirm from "../Screens/Cart/Checkout/Confirm";

const Tab = createMaterialTopTabNavigator();

const CheckoutNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen component={Checkout} name="Shipping" />
      <Tab.Screen component={Payment} name="Payment" />
      <Tab.Screen component={Confirm} name="Confirm" />
    </Tab.Navigator>
  );
};

export default CheckoutNavigator;
