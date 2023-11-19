import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useGetProductsQuery } from "../../Redux/features/productsApi";
import { SearchBar } from "@rneui/themed";
import { FlatList } from "react-native-gesture-handler";
import ListItem from "./ListItem";

const { width, height } = Dimensions.get("window");

const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={styles.headerText}>Brand</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.headerText}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.headerText}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={styles.headerText}>Price</Text>
      </View>
    </View>
  );
};

export default function Products() {
  const [productFilter, setProductFilter] = useState();
  const [search, setSearch] = useState("");

  const { data: productsList, isLoading } = useGetProductsQuery();

  const searchProduct = (text) => {
    // openList();
    // setSearch(text);
    // setFilteredProduct(
    //   products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    // );
  };

  useEffect(() => {
    setProductFilter(productsList);
    // console.log("productlist", productsList);
  }, [productsList]);

  return (
    <View>
      <View>
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
      </View>

      {isLoading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size={"large"} color={"red"} />{" "}
        </View>
      ) : (
        <FlatList
          data={productFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => <ListItem {...item} index={index} />}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

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

  listHeader: {
    flexDirection: "row",
    padding: 5,
    backfaceVisibility: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  headerText: {
    fontWeight: "800",
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
