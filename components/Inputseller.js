import { StyleSheet, Text, TextInput, View } from "react-native";

import React from "react";
import { colors } from "../utils/constants";

const Inputseller = (props) => {
  return (
    <View>
      <Text style={{ marginLeft: 10, marginBottom: 0 }}>
        {props.inputTitle}
      </Text>
      <TextInput
        {...props}
        style={[styles.input, { height: props.height ? props.height : 42 }]}
      />
    </View>
  );
};

export default Inputseller;

const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: colors.primary,
    outlineStyle: "none",
    width: "95%",
    borderRadius: 10,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    marginVertical: 10,
    marginLeft: 10,
    marginTop: 0,
  },
});
