import * as Location from "expo-location";

import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { FIRESTORE_DB } from "../../utils/firebaseConfig";
import Header from "../../components/Header";
import Search from "../../components/Search";
import SellerCard from "../../components/SellerCard";
import { colors } from "../../utils/constants";
import fallback from "../../assets/images/fallback.png";
import { useIsFocused } from "@react-navigation/native";
import useStore from "../../utils/appStore";
import { SearchBar } from "react-native-screens";

const SellerList = ({ navigation }) => {
  const [active, setActive] = useState("w");
  const userRef = collection(FIRESTORE_DB, "users");
  const [sellers, setSellers] = useState([]);
  const [sellers_clone, setSellers_clone] = useState([]);
  const isFocused = useIsFocused();
  const [isSeeMap, setIsSeeMap] = useState(false);
  const [location, setLocation] = useState({ lat: 14.4445, long: 120.9939 });
  useEffect(() => {
    getSellers();
  }, [active, isFocused]);

  const getSellers = async () => {
    // Create a query against the collection.
    const type = active === "w" ? 3 : 2;
    const q = query(userRef, where("userType", "==", type));
    const querySnapshot = await getDocs(q);
    const seller_data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      seller_data.push({ ...doc.data(), seller_id: doc.id });
    });
    setSellers(seller_data);
    setSellers_clone(seller_data);
  };
  // console.log(sellers);
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

      //console.log(location);
    })();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        origList={sellers}
        cloneList={sellers_clone}
        setOrigList={setSellers}
        onPress={() => navigation.goBack()}
      />
      <>
      <View style={styles.title}>
        <Text style={styles.textHeader}>Stores</Text>
      </View>
        <View style={styles.tabs}>
          <Pressable
            onPress={() => setActive("w")}
            style={[
              styles.tab,
              {
                color: active == "w" ? "white" : colors.primary,
                backgroundColor: active == "w" ? colors.primary : "white",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: active == "w" ? "white" : colors.primary,
              }}
            >
              Wholesaler
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActive("r")}
            style={[
              styles.tab,
              {
                color: active == "r" ? "white" : colors.primary,
                backgroundColor: active == "r" ? colors.primary : "white",
              },
            ]}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: active == "r" ? "white" : colors.primary,
              }}
            >
              Retailer
            </Text>
          </Pressable>
        </View>
        <Search
          origList={sellers}
          cloneList={sellers_clone}
          setOrigList={setSellers}
          // onPress={() => navigation.goBack()}
        />        
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            // alignItems: "center",
            // gap: 20,
            paddingTop: 10,
            backgroundColor: "#f2f3f4",
          }}
        >
          {sellers.length == 0 && <Text>No Sellers Available!</Text>}

          {sellers.map((seller, i) => (
            <SellerCard
              key={i}
              image={seller.pic.toString() || fallback}
              name={seller.storename}
              block={seller.block}
              barangay={seller.barangay}
              province={seller.province}
              city={seller.city}
              onPress={() =>
                navigation.navigate("SellerProfile", {
                  sellerid: seller.seller_id,
                })
              }
            />
          ))}
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

export default SellerList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    // width: 300,
    // margin: 20,
    alignItems: 'center',
  },
  textHeader: {
    color: '#3E3627',
    fontSize: 30,
    fontWeight: '900',
    textTransform : 'uppercase',
  },
  tabs: {
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: "white",
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  tab: {
    height: 35,
    width: 152,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});
