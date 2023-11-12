import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Badge, ListItem } from "@rneui/themed";

const CategoryFilter = ({
  categories,
  CategoryFilter,
  productsCtg,
  active,
  setActive,
}) => {
  return (
    <ScrollView bounces horizontal style={styles.container}>
      <ListItem containerStyle={{ backgroundColor: "transparent" }}>
        <TouchableOpacity
          key={1}
          onPress={() => {
            CategoryFilter("all"), setActive(-1);
          }}
        >
          <Badge
            value="All"
            badgeStyle={[
              active === -1 ? styles.active : styles.inActive,
              {
                height: 30,
                paddingHorizontal: 10,
              },
            ]}
            textStyle={{
              fontSize: 13,
              textTransform: "capitalize",
            }}
          />
        </TouchableOpacity>
        {categories?.map((item) => {
          return (
            <TouchableOpacity
              key={item._id}
              onPress={() => {
                CategoryFilter(item._id), setActive(categories.indexOf(item));
              }}
            >
              <Badge
                value={item.name}
                badgeStyle={[
                  active === categories.indexOf(item)
                    ? styles.active
                    : styles.inActive,
                  {
                    height: 30,
                    paddingHorizontal: 10,
                  },
                ]}
                textStyle={{
                  fontSize: 13,
                  textTransform: "capitalize",
                }}
              />
            </TouchableOpacity>
          );
        })}
      </ListItem>
    </ScrollView>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f2f2f2",
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#03bafc",
  },
  inActive: {
    backgroundColor: "#a0e1eb",
  },
});
