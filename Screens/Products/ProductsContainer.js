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
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setProducts(data);
    setFilteredProduct(data);
  }, []);

  const searchProduct = (text) => {
    openList();
    setSearch(text);
    setFilteredProduct(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  return (
    <View style={{ marginTop: 10, width: width }}>
      <SearchBar
        placeholderTextColor="white"
        searchIcon={{ color: "white" }}
        inputStyle={{ color: "white" }}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        clearButtonMode="unless-editing"
        placeholder="Type Here..."
        onBlur={onBlur}
        onChangeText={searchProduct}
        value={search}
        onClear={() => {
          setFocus(false);
        }}
      />
      {focus ? (
        <SearchedProducts filteredProducts={filteredProduct} />
      ) : (
        <FlatList
          data={products}
          numColumns={2}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <ProductList key={item.id} item={item} />}
        />
      )}
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
    backgroundColor: "#5c615d",
    color: "white",
  },
});
