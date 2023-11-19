import {
  Dimensions,
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
import { Avatar, ListItem } from "@rneui/themed";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import EasyButton from "../../Shared/StyledComponent/EasyButton";

const { height, width } = Dimensions.get("window");

const Cart = (props) => {
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  const navigator = useNavigation();

  const total = cart
    .reduce((acc, product) => {
      return acc + Number(product.price) * Number(product.quantity);
    }, 0)
    .toFixed(2);

  return (
    <View>
      {cart.length > 0 ? (
        <>
          <ScrollView style={{ height: height - 110 }}>
            {cart.map((product) => {
              return (
                <ListItem key={product._id} bottomDivider>
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
                    <Text
                      style={[
                        styles.productQuantity,
                        {
                          fontWeight: "bold",
                          marginRight: 5,
                          height: "100%",
                          justifyContent: "center",
                        },
                      ]}
                    >
                      ${product.price}
                    </Text>
                    <Text style={styles.productQuantity}>
                      Qty-{product.quantity}
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
          <View style={styles.bottomContainer}>
            <Text style={styles.priceText}>${total}</Text>
            <EasyButton danger medium onPress={() => dispatch(clearCart())}>
              <Text style={{ color: "white" }}>Clear Cart</Text>
            </EasyButton>
            <EasyButton
              primary
              medium
              onPress={() => navigator.navigate("Checkout")}
            >
              <Text style={{ color: "white" }}>Checkout</Text>
            </EasyButton>
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
  bottomContainer: {
    width,
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
