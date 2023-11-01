import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar, ListItem } from "@rneui/themed";

const SearchedProducts = ({ filteredProducts, navigation }) => {
  return (
    <View>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item, i) => (
          <ListItem
            key={i}
            bottomDivider
            onPress={() => navigation.navigate("SingleProduct", { item: item })}
            // onPress={() => console.log("listPress")}
          >
            {/* <TouchableOpacity onPress={() => console.log("listPress")}> */}
            <Avatar
              source={{
                uri: item.image
                  ? item.image
                  : "https://freepngimg.com/thumb/bag/130644-bag-backpack-free-download-image.png",
              }}
            />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
            {/* </TouchableOpacity> */}
          </ListItem>
        ))
      ) : (
        <View>
          <Text style={{ alignSelf: "center" }}>No product found.</Text>
        </View>
      )}
    </View>
  );
};

export default SearchedProducts;

const styles = StyleSheet.create({});
