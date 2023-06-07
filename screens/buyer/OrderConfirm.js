import * as Location from "expo-location";

import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";

import Button from "../../components/Button";
import CartItemO from "../../components/CartItemO";
import { FIRESTORE_DB } from "../../utils/firebaseConfig";
import Header from "../../components/Header";
import WebView from "react-native-webview";
import axios from "axios";
import { colors } from "../../utils/constants";
import useStore from "../../utils/appStore";
import { useToast } from "react-native-toast-notifications";

const OrderConfirm = ({ navigation }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const fetchCart = useStore((state) => state.fetchCart);
  const getTotalPrice = useStore((state) => state.getTotalPrice);
  const cart = useStore((state) => state.cart);
  const storeid = useStore((state) => state.storeid);
  const totalPrice = useStore((state) => state.totalPrice);
  const loading = useStore((state) => state.loading);
  const setUserProfile = useStore((state) => state.setUserProfile);
  const user = useStore((state) => state.user);
  const setCurrentStore = useStore((state) => state.setCurrentStore);
  const addOrders = useStore((state) => state.addOrders);
  const toast = useToast();
  const [isSeeMap, setIsSeeMap] = useState(false);
  const [location, setLocation] = useState({ lat: user.lat, long: user.long });
  const [pay, setPay] = useState(0);
  const [mapURL, setMapUrl] = useState(
    "https://urban-fresh-app-40ad1.web.app/view_map/?lat=14.4445&long=120.9939"
  );
  useLayoutEffect(() => {
    fetchCart();
    getTotalPrice();
    console.log(cart);
  }, [isSeeMap]);
  const handleSearch = async (text) => {
    try {
      const response = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: text, // replace with the user-entered address
            format: "json",
          },
        }
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setMapUrl(
          () =>
            "https://urban-fresh-app-40ad1.web.app/view_map/?lat=" +
            parseFloat(lat) +
            "&long=" +
            parseFloat(lon)
        );
        setLocation({ lat: parseFloat(lat), long: parseFloat(lon) });
      }
    } catch (error) {
      console.error("Error fetching geocoding data:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const userRef = doc(FIRESTORE_DB, "users", user.userid);
      await updateDoc(userRef, {
        block: user.block,
        barangay: user.barangay,
        city: user.city,
        province: user.province,
        zipcode: user.zipcode,
        userType: user.userType,
        long: location.long,
        lat: location.lat,
      });
      toast.show("Profile Updated Successfully!", {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "slide-in",
      });
      setIsSeeMap(false);
    } catch (error) {
      toast.show(error, {
        type: "danger",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "slide-in",
      });
    }
  };
  async function getLocation() {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        long: location.coords.longitude,
        lat: location.coords.latitude,
      });
      setMapUrl(
        () =>
          "https://urban-fresh-app-40ad1.web.app/view_map/?lat=" +
          parseFloat(location.coords.latitude) +
          "&long=" +
          parseFloat(location.coords.longitude)
      );
      //console.log(location);
    })();
  }

  const ConfirmOrder = () => {
    console.log("Order confirmed!");
    addOrders(cart, storeid, pay);
    toast.show("Your order has been confirmed and was sent to seller.", {
      type: "success",
      placement: "bottom",
      duration: 2000,
      offset: 30,
      animationType: "slide-in",
    });
    navigation.navigate("BuyerHome");
  };

  //LEAFLET MAP
  console.log(cart.length > 0);
  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => navigation.goBack()} />
      {isSeeMap ? (
        <>
          <View
            style={{
              height: "30%",
            }}
          >
            <WebView
              source={{
                uri: mapURL,
              }}
              style={{ flex: 1 }}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              alignContent: "center",
              // height: "80%",
              // paddingBottom: 110,
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* <Button
                width={300}
                onPress={() => {
                  getLocation();
                }}
                textColor="white"
                text="Get My Location"
                color={colors.primary}
              /> */}
            <View style={styles.addressContainer}>
                {/*SEARCH USER'S LOCATION USING ADDRESS DETAILS*/}
                <View style={{ flex: 1, flexDirection: "row", gap: 5, alignItems: 'center', justifyContent: 'center', paddingBottom: 10}}>
                  <Button
                    width={"50%"}
                    onPress={() => {
                      toast.show("Searching address...", {
                        // type: "danger",
                        placement: "bottom",
                        duration: 2000,
                        offset: 30,
                        animationType: "slide-in",
                      });
                      handleSearch(
                        user.block +
                          " " +
                          user.barangay +
                          " " +
                          user.city +
                          " " +
                          user.province
                      );
                    }}
                    textColor="white"
                    text="Search Address"
                    color={colors.primary}  
                  />

                  {/*GET USER'S LOCATION BASE ON PHONE GPS*/}
                  <Button
                    width={"50%"}
                    onPress={() => {
                      toast.show("Searching address...", {
                        // type: "danger",
                        placement: "bottom",
                        duration: 2000,
                        offset: 30,
                        animationType: "slide-in",
                      });
                      getLocation();
                    }}
                    textColor="white"
                    text="My Location"
                    color={colors.primary}
                  />
                </View>

                {/*DISPLAY DELIVERY ADDRESS*/}
                <View style={styles.addressTextContainer}>
                  <Input
                    label="Street Name Building, House no."
                    onChangeText={(text) => setUserProfile("block", text)}
                    text={user.block || ""}
                    style={styles.addressTitle}
                  />
                  <Input
                    label="Barangay"
                    onChangeText={(text) => setUserProfile("barangay", text)}
                    text={user.barangay || ""}
                    style={styles.addressTitle}
                  />
                  <Input
                    label="City/Town"
                    onChangeText={(text) => setUserProfile("city", text)}
                    text={user.city || ""}
                    style={styles.addressTitle}
                  />
                  <Input
                    label="Province"
                    onChangeText={(text) => setUserProfile("province", text)}
                    text={user.province || ""}
                    style={styles.addressTitle}
                  />
                  <Input
                    label="Zip Code"
                    onChangeText={(text) => setUserProfile("zipcode", text)}
                    text={user.zipcode || ""}
                    style={styles.addressTitle}
                  />  
                </View>
                

                {/*BACK TO CHECKOUT PAGE*/}
                <View style={{ flex: 1, flexDirection: "row", gap: 5, alignItems: 'center', justifyContent: 'center', paddingTop: 10}}>
                  <Button
                    width={"40%"}
                    onPress={() => {
                      setIsSeeMap(!isSeeMap);
                    }}
                    textColor="white"
                    text="Go Back"
                    color={colors.primary}
                  />
              {/*DISPLAY DELIVERY ADDRESS*/}
              <Input
                label="Street Name/Building/House no:"
                onChangeText={(text) => setUserProfile("block", text)}
                text={user.block || ""}
              />
              <Input
                label="Barangay:"
                onChangeText={(text) => setUserProfile("barangay", text)}
                text={user.barangay || ""}
              />
              <Input
                label="City/Town:"
                onChangeText={(text) => setUserProfile("city", text)}
                text={user.city || ""}
              />
              <Input
                label="Province:"
                onChangeText={(text) => setUserProfile("province", text)}
                text={user.province || ""}
              />
              <Input
                label="Zip Code:"
                onChangeText={(text) => setUserProfile("zipcode", text)}
                text={user.zipcode || ""}
              />

                  {/*SAVE NEW/UPDATE DELIVERY ADDRESS*/}
                  <Button
                    width={"60%"}
                    onPress={handleUpdate}
                    textColor="white"
                    text="Save Billing Address"
                    color={colors.primary}
                  />
                </View>
            </View>
              
            </ScrollView>
          </View>
        </>
      ) : (
        <>
          <View style={styles.cartBox}>
            {/* <View style={{ width: 30, alignItems: 'center'}}></View> */}
            <Text style={styles.title}>Order Confirmation</Text>
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
              // <CardItemO cart={cart} setIsDeleting={setIsDeleting} isDeleting={isDeleting} />
              <CartItemO
                cart={cart}
                setIsDeleting={setIsDeleting}
                isDeleting={isDeleting}
              />
            )}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Text style={styles.TPtitle}>Total Price: ₱{totalPrice}</Text>
            </View>
            <View
              style={{
                justifyContent: "center",
                width: "100%",
                paddingLeft: 20,
                // paddingRight: 45,
              }}
            >
              <Text
                style={{
                  width: "100%",
                  textAlign: "left",
                  color: colors.primary,
                  fontSize: 16,
                  fontWeight: 900,
                }}
              >
                Shipping Address{" "}
              </Text>
              <View style={{ flexDirection: "row", width: "80%"}}>
                <Text numberOfLines={2} ellipsizeMode="tail">
                  {user.block || ""} {user.barangay || ""} {user.city || ""}{" "}
                  {user.province || ""} {user.zipcode || ""}
                </Text>

                <TouchableOpacity
                  style={{
                    width: "20%",
                    marginLeft: 8,
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: colors.primary,
                    borderRadius: 25,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                    elevation: 7,
                  }}
                  onPress={() => {
                    setIsSeeMap(!isSeeMap);
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center', 
                      textAlignVertical: 'center',
                      fontSize: 15,
                      color: "white",
                      fontWeight: 700,
                    }}
                  >
                    Edit{" "}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                paddingLeft: 20,
                paddingRight: 20,
              }}
            >
              <Text
                style={{
                  width: "100%",
                  textAlign: "left",
                  color: colors.primary,
                  fontSize: 16,
                  fontWeight:900,
                }}
              >
                Payment Type
              </Text>
              <TouchableOpacity
                onPress={() => setPay(0)}
                style={[styles.payment, pay == 0 ? styles.selected : ""]}
              >
                <Text style={styles.paymentText}>Cash on Delivery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPay(1)}
                style={[styles.payment, pay == 1 ? styles.selected : ""]}
              >
                <Text style={styles.paymentText}>E-Wallet</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.btnBox}>
            {!isDeleting && cart.length > 0 ? (
              <Button
                width={200}
                onPress={ConfirmOrder}
                textColor="white"
                text="Checkout"
                color={colors.primary}
              />
            ) : (
              <Text></Text>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default OrderConfirm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // position: "relative",
  },
  cartBox: {
    height: 70,
    width: "100%",
    flexDirection: "row",

    alignItems: "center",
  },
  title: {
    textAlign: "center",
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    lineHeight: 25,
  },
  // Total Price styles
  TPtitle: {
    textAlign: "left",
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    lineHeight: 25,
    paddingVertical: 15,
    paddingHorizontal: 15,
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
  payment: {
    marginTop: 10,
    marginBottom: 10,
    width: 250,
    borderStyle: "solid",
    borderColor: colors.headerText,
    borderWidth: 1,
    borderRadius: 15,
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    flex: 1,
    borderBottomStyle: "solid",
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
  },
  selected: {
    borderColor: colors.primary,
  },
  paymentText: {
    fontSize: 16,
    color: colors.headerText,
    fontWeight: "bold",
  },
  addressContainer: {
    margin: 20,
  },
  txtbox: {
    padding: 10,
    // fontWeight: 700,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    marginVertical: 5,
  }
});
const Input = ({
  label,
  text,
  isVerify,
  isPassword,
  multiline,
  onChangeText,
}) => {
  const { width } = useWindowDimensions();

  const convertText = (text) => {
    const array = text.split("");
    const newText = array.map((i) => "*").join("");
    return newText;
  };
  return (
    <View
      style={[
        styles.input
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>{label}</Text>

        <TextInput
          secureTextEntry={isPassword}
          onChangeText={onChangeText}
          style={styles.txtbox}
          value={text}
        />
      </View>
      {/* { isVerify && <TouchableOpacity style={styles.modify}>
                <Text style={styles.modifyText}>Send Code</Text>
            </TouchableOpacity>} */}
    </View>
  );
};
