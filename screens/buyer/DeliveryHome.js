import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

import Button from "../../components/Button";
import { FIRESTORE_DB } from "../../utils/firebaseConfig";
import Header from "../../components/Header";
import OrderDetails from "../seller/OrderDetails";
import { colors } from "../../utils/constants";
import useStore from "../../utils/appStore";

const DeliveryHome = ({ navigation }) => {
  const [order, setOrder] = useState([]);
  const user = useStore((state) => state.user);
  const [rider, setRider] = useState({});
  useEffect(() => {
    getOrder();
  }, []);

  const getOrder = async () => {
    const q = query(
      collection(FIRESTORE_DB, "orders"),
      where("user_id", "==", user.userid),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);
    const neworders = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      //console.log(doc.id, " => ", doc.data());
      neworders.push({ ...doc.data(), orderid: doc.id });
    });
    const docRef = collection(FIRESTORE_DB, "rider_list");
    const docSnap = await getDocs(docRef);
    docSnap.forEach((res) => {
      if (res.data().orderid == neworders[0].orderid) {
        //    console.log("Rider Details: ", res.data());
        setRider(res);
      }
    });
    setOrder(neworders);
  };
  const getColor = (status) => {
    if (status == 3) {
      return colors.dragon;
    } else if (status == 2) {
      return colors.primary;
    } else if (status == 1) {
      return colors.mango;
    } else {
      return colors.headerText;
    }
  };

  const getStatus = (status) => {
    if (status == 3) {
      return "Cancelled";
    } else if (status == 2) {
      return "Delivered";
    } else if (status == 1) {
      return "Out for Delivery";
    } else {
      return "Pending";
    }
  };

  console.log(order);
  return (
    <>
      {/* {order[0].status != undefined ? ( */}
      <SafeAreaView style={styles.container}>
        <Header what={"Cart"} onPress={() => navigation.goBack()} />
        <View style={styles.cartBox}>
          <Text style={styles.title}>Delivery Status</Text>
          {order.length == 0 ? (
            <Text></Text>
          ) : (
            <Text style={styles.orderText}>
              Your order is {getStatus(order[0].status)}!
            </Text>
          )}
          {order.length == 0 ? (
            <Text>No Current Orders</Text>
          ) : (
            <View style={styles.infoBox}>
              <Text style={styles.text}>
                <Text style={styles.head}>
                  {order.length > 0 && order[0].storename}
                </Text>{" "}
                has set your order as{" "}
                <Text
                  style={[styles.status, { color: getColor(order[0].status) }]}
                >
                  {order.length > 0 && getStatus(order[0].status)}
                </Text>
                .
              </Text>

              <Text style={styles.text}></Text>
              <Text style={styles.text}>
                Delivery Rider:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {rider.data().riderDetails.name}
                </Text>
              </Text>
              <Text style={styles.text}>
                Contact Number:{" "}
                <Text style={{ fontWeight: "bold" }}>
                  {rider.data().riderDetails.contactNo}
                </Text>
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={[styles.button, { width: 150, backgroundColor: "#21C622" }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttontxt}>Back to Home</Text>
          </TouchableOpacity>
          {/* <View><Button color={colors.primary} text="Back to Home" textColor="white" onPress={()=>navigation.goBack()}/></View> */}
        </View>
      </SafeAreaView>
      {/* ) : (
        <SafeAreaView style={styles.container}>
          <Header what={"Cart"} onPress={() => navigation.goBack()} />
          <View style={styles.cartBox}>
            <Text style={{ textAlign: "center" }}>
              No Current Order on Delivery
            </Text>
            <TouchableOpacity
              style={[
                styles.button,
                { width: 150, backgroundColor: "#21C622" },
              ]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttontxt}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )} */}
      {/* <StatusBar backgroundColor={"#21C622"} barStyle={'light-content'} /> */}
    </>
  );
};

export default DeliveryHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  cartBox: {
    width: "100%",
    flex: 1,
    gap: 20,
    justifyContent: "space-around",
    alignItems: "center",
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
  buttontxt: {
    fontWeight: "bold",
    color: "#FFFFFF",
    fontSize: 14,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary,
    lineHeight: 25,
  },
  orderText: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: colors.headerText,
    lineHeight: 50,
  },
  infoBox: {
    width: 300,
    marginTop: 0,
    marginTop: 0,
    marginLeft: "auto",
    marginRight: "auto",
    height: 200,
    backgroundColor: "rgba(33, 198, 34, 0.3)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    color: colors.headerText,
    lineHeight: 18,
    lineHeight: 25,
  },
  head: {
    color: colors.headerText,
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 30,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
