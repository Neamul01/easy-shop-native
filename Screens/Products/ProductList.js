import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import ProductCard from "./ProductCard";

const { width } = Dimensions.get("window");

const ProductList = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={{ width: width / 2 }}
      onPress={() => navigation.navigate("SingleProduct", { item: item })}
    >
      <ProductCard {...item} />
    </TouchableOpacity>
  );
};

export default ProductList;
