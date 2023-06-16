import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import React from "react";
import bg from "../assets/images/kiwi.png";
import logo from "../assets/images/logo-neon-green.png";
import { padding } from "../utils/constants";
import tup from "../assets/tup-logo.png";

const Splash = ({ navigation }) => {
  return (
    <ImageBackground
      source={bg}
      resizeMode="cover"
      style={{
        flex: 1,
      }}
    >
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={logo} />
        <Image style={styles.logo2} source={tup} />
        <View style={styles.btnBox}>
          <Text style={styles.heading}>Quick delivery at your doorstep</Text>
          <View style={{ width: "90%" }}>
            <Text style={styles.body}>
              {" "}
              With UrbanFresh, your fruits and veggies are guaranteed to freshly
              and healthily arrive your door.
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Loading")}
            style={styles.btn}
          >
            <Text style={styles.btn_text}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
  },
  logo: {
    width: 100,
    height: 100,
    position: "absolute",
    top: 10,
    right: 105,
  },
  logo2: {
    width: 90,
    height: 90,
    position: "absolute",
    top: 20,
    right: 10,
  },
  btnBox: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    // gap: 20,
    backgroundColor: "#21C622",
    width: 300,
    height: 250,
    borderRadius: 15,
    marginBottom: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    padding: 20,
  },
  heading: {
    color: "white",
    fontSize: 32,
    //fontWeight: "bold",
    textAlign: "center",
    lineHeight: 34,
    // textWrap: 'wrap',
    paddingTop: 10,
    fontWeight: 800,
  },
  body: {
    color: "#3E3627",
    fontSize: 14,
    padding: 10,
    lineHeight: 15,
    textAlign: "center",
    justifyContent: "center",
    fontWeight: 600,
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    width: 180,
    borderRadius: 20,
    height: 50,
    marginTop: 10,
  },
  btn_text: {
    color: "#3E3627",
    fontWeight: "bold",
  },
});
