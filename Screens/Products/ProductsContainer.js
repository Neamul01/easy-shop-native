import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  ScrollView,
  Text,
} from "react-native";
import ProductList from "./ProductList";
import { SearchBar } from "@rneui/themed";
import SearchedProducts from "./SearchedProducts";
import Banner from "../../Shared/Banner";

import data from "../../assets/data/products.json";
import productCategories from "../../assets/data/categories.json";
import CategoryFilter from "./CategoryFilter";
import { useFocusEffect } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const ProductsContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [focus, setFocus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setFilteredProduct(data);
    setCategories(productCategories);
    setProductsCtg(data);
    setActive(-1);
    setInitialState(data);
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("blur", () => {
      setFocus(false);
    });

    return unsubscribe;
  }, [props.navigation]);

  useFocusEffect(
    React.useCallback(() => {
      // Function to handle onBlur effect when the screen gains focus
      setFocus(false);
      setSearch("");

      return () => {
        // Cleanup function if needed when the screen loses focus
      };
    }, [])
  );
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

  // ---- categories
  const changeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsCtg(initialState), setActive(true)]
        : [
            setProductsCtg(
              products.filter((i) => i.category.$oid === ctg),
              setActive(true)
            ),
          ];
    }
  };

  return (
    <ScrollView>
      <View style={{ marginTop: 10, width: width }}>
        <SearchBar
          placeholderTextColor="white"
          searchIcon={{ color: "white" }}
          inputStyle={{ color: "white" }}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchBarInputContainer}
          clearButtonMode="unless-editing"
          placeholder="Type Here..."
          // onBlur={onBlur}

          onChangeText={searchProduct}
          value={search}
          onClear={() => {
            setFocus(false);
          }}
        />

        {focus ? (
          <SearchedProducts
            navigation={props.navigation}
            filteredProducts={filteredProduct}
          />
        ) : (
          <View>
            <View>
              <Banner />
            </View>
            <View>
              <CategoryFilter
                categories={categories}
                CategoryFilter={changeCtg}
                productsCtg={productsCtg}
                active={active}
                setActive={setActive}
              />
            </View>
            {productsCtg.length > 0 ? (
              <View style={styles.listContainer}>
                {productsCtg.map((item) => {
                  return (
                    <ProductList
                      navigation={props.navigation}
                      key={item._id.$oid}
                      item={item}
                    />
                  );
                })}
              </View>
            ) : (
              <View
                style={{
                  height: "40%",
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 16 }}>No Products found</Text>
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ProductsContainer;

const styles = StyleSheet.create({
  listContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
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
