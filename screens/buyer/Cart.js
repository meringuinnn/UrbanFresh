import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";

import Button from "../../components/Button";
import CartItem from "../../components/CartItem";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/AntDesign";
import ProductCard from "../../components/ProductCard";
import { colors } from "../../utils/constants";
import fallback from "../../assets/images/fallback.png";
import useStore from "../../utils/appStore";

const Cart = ({ navigation }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const fetchCart = useStore((state) => state.fetchCart);
  const getTotalPrice = useStore((state) => state.getTotalPrice);
  const cart = useStore((state) => state.cart);
  const totalPrice = useStore((state) => state.totalPrice);
  const loading = useStore((state) => state.loading);
  const setCurrentStore = useStore((state) => state.setCurrentStore);

  useLayoutEffect(() => {
    fetchCart();
    getTotalPrice();
    console.log(cart);
  }, []);

  console.log(cart.length > 0);
  return (
    <SafeAreaView style={styles.container}>
      <Header what={"Cart"} onPress={() => navigation.goBack()} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Text style={styles.title}>
          Total Price with Shipping: {totalPrice}
        </Text>
      </View>
      <View style={styles.cartBox}>
        {/* <View style={{ width: 30, marginHorizontal: 10, }}></View> */}
        <Text style={styles.title}>Cart</Text>
        {/* CLOSE BUTTON */}
        {isDeleting && (
          <TouchableOpacity onPress={() => setIsDeleting(false)}>
            <Icon2
              name="close"
              size={30}
              color="black"
              style={{ marginLeft: -70, marginRight: 40, paddingTop: 25 }}
            />
          </TouchableOpacity>
        )}
        {/* EDIT BUTTON */}
        {!isDeleting && cart.length > 0 && (
          <TouchableOpacity onPress={() => setIsDeleting(true)}>
            <Icon
              name="edit"
              size={30}
              color="black"
              style={{ marginLeft: -70, marginRight: 40, paddingTop: 25 }}
            />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {loading && (
          <ActivityIndicator
            style={styles.indicator}
            animating={loading}
            size="large"
            color="#21C622"
          />
        )}

        {cart.length == 0 ? (
          <Text>No Items on Cart!</Text>
        ) : (
          <CartItem
            cart={cart}
            setIsDeleting={setIsDeleting}
            isDeleting={isDeleting}
          />
        )}
      </ScrollView>
      <View style={styles.btnBox}>
        {!isDeleting && cart.length > 0 && totalPrice > 0 ? (
          <Button
            width={200}
            textColor="white"
            text="Go to Payment"
            onPress={() => navigation.navigate("OrderConfirm")}
            color={colors.primary}
            style={{}}
          />
        ) : (
          <Text></Text>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
  },
  cartBox: {
    height: 70,
    width: "100%",
    flexDirection: "row",

    alignItems: "center",
  },
  title: {
    textAlign: "center",
    alignItems: "center",
    flex: 1,
    fontSize: 24,
    paddingTop: 30,
    fontWeight: "bold",
    color: colors.primary,
    lineHeight: 20,
  },
  contentContainer: {
    alignItems: "center",
    gap: 10,
  },
  btnBox: {
    bottom: 0,
    right: 0,
    height: 80,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  indicator: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-start",
    left: 0,
    right: 0,
    top: 100,
  },
});
