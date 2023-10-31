import React, { useEffect, useState } from "react";
import { View, FlatList, Dimensions, StyleSheet } from "react-native";
import ProductList from "./ProductList";
import { SearchBar } from "@rneui/themed";

import data from "../../assets/data/products.json";
import SearchedProducts from "./SearchedProducts";
// import { Container, Header } from "native-base";

const { width } = Dimensions.get("window");

const ProductsContainer = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);

  const updateSearch = (search) => {
    setSearch(search);
  };

  useEffect(() => {
    setProducts(data);
    setFilteredProduct(data);
  }, []);

  return (
    <View style={{ marginTop: 10, width: width }}>
      <SearchBar
        placeholderTextColor="white"
        searchIcon={{ color: "white" }}
        inputStyle={{ color: "white" }}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
      />
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <ProductList key={item.id} item={item} />}
      />
    </View>
  );
};

export default ProductsContainer;

const styles = StyleSheet.create({
  searchBarContainer: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginBottom: 10,
    shadowColor: "black",
  },
  searchBarInputContainer: {
    backgroundColor: "gray",
    color: "white",
  },
});
