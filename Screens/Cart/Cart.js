import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  removeFromCart,
  selectCart,
} from "../../Redux/features/cart/cartSlice";
import { Avatar, Button, ListItem } from "@rneui/themed";
import Entypo from "react-native-vector-icons/Entypo";

const Cart = (props) => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  // console.log(cart);
  return (
    <View>
      {cart.length > 0 ? (
        <>
          <ScrollView>
            {cart.map((product) => {
              return (
                <ListItem key={product._id.$oid} bottomDivider>
                  <Avatar
                    rounded
                    source={{
                      uri: product.image
                        ? product.image
                        : "https://freepngimg.com/thumb/bag/130644-bag-backpack-free-download-image.png",
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{product.name}</ListItem.Title>
                    <ListItem.Subtitle>{product.brand}</ListItem.Subtitle>
                  </ListItem.Content>
                  <View style={styles.cartControlContainer}>
                    <Text style={styles.productQuantity}>
                      {product.quantity}
                    </Text>
                    <TouchableOpacity
                      style={{ padding: 10 }}
                      onPress={() => dispatch(removeFromCart(product))}
                    >
                      <Entypo name="cross" size={20} />
                    </TouchableOpacity>
                  </View>
                </ListItem>
              );
            })}
          </ScrollView>
          <View style={{ marginTop: "auto" }}>
            <Button
              onPress={() => dispatch(clearCart())}
              title={"Clear Cart"}
              color={"error"}
            />
          </View>
        </>
      ) : (
        <Text
          style={{
            width: "100%",
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
          }}
        >
          No Product in Cart
        </Text>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cartControlContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  productQuantity: {
    padding: 10,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f3e1f9",
  },
});
