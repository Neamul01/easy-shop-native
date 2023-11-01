import { Image, ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Button, ButtonGroup, Text } from "@rneui/themed";

const SingleProduct = () => {
  const router = useRoute();
  const [item, setItem] = useState(router.params.item);
  const [availability, setAvailability] = useState("");

  //   console.log(item.image);

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
        {/* TODO: Description, Rich Description and Availability */}
      </ScrollView>
      <View style={styles.bottomContainer}>
        <Text style={styles.price}>${item.price}</Text>
        <Button
          backgroundColor="black"
          containerStyle={{ height: "100%", marginTop: 15 }}
          title={"Add"}
          type="clear"
          size="lg"
        />
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
});
