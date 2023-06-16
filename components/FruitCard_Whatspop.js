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
    width: "30%",
    height: 100,
    borderRadius: 5,
    marginHorizontal: 4,
    // padding: 6,
    // alignItems: "center",
    // justifyContent: "center",
    margin: 5,
  },
  name: {
    fontSize: 16,
    // lineHeight: 18,
    color: colors.headerText,
    fontWeight: "bold",
    fontStyle: "normal",
    margin: 5,
    // zIndex: 100,
  },
  img: {
    position: 'absolute',
    height: 90,
    width: 90,

    bottom: 0,
    right: 0,
  },
});
