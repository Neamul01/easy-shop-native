import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Dialog, Header, Icon, ListItem } from "@rneui/themed";
import { useNavigation, useRoute } from "@react-navigation/native";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "MasterCard", value: 3 },
  { name: "Other", value: 4 },
];

export default function Payment(props) {
  const [selected, setSelected] = useState();
  const [card, setCard] = useState();
  const [open, setOpen] = useState(false);
  const router = useRoute();

  const order = props.route.params;

  const navigation = useNavigation();

  return (
    <View>
      <Header
        containerStyle={styles.headerContainer}
        centerComponent={{
          text: "Choose your payment method",
          style: styles.heading,
        }}
      />
      {methods.map((method) => (
        <ListItem key={method.value} onPress={() => setSelected(method.value)}>
          <ListItem.Content
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ListItem.Title>{method.name}</ListItem.Title>
            <ListItem.CheckBox
              // Use ThemeProvider to change the defaults of the checkbox
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon="checkbox-blank-outline"
              checked={selected === method.value}
            />
          </ListItem.Content>
        </ListItem>
      ))}
      {selected === 3 ? (
        <ListItem onPress={() => setOpen(true)}>
          <ListItem.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              borderTopWidth: 1,
              paddingTop: 15,
              borderColor: "orange",
            }}
          >
            <ListItem.Title>
              {card ? paymentCards[card].name : paymentCards[0].name}
            </ListItem.Title>
            <Icon
              name="chevron-down"
              type="evilicon"
              color="#517fa4"
              size={40}
            />
          </ListItem.Content>
        </ListItem>
      ) : null}
      <Dialog isVisible={open} onBackdropPress={() => setOpen(false)}>
        {paymentCards.map((method) => (
          <ListItem key={method.value} onPress={() => setCard(method.value)}>
            <ListItem.Content
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <ListItem.Title>{method.name}</ListItem.Title>
              <ListItem.CheckBox
                // Use ThemeProvider to change the defaults of the checkbox
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checked={card === method.value}
              />
            </ListItem.Content>
          </ListItem>
        ))}
      </Dialog>
      <View style={{ marginTop: 60, alignSelf: "center" }}>
        <Button
          title="Confirm"
          onPress={() => navigation.navigate("Confirm", { order })}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 20,
    width: "100%",
    paddingVertical: 15,
  },
  heading: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },
});
