import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import ProductCard from "./ProductCard";

const { width } = Dimensions.get("window");

const ProductList = ({ item }) => {
  return (
    <TouchableOpacity style={{ width: width / 2 }}>
      <ProductCard {...item} />
    </TouchableOpacity>
  );
};

export default ProductList;
