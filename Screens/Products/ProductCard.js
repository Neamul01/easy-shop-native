import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, selectCart } from "../../Redux/features/cart/cartSlice";
import Toast from "react-native-toast-message";

const { width } = Dimensions.get("window");

const ProductCard = (props) => {
  const { name, price, image, countInStock } = props;
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();

  // console.log(cart.length);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image
            ? image
            : "https://freepngimg.com/thumb/bag/130644-bag-backpack-free-download-image.png",
        }}
        alt="product"
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {name.length > 15 ? name.substring(0, 15 - 3) + "..." : name}
      </Text>
      <Text style={styles.price}>${price}</Text>

      {countInStock > 0 ? (
        <View style={{ marginBottom: 60 }}>
          <Button
            title="Add"
            color={"green"}
            onPress={() => {
              dispatch(addToCart(props));
              Toast.show({
                type: "success",
                text1: `${name} added to the cart`,
                text2: "Go to cart to complete order",
              });
            }}
          />
        </View>
      ) : (
        <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>
      )}
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
    position: "relative",
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 2 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
  },
});
