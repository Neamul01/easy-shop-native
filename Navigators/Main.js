import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeNavigator from "./HomeNavigator";
import CartNavigator from "./CartNavigator";
import { useSelector } from "react-redux";
import { selectCart } from "../Redux/features/cart/cartSlice";
import { Badge } from "@rneui/themed";
import UserNavigator from "./UserNavigator";
import AdminNavigator from "./AdminNavigator";
import { getUser } from "../helpers/userFunctions";
import { useFocusEffect } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const Main = () => {
  const cart = useSelector(selectCart);
  const [user, setUser] = useState();

  const fetchUser = async () => {
    try {
      const fetchedUser = await getUser();
      setUser(fetchedUser);
    } catch (error) {
      // Handle error if needed
      console.error("Error fetching user:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUser();
      console.log("focus effect in main");
    }, [])
  );
  useEffect(() => {
    console.log("useEffect called");
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              style={{ position: "relative" }}
              color={color}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreen"
        component={CartNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <>
              {cart.length > 0 && (
                <Badge
                  value={cart.length}
                  status="error"
                  containerStyle={{
                    position: "absolute",
                    top: 0,
                    left: "55%",
                  }}
                />
              )}
              <Icon name="shopping-cart" color={color} size={30} />
            </>
          ),
        }}
      />
      {user?.isAdmin ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={30} />
            ),
          }}
        />
      ) : null}
      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
