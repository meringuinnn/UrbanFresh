import {
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import Button from "../../components/Button";
import { FIRESTORE_DB } from "../../utils/firebaseConfig";
import Header from "../../components/Header";
import Icon from "react-native-vector-icons/AntDesign";
import Inputseller from "../../components/Inputseller";
import { colors } from "../../utils/constants";
import fallback from "../../assets/images/fallback.png";
import useStore from "../../utils/appStore";
import { useToast } from "react-native-toast-notifications";

const OrderDetails = ({ navigation, route }) => {
  const user = useStore((state) => state.user);
  const { order } = route.params;
  const [client, setClient] = useState({});
  const [rider, setRider] = useState({});
  const toast = useToast();

  useEffect(() => {
    getOrder();
    if (order.status == 1) {
      getRiderID();
    }
  }, []);
  const getRiderID = async () => {
    const docRef = collection(FIRESTORE_DB, "rider_list");
    const docSnap = await getDocs(docRef);
    docSnap.forEach((res) => {
      if (res.data().orderid == order.orderid) {
        console.log("Rider Details: ", res.data());
        setRider(res);
      }
    });
    // if (docSnap.exists()) {
    //   console.log("Document data:", docSnap.data());
    //   setClient(docSnap.data());
    // } else {
    //   // docSnap.data() will be undefined in this case
    //   console.log("No such document!");
    // }
  };
  const getOrder = async () => {
    const docRef = doc(FIRESTORE_DB, "users", order.user_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setClient(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  const getTotalPrice = () => {
    return order.orders.reduce((acc, item) => {
      return acc + (item.price * item.count + item.shipping);
    }, 0);
  };

  const getTotalShipping = () => {
    return order.orders.reduce((acc, item) => {
      return acc + item.shipping;
    }, 0);
  };
  const [isModal, setIsModal] = useState(false);

  const handlePaid = async (orderid) => {
    try {
      // const updatedCartItem = {
      //     ...prod,
      //     count: prod.count + 1,
      //   };
      const Ref = collection(FIRESTORE_DB, "rider_list");
      await addDoc(Ref, {
        riderDetails,
        orderid,
        status: "On Delivery",
        timeStamp: new Date().toString(),
        toUserID: order.user_id,
      });
      const res = await setDoc(
        doc(FIRESTORE_DB, "orders", orderid),
        {
          status: 1,
        },
        { merge: true }
      );

      order.orders.map(async (p, i) => {
        const res = await setDoc(
          doc(FIRESTORE_DB, "products", p.prod_id),
          {
            stock: increment(-p.count),
          },
          { merge: true }
        );
      });

      toast.show("Order Status Updated", {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "slide-in",
      });
      setIsModal(false);
      navigation.navigate("SalesHome");
    } catch (error) {
      console.log(error);
    }
  };
  const setDone = async () => {
    const listRef = doc(FIRESTORE_DB, "/rider_list", rider.id);
    updateDoc(listRef, {
      status: "Delivered",
      timeStampDelivered: new Date().toString(),
    });
    const res = await setDoc(
      doc(FIRESTORE_DB, "orders", orderid),
      {
        status: 2,
      },
      { merge: true }
    );

    alert("Order Done!");
  };
  const handleDelivered = async (orderid) => {
    try {
      // const updatedCartItem = {
      //     ...prod,
      //     count: prod.count + 1,
      //   };
      const res = await setDoc(
        doc(FIRESTORE_DB, "orders", orderid),
        {
          status: 2,
        },
        { merge: true }
      );

      toast.show("Order Status Updated", {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "slide-in",
      });

      navigation.navigate("SalesHome");
    } catch (error) {
      console.log(error);
    }
  };
  const [riderDetails, setRiderDetails] = useState({
    name: "",
    contactNo: "",
    plateNo: "",
    vehicleDescription: "",
    fee: 0,
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.linkBox}>
          <View style={styles.orderBox}>
            <Text style={styles.orderText}>Order ID:</Text>
            <Text style={styles.number}>{order.orderid.slice(0, 7)}</Text>
          </View>
        </View>

        <View style={styles.linkBox}>
          <View style={styles.orderBox}>
            <Text style={styles.orderText}>Delivery Address:</Text>
            <Text style={styles.normal}>
              {client.fname} {client.lname}
            </Text>
            <Text style={styles.normal}>{client.mobile}</Text>
            <Text style={styles.normal}>
              {client.block || ""} {client.barangay || ""} {client.city || ""}{" "}
              {client.province || ""} {client.zipcode || ""}
            </Text>
          </View>
        </View>
        {order.orders.map((ord, i) => (
          <ProductCard key={i} {...ord} />
        ))}

        <View style={styles.linkBox2}>
          <Text style={{ fontSize: 16 }}>Shipping Fee</Text>
          <Text style={{ fontSize: 16 }}>PHP {getTotalShipping()}</Text>
        </View>
        <View style={styles.linkBox2}>
          <Text style={{ fontSize: 16 }}>Order Total</Text>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            PHP {getTotalPrice()}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          {order.status == 0 ? (
            <Button
              text="Approve Order"
              color={colors.primary}
              textColor="white"
              onPress={() => {
                setIsModal(true);
                //handlePaid(order.orderid)
              }}
            />
          ) : (
            <Button
              text="Set Done"
              color={colors.primary}
              textColor="white"
              onPress={() => {
                setDone();
                //handlePaid(order.orderid)
              }}
            />
          )}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModal}
        onRequestClose={() => {
          setIsModal(!isModal);
        }}
      >
        <View style={styles.container}>
          <View style={{ marginTop: 10 }}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Setup Rider Details
            </Text>

            <Inputseller
              label="Enter name"
              inputTitle="Name"
              onChangeText={(text) => {
                setRiderDetails((prev) => ({ ...prev, name: text }));
              }}
              text={user.city || ""}
              placeholder={"Enter name"}
            />
            <Inputseller
              label="Contact (11 Digits)"
              inputTitle="Contact No. (11 Digits)"
              onChangeText={(text) => {
                setRiderDetails((prev) => ({ ...prev, contactNo: text }));
              }}
              text={user.city || ""}
              placeholder={"09XXXXXXXXX"}
            />
            <Inputseller
              label="Plate No."
              inputTitle="Vehicle Plate No. "
              onChangeText={(text) => {
                setRiderDetails((prev) => ({ ...prev, plateNo: text }));
              }}
              text={user.city || ""}
              placeholder={"Enter plate no."}
            />
            <Inputseller
              label="Vehicle Description"
              inputTitle="Vehicle Description "
              onChangeText={(text) => {
                setRiderDetails((prev) => ({
                  ...prev,
                  vehicleDescription: text,
                }));
              }}
              multiline={true}
              text={user.city || ""}
              placeholder={"Enter description"}
            />
            <Inputseller
              label="Transpo Fee"
              inputTitle="Transportation Fee"
              onChangeText={(text) => {
                setRiderDetails((prev) => ({
                  ...prev,
                  fee: text,
                }));
              }}
              multiline={true}
              text={user.city || ""}
              placeholder={"Enter transportation fee"}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button
              text="Cancel"
              color={colors.dragon}
              textColor="white"
              onPress={() => {
                setIsModal(false);
              }}
            />
            <Button
              text="Deliver"
              color={colors.primary}
              textColor="white"
              onPress={() => {
                handlePaid(order.orderid);
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const ProductCard = ({ pic, name, count, price, shipping }) => {
  return (
    <View style={styles.productCard}>
      <Image
        source={{ uri: pic[0] } || fallback}
        resizeMode="cover"
        style={{
          height: 70,
          width: 70,
        }}
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 14 }}>{name}</Text>
        <Text>PHP {price}</Text>
      </View>
      <Text>x {count}</Text>
    </View>
  );
};

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  productCard: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
    gap: 10,
  },
  orderBox: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: 200,
    gap: 5,
  },
  amount: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
  },
  number: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  normal: {
    fontSize: 14,
    color: "#656565",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  count: {
    fontSize: 18,

    color: "black",
  },
  linkText: {
    fontSize: 16,
    color: colors.headerText,
    lineHeight: 24,
  },
  linkBox: {
    width: "100%",
    height: 100,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    borderColor: "#D6D6D6",
    borderWidth: 1,
  },
  linkBox2: {
    width: "100%",
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#D6D6D6",
    borderWidth: 1,
  },
});
