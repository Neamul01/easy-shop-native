import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar, ListItem } from "@rneui/themed";

const SearchedProducts = ({ filteredProducts }) => {
  return (
    <View>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar
              source={{
                uri: item.image
                  ? item.image
                  : "https://m.media-amazon.com/images/I/81PtF30TLUL._AC_UY1100_.jpg",
              }}
            />
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
            </ListItem.Content>
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
