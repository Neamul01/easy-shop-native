import {
  View,
  Text,
  ScrollView,
  Dimensions,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Avatar, ListItem } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, selectCart } from "../../../Redux/features/cart/cartSlice";

const { height } = Dimensions.get("window");

const Confirm = () => {
  const router = useRoute();
  const navigation = useNavigation();
  const cartItems = useSelector(selectCart);
  const dispatch = useDispatch();

  const orderData = router.params;

  const confirmOrder = () => {
    Alert.alert(
      "Succeed",
      "Your order placed successfully",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }],
      {
        cancelable: true,
        onDismiss: () => {
          navigation.navigate("Cart");
        },
      }
    );
    dispatch(clearCart());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>
      </View>
      {orderData ? (
        <View style={{ borderWidth: 1, borderColor: "#333", borderRadius: 10 }}>
          <Text style={styles.title}>Shipping to:</Text>
          <View style={{ padding: 8 }}>
            <Text>Address: {orderData.order.order.shippingAddress1}</Text>
            <Text>Address2: {orderData.order.order.shippingAddress2}</Text>
            <Text>City: {orderData.order.order.city}</Text>
            <Text>Zip Code: {orderData.order.order.zip}</Text>
            <Text>Country: {orderData.order.order.country}</Text>
          </View>
          <Text style={styles.title}>Items:</Text>
          {orderData.order.order.orderItems.map((item, i) => (
            <ListItem key={i} bottomDivider>
              <Avatar
                rounded
                source={{
                  uri: item.image
                    ? item.image
                    : "https://freepngimg.com/thumb/bag/130644-bag-backpack-free-download-image.png",
                }}
              />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>
                  Price:{item.price} - Quantity:{item.quantity}{" "}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </View>
      ) : null}
      <View style={{ alignItems: "center", margin: 20 }}>
        <Button title="Place Order" onPress={confirmOrder} />
      </View>
    </ScrollView>
  );
};

export default Confirm;

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "#fff",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});
