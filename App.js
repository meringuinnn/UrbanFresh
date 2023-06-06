import React, { useEffect, useState } from "react";

import BuyerRegistration from "./screens/BuyerRegistration";
import BuyerTabs from "./navigation/buyer/BuyerTabs";
// import Dashboard from "./screens/Dashboard";
import Landing from "./screens/Landing";
import Loading from "./screens/Loading";
import Login from "./screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import RegisterPanel from "./screens/RegisterPanel";
import RegisterSuccess from "./screens/RegisterSuccess";
import SellerRegistration from "./screens/SellerRegistration";
import SellerTabs from "./navigation/seller/SellerTabs";
import Signup from "./screens/Signup";
import Splash from "./screens/Splash";
import { ToastProvider } from "react-native-toast-notifications";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Loading"
            component={Loading}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterPanel"
            component={RegisterPanel}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BuyerRegistration"
            component={BuyerRegistration}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SellerRegistration"
            component={SellerRegistration}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterSuccess"
            component={RegisterSuccess}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BuyerTabs"
            component={BuyerTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SellerTabs"
            component={SellerTabs}
            options={{ headerShown: false }}
          />

          {/* <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen name="AddVaccine" component={AddVaccine}  /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}
export default App;
