import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";

const { width } = Dimensions.get("window");

export default function ListItem(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  return (
    <View>
      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modelView}>
            <TouchableOpacity
              underlayColor={"#E8E8E8E8"}
              onPress={() => setModalVisible(false)}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={20} />
            </TouchableOpacity>
            <Button
              title="Edit"
              onPress={() => [
                navigation.navigate("ProductForm"),
                setModalVisible(false),
              ]}
              containerStyle={styles.modalButton}
            />
            <Button
              containerStyle={styles.modalButton}
              title="Delete"
              onPress={() => [
                // Delete Here
              ]}
            />
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProductDetail", { item: props });
        }}
        onLongPress={() => setModalVisible(true)}
        style={[
          styles.container,
          {
            backgroundColor: props.index % 2 === 0 ? "white" : "gainsboro",
          },
        ]}
      >
        <Image
          source={{
            uri: props.image
              ? props.image
              : "https://freepngimg.com/thumb/bag/130644-bag-backpack-free-download-image.png",
          }}
          resizeMethod="auto"
          style={styles.image}
        />
        <Text style={styles.item}>{props.brand}</Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.name}
        </Text>
        <Text style={styles.item} numberOfLines={1} ellipsizeMode="tail">
          {props.category.name}
        </Text>
        <Text style={styles.item}>{props.price}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: "100%",
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 30,
    margin: 2,
  },
  item: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modelView: {
    width: "40%",
    height: "auto",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 5,
    // paddingLeft: 20,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  modalButton: {
    width: "100%",
  },
});
