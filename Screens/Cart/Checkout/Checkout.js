import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import { selectCart } from "../../../Redux/features/cart/cartSlice";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";

import countries from "../../../assets/data/countries.json";
import { Avatar, Button, Dialog, ListItem } from "@rneui/themed";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";

const Checkout = () => {
  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();
  const [visible1, setVisible1] = useState(false);

  const cartItems = useSelector(selectCart);
  const navigator = useNavigation();

  const toggleDialog1 = () => {
    setVisible1(!visible1);
  };

  const handleSelectCountry = (country) => {
    setCountry(country.name);
    setVisible1(false);
  };

  const checkout = () => {
    let order = {
      city,
      country,
      dateOrdered: Date.now(),
      orderItems,
      phone,
      shippingAddress1: address,
      shippingAddress2: address2,
      zip,
    };

    navigator.navigate("Payment", { order: order });
  };

  useEffect(() => {
    setOrderItems(cartItems.length);
  }, []);

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar
      extraHeight={100}
      enableOnAndroid
    >
      <FormContainer title={"Shipping Address"}>
        <Input
          placeholder="Phone"
          name="phone"
          value={phone}
          keyboardType="numeric"
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder="Shipping Address 1"
          name="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <Input
          placeholder="Shipping Address 2"
          name="Address2"
          value={address2}
          onChangeText={(text) => setAddress2(text)}
        />
        <Input
          placeholder="City"
          name="City"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder="Zip"
          name="Zip"
          keyboardType="numeric"
          value={zip}
          onChangeText={(text) => setZip(text)}
        />

        <ListItem
          onPress={() => setVisible1(true)}
          containerStyle={{
            margin: 10,
            width: "80%",
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: "orange",
            borderRadius: 20,
          }}
        >
          <ListItem.Content>
            <ListItem.Title>{country || "Select Country"}</ListItem.Title>
          </ListItem.Content>
        </ListItem>

        <Dialog isVisible={visible1} onBackdropPress={toggleDialog1}>
          <ScrollView style={{ height: "70%" }}>
            {countries.map((country) => (
              <ListItem
                key={country.code}
                onPress={() => handleSelectCountry(country)}
              >
                <ListItem.Content>
                  <ListItem.Title>{country.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            ))}
          </ScrollView>
        </Dialog>

        <View style={{ width: "80%", alignItems: "center" }}>
          <Button onPress={checkout} title={"Confirm"} />
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

export default Checkout;

const styles = StyleSheet.create({});
