import React, { useEffect, useState } from "react";
import { View, FlatList, Dimensions } from "react-native";
import ProductList from "./ProductList";

import data from "../../assets/data/products.json";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const ProductsContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
  }, []);

  return (
    <SafeAreaView>
      <View style={{ marginTop: 10, width: width }}>
        <View style={{ marginTop: 10, width: width }}>
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <ProductList key={item.id} item={item} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductsContainer;
