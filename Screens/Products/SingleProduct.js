import { Image, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Button, ButtonGroup, Text } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/features/cart/cartSlice";
import Toast from "react-native-toast-message";
import EasyButton from "../../Shared/StyledComponent/EasyButton";
import TrafficLight from "../../Shared/StyledComponent/TrafficLight";

const SingleProduct = () => {
  const router = useRoute();
  const [item, setItem] = useState(router.params.item);
  const [availability, setAvailability] = useState(null);
  const [availabilityText, setAvailabilityText] = useState("");

  const dispatch = useDispatch();
  const route = useRoute();

  useEffect(() => {
    if (route.params.item.countInStock == 0) {
      setAvailability(<TrafficLight unavailable></TrafficLight>);
      setAvailabilityText("Unavailable");
    } else if (route.params.item.countInStock < 5) {
      setAvailability(<TrafficLight limited></TrafficLight>);
      setAvailabilityText("Limited Stock");
    } else {
      setAvailability(<TrafficLight available></TrafficLight>);
      setAvailabilityText("Available");
    }
  }, [route]);

  // console.log(route.params.item.countInStock);

  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{
              uri: item.image
                ? item.image
                : "https://freepngimg.com/thumb/bag/130644-bag-backpack-free-download-image.png",
            }}
          />
        </View>
        <View style={styles.contentContainer}>
          <Text h1 style={styles.contentHeader}>
            {item.name}
          </Text>
          <Text style={styles.contentText}>{item.brand}</Text>
        </View>

        <View style={styles.availabilityContainer}>
          <View style={styles.availability}>
            <Text style={{ marginRight: 10 }}>
              Availability: {availabilityText}
            </Text>
            {availability}
          </View>
          <Text>{item.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.price}>${item.price}</Text>
        <EasyButton
          medium
          primary
          onPress={() => {
            dispatch(addToCart(item));
            Toast.show({
              type: "success",
              text1: `${item.name} added to the cart`,
              text2: "Go to cart to complete order",
            });
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
              alignSelf: "center",
            }}
          >
            Add
          </Text>
        </EasyButton>
      </View>
    </View>
  );
};

export default SingleProduct;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "transparent",
    paddingHorizontal: 10,
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
});
