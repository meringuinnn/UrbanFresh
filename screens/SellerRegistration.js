import * as Location from "expo-location";

import {
  ActivityIndicator,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Linking,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import React, { useState } from "react";
//firebase
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import Button from "../components/Button";
import Checkbox from "expo-checkbox";
import { FIREBASE_AUTH } from "../utils/firebaseConfig";
import { FIRESTORE_DB } from "../utils/firebaseConfig";
import Icon from "react-native-vector-icons/AntDesign";
import Input from "../components/Input";
import { ScrollView } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import Spacer from "../components/Spacer";
import WebView from "react-native-webview";
import axios from "axios";
import { colors } from "../utils/constants";
import logoNeon from "../assets/images/logo-neon-green.png";
import { useNavigation } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";

const SellerRegistration = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [isChecked, setChecked] = useState(false);
  const [isCheckedP, setCheckedP] = useState(false);
  const [showt, setShowt] = useState(false);
  const [showp, setShowp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    lat: 14.4445,
    long: 120.9939,
  });
  const [user, setUser] = useState({
    pic: "",
    storename: "",
    emailadd: "",
    pass: "",
    cpass: "",
    mobile: "",
    block: "",
    barangay: "",
    city: "",
    province: "",
    zipcode: "",
    userType: null,
  });
  async function getLocation() {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setMapUrl(
        () =>
          "https://urban-fresh-app-40ad1.web.app/view_map/?lat=" +
          parseFloat(location.coords.latitude) +
          "&long=" +
          parseFloat(location.coords.longitude)
      );
      setLocation({
        long: location.coords.longitude,
        lat: location.coords.latitude,
      });

      //console.log(location);
    })();
  }
  const handleSubmit = () => {
    if (user.pass !== user.cpass) {
      toast.show("Passwords do not match!", {
        type: "danger",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "slide-in",
      });
      return;
    }

    if (
      user.fullname == "" ||
      user.emailaddress == "" ||
      user.pass == "" ||
      user.mobile == "" ||
      user.address == ""
    ) {
      toast.show("Please fill up empty fields!", {
        type: "danger",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "slide-in",
      });

      return;
    }

    setLoading(true);
    createUserWithEmailAndPassword(FIREBASE_AUTH, user.emailadd, user.pass)
      .then((userCredential) => {
        setDoc(doc(FIRESTORE_DB, "users", userCredential.user.uid), {
          pic: user.pic,
          storename: user.storename,
          email: user.emailadd,
          cpass: user.pass,
          mobile: user.mobile,
          block: user.block,
          barangay: user.barangay,
          city: user.city,
          province: user.province,
          zipcode: user.zipcode,
          userType: Number(user.userType),
        })
          .then((res) => {
            sendEmailVerification(FIREBASE_AUTH.currentUser);
            setLoading(false);
            navigation.navigate("RegisterSuccess");
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const data = [
    { key: 2, value: "Seller-Retail" },
    { key: 3, value: "Seller-Wholesale" },
  ];
  const onChangeType = async (val) => {
    setUser({ ...user, ["userType"]: val });
    console.log(user);
  };
  const [mapURL, setMapUrl] = useState(
    "https://urban-fresh-app-40ad1.web.app/view_map/?lat=14.4445&long=120.9939"
  );
  const [isSeeMap, setIsSeeMap] = useState(false);
  return (
    <SafeAreaView
      style={[styles.container]}
      behaviour="padding"
      keyboardVerticalOffset={80}
    >
    <ScrollView showsVerticalScrollIndicator={false}>
      {isSeeMap ? (
        <>
          <View
            style={{
              width: "100%",
              height: "30%",
              paddingTop: 50,
              marginTop: 30,
              marginBottom: 10,
            }}
          >
            {/* PUT WEBVIEW HERE */}
            <WebView
              source={{
                uri: mapURL,
              }}
              style={{ flex: 1 }}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              alignContent: "center",
              height: "80%",
              paddingBottom: 300,
            }}
          >
              {/* <Button
                width={300}
                onPress={() => {
                  getLocation();
                }}
                textColor="white"
                text="Get My Location"
                color={colors.primary}
              /> */}
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Button
                  width={"45%"}
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
                <Button
                  width={"50%"}
                  onPress={() => {
                    getLocation();
                    toast.show("Searching address...", {
                      // type: "danger",
                      placement: "bottom",
                      duration: 2000,
                      offset: 30,
                      animationType: "slide-in",
                    });
                  }}
                  textColor="white"
                  text="My Location"
                  color={colors.primary}
                />
              </View>

              <Input
                label="Street Name, Building, House no"
                onChangeText={(text) =>
                  setUser((prev) => ({ ...prev, block: text }))
                }
                text={user.block || ""}
                placeholder={"Street Name, Building, House no"}
              />
              <Input
                label="Barangay"
                onChangeText={(text) =>
                  setUser((prev) => ({ ...prev, barangay: text }))
                }
                text={user.barangay || ""}
                placeholder={"Barangay"}
              />
              <Input
                label="City/Town"
                onChangeText={(text) =>
                  setUser((prev) => ({ ...prev, city: text }))
                }
                text={user.city || ""}
                placeholder={"City/Town"}
              />
              <Input
                label="Province"
                onChangeText={(text) =>
                  setUser((prev) => ({ ...prev, province: text }))
                }
                text={user.province || ""}
                placeholder={"Province"}
              />
              <Input
                label="Zip Code"
                onChangeText={(text) =>
                  setUser((prev) => ({ ...prev, zipcode: text }))
                }
                text={user.zipcode || ""}
                placeholder={"Zip Code"}
              />
              <View style={{ flexDirection: "row", gap: 5}}>
                <Button
                  width={"40%"}
                  onPress={() => {
                    setIsSeeMap(!isSeeMap);
                  }}
                  textColor="white"
                  text="Go Back"
                  color={colors.primary}
                />
                <Button
                  width={"50%"}
                  onPress={() => {
                    toast.show("Address saved.", {
                      type: "success",
                      placement: "bottom",
                      duration: 2000,
                      offset: 30,
                      animationType: "slide-in",
                    });

                    setIsSeeMap(false);
                  }}
                  textColor="white"
                  text="Save address"
                  color={colors.primary}
                />
              </View>
          </View>
        </>
      ) : (
        <View style={{ width: "100%", alignItems: "center" }}>
          {/* <ImageBackground
            source={logoNeon}
            resizeMode="contain"
            style={styles.image}
          ></ImageBackground> */}
          {loading && (
            <ActivityIndicator
              style={styles.indicator}
              animating={loading}
              size="large"
              color="#21C622"
            />
          )}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrowleft" size={30} color="#21C622" />
            </TouchableOpacity>
          </View>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Sign up as a Seller</Text>
          </View>
          {/* STILL WANT TO FIX THIS ADDRESS LINE */}
          {/* <ScrollView contentContainerStyle={{}}> */}
            <SelectList
              boxStyles={styles.select}
              dropdownStyles={styles.dropdown}
              // defaultOption={{ key: 2, value: "Seller-Retail" }}
              setSelected={onChangeType}
              save="key"
              search={false}
              data={data}
              placeholder="Retailer or Wholesaler"
            />
            <Input
              type="text"
              placeholder="Store Name"
              onChangeText={(text) => setUser({ ...user, ["storename"]: text })}
              value={user.storename}
            />
            <Input
              type="text"
              placeholder="Email address"
              onChangeText={(text) => setUser({ ...user, ["emailadd"]: text })}
              value={user.emailadd}
            />
            <Input
              type="text"
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => setUser({ ...user, ["pass"]: text })}
              value={user.pass}
            />
            <Input
              type="text"
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={(text) => setUser({ ...user, ["cpass"]: text })}
              value={user.cpass}
            />
            <Input
              type="text"
              inputmode="numeric"
              placeholder="Mobile no."
              onChangeText={(text) => setUser({ ...user, ["mobile"]: text })}
              value={user.value}
            />
            <Input
              type="text"
              placeholder="Complete Address"
              multiline={true}
              numberOfLines={10}
              editable={false}
              height={70}
              value={
                user.block == ""
                  ? ""
                  : user.block +
                    ", " +
                    user.barangay +
                    ", " +
                    user.city +
                    ", " +
                    user.province +
                    " " +
                    user.zipcode
              }
            />
            <Button
              width={"80%"}
              onPress={() => {
                setIsSeeMap(true);
              }}
              textColor="white"
              text="Edit Address"
              color={colors.primary}
            />
          <Spacer height={10} />
          <View style={styles.remember}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setChecked}
              color={isChecked ? "#21C622" : undefined}
            />
            <Text>I have read the </Text>
            <TouchableOpacity>
              <Text
                style={styles.link}
                onPress={() => {
                  Linking.openURL("https://www.traff.co/37e7mTd0");
                }}
              >
                Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.remember}>
            <Checkbox
              style={styles.checkbox}
              value={isCheckedP}
              onValueChange={setCheckedP}
              color={isCheckedP ? "#21C622" : undefined}
            />
            <Text>I agree to the </Text>
            <TouchableOpacity>
              <Text
                style={styles.link}
                onPress={() => {
                  Linking.openURL(
                    "https://www.freeprivacypolicy.com/live/1c09baf4-ceae-450d-a53b-d35457a87009"
                  );
                }}
              >
                Privacy Policy
              </Text>
            </TouchableOpacity>
          </View>
          {isCheckedP && isChecked ? (
            <TouchableOpacity
              onPress={handleSubmit}
              style={[
                styles.button,
                { width: 150, backgroundColor: "#21C622" },
              ]}
            >
              <Text style={[styles.btnText, { color: "white" }]}>
                Create Account
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={true}
              style={[
                styles.button,
                { width: 150, backgroundColor: "gray" },
              ]}
            >
              <Text style={[styles.btnText, { color: "white" }]}>
                Create Account
              </Text>
            </TouchableOpacity>
          )}

          {/* <Image
        source={logoNeon}
        resizeMode = 'contain'
        style={styles.image}
        />
        <Modal
            visible={showt}
        >
            <Text>MOdal</Text>
        </Modal> */}
        {/* </ScrollView> */}
        </View>
      )}
    </ScrollView>
    </SafeAreaView>
  );
};

export default SellerRegistration;

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    flex: 1,
    position: "relative",
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 30,
    border: "1px solid black",
  },
  indicator: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "flex-start",
    left: 0,
    right: 0,
    top: 100,
  },
  image: {
    height: 350,
    width: 350,
    opacity: 0.6,
    position: "absolute",
    bottom: -95,
    right: -100,
  },
  header: {
    width: "100%",
    paddingVertical: 30,
    paddingHorizontal: 30,
    height: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 29,
    lineHeight: 30,
    color: "#3E3627",
    width: "100%",
    textAlign: "left",
  },
  titleBox: {
    width: "100%",
    paddingHorizontal: 30,
    marginBottom: 20,
    marginTop: 30,
  },
  remember: {
    zIndex: 2000,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 5,
  },
  checkbox: {
    height: 18,
    width: 18,
    margin: 3,
  },
  link: {
    color: "#264CD0",
  },
  button: {
    // zIndex: 10,
    marginVertical: 20,
    height: 50,
    borderRadius: 30,
    // display: "flex",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  btnText: {
    fontWeight: "bold",
  },
  select: {
    border: "2px #21C622 solid",
    // outlineStyle : 'none',
    width: 294,
    borderRadius: 10,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    // marginVertical: 10,
  },
  dropdown: {
    border: "2px #21C622 solid",
    // position: "absolute",
    // zIndex: 1,
    outlineStyle: "none",
    height: 90,
    backgroundColor: "white",
    // width: "100%",
    // marginTop: 55,
  },
});
