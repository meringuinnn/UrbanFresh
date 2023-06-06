import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import React from "react";
import { colors } from "../utils/constants";

const FruitCard_Whatspop = ({ color, image, fruit }) => {
  return (
    <TouchableOpacity
      style={[styles.fruitBox, { backgroundColor: color ? color : "white" }]}
    >
      <Text style={styles.name}>{fruit}</Text>
      <Image source={image} style={styles.img} />
    </TouchableOpacity>
  );
};

export default FruitCard_Whatspop;

const styles = StyleSheet.create({
  fruitBox: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    marginHorizontal: 4,
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.headerText,
    fontWeight: "bold",
    fontStyle: "normal",
    zIndex: 100,
  },
  img: {
    height: 64,
    width: 64,

    bottom: 0,
    right: 0,
  },
});
