import * as Location from "expo-location";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";

import Button from "../../components/Button";
import { FIRESTORE_DB } from "../../utils/firebaseConfig";
import React from "react";
import { colors } from "../../utils/constants";
import useStore from "../../utils/appStore";
import { useToast } from "react-native-toast-notifications";

const UpdateProfile = ({ navigation }) => {
  const user = useStore((state) => state.user);
  const setUserProfile = useStore((state) => state.setUserProfile);
  const toast = useToast();

  const handleUpdate = async () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      try {
        const userRef = doc(FIRESTORE_DB, "users", user.userid);
        const res = await updateDoc(userRef, {
          pic: user.pic,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          cpass: user.cpass,
          mobile: user.mobile,
          block: user.block,
          barangay: user.barangay,
          city: user.city,
          province: user.province,
          zipcode: user.zipcode,
          userType: user.userType,
          long: location.coords.longitude,
          lat: location.coords.latitude,
        });
        console.log(res);
        toast.show("Changes saved.", {
          type: "success",
          placement: "bottom",
          duration: 2000,
          offset: 30,
          animationType: "slide-in",
        });
        navigation.navigate("Profile");
      } catch (error) {
        toast.show(error, {
          type: "danger",
          placement: "bottom",
          duration: 2000,
          offset: 30,
          animationType: "slide-in",
        });
      }
    })();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Complete Name</Text>
          <View style={styles.line}></View>
        </View>
        <Input
          label="Firstname"
          onChangeText={(text) => setUserProfile("fname", text)}
          text={user.fname}
        />
        <Input
          label="Lastname"
          onChangeText={(text) => setUserProfile("lname", text)}
          text={user.lname}
        />
        <View style={styles.header}>
          <Text style={styles.headerText}>Email Address</Text>
          <View style={styles.line}></View>
        </View>
        <Input
          label="Email Address"
          onChangeText={(text) => setUserProfile("email", text)}
          text={user.email}
        />
        <View style={styles.header}>
          <Text style={styles.headerText}>Mobile Number</Text>
          <View style={styles.line}></View>
        </View>
        <Input
          label="Mobile Number"
          onChangeText={(text) => setUserProfile("mobile", text)}
          text={user.mobile}
        />
        {/* removed isVerify after user.mobile */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Address</Text>
          <View style={styles.line}></View>
        </View>
        <Input
          label="Street Name Building, House no"
          onChangeText={(text) => setUserProfile("block", text)}
          text={user.block || ""}
        />
        <Input
          label="Barangay"
          onChangeText={(text) => setUserProfile("barangay", text)}
          text={user.barangay || ""}
        />
        <Input
          label="City/Town"
          onChangeText={(text) => setUserProfile("city", text)}
          text={user.city || ""}
        />
        <Input
          label="Province"
          onChangeText={(text) => setUserProfile("province", text)}
          text={user.province || ""}
        />
        <Input
          label="Zip Code"
          onChangeText={(text) => setUserProfile("zipcode", text)}
          text={user.zipcode || ""}
        />
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleUpdate}
          style={[styles.button, { width: 150, backgroundColor: "#21C622" }]}
        >
          <Text style={styles.btntxt}>Save update</Text>
        </TouchableOpacity>
        {/* <Button onPress={handleUpdate} color={colors.primary} text="Update Profile" textColor="white"/> */}
      </View>
    </SafeAreaView>
  );
};

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
        styles.input,
        { width: width * 0.95, height: multiline ? 90 : 60 },
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

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    position: "relative",

    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary,
  },
  line: {
    flex: 1,
    borderBottomStyle: "solid",
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
  },
  input: {
    marginVertical: 0,
    marginHorizontal: "auto",

    borderColor: "#AFAFAF",
    borderStyle: "solid",
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#656565",
    lineHeight: 16,
    marginBottom: 5,
  },
  txtbox: {
    // outlineStyle: "none",
    fontSize: 16,
    fontWeight: "bold",
    lineHeight: 16,
    color: colors.headerText,
  },
  modify: {
    width: 90,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  modifyText: {
    color: "white",
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "bold",
  },
  footer: {
    position: "static",
    // bottom : 0,
    // right : 0,
    width: "100%",
    // paddingBottom : 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  button: {
    zIndex: 10,
    marginVertical: 20,
    height: 50,
    borderRadius: 30,
    display: "flex",
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
  btntxt: {
    fontWeight: "bold",
    color: 'white',
  },
});
