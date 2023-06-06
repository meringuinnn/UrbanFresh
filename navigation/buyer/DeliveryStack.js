import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import DeliveryHome from "../../screens/buyer/DeliveryHome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const DeliveryStack = () => {
  const [show, setShow] = useState(true);
  return (
    <Stack.Navigator initialRouteName="DeliveryHome">
      <Stack.Screen
        name="DeliveryHome"
        component={DeliveryHome}
        options={{ headerShown: false }}
      />

      {/* <ViewMap
        show={show}
        handleClose={() => setShow(false)}
        res={{ lat: 14.4445, long: 120.9939 }}
      /> */}
    </Stack.Navigator>
  );
};

export default DeliveryStack;

const styles = StyleSheet.create({});
