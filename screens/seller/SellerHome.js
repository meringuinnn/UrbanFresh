import {
  Image,
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
import React, { useLayoutEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import Button from "../../components/Button";
import { FIRESTORE_DB } from "../../utils/firebaseConfig";
import Header2 from "../../components/Header2";
import Icon from "react-native-vector-icons/AntDesign";
import SellerStats from "../../components/SellerStats";
import { colors } from "../../utils/constants";
import { useIsFocused } from "@react-navigation/native";
import useStore from "../../utils/appStore";
import { useToast } from "react-native-toast-notifications";

const SellerHome = ({ navigation }) => {
  const user = useStore((state) => state.user);
  const [tab, setTab] = useState("l");
  const [ltab, setLtab] = useState("r");
  const productRef = collection(FIRESTORE_DB, "products");
  const [products, setProducts] = useState([]);
  const isFocused = useIsFocused();
  const [orders, setOrders] = useState([]);

  useLayoutEffect(() => {
    getProducts();
  }, [tab, isFocused]);

  useLayoutEffect(() => {
    getOrders();
  }, []);

  const getProducts = async () => {
    // Create a query against the collection.
    const condition = tab == "l" ? ">" : "==";

    const q = query(
      productRef,
      where("userId", "==", user.userid),
      where("stock", condition, 0)
    );
    const querySnapshot = await getDocs(q);
    const prod_data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      prod_data.push({ ...doc.data(), prod_id: doc.id });
    });
    setProducts(prod_data);
  };

  const getOrders = async () => {
    const q = query(
      collection(FIRESTORE_DB, "orders"),
      where("storeid", "==", user.userid)
    );

    const querySnapshot = await getDocs(q);
    const orders = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      orders.push({ ...doc.data(), orderid: doc.id });
    });

    setOrders(orders);
    console.log(orders);
  };

  return (
    <><StatusBar backgroundColor={'#21C622'} />
    <SafeAreaView style={styles.container}>
      <Header2 name={user.storename} />
      <SellerStats orders={orders} />
      <View style={styles.header}>
        <Text style={styles.headerText}>My Products  </Text>
        <View style={styles.line}></View>
      </View>

      <View style={styles.tabBox}>
        <TouchableOpacity
          onPress={() => setTab("l")}
          style={[
            styles.tab,
            { borderBottomColor: tab == "l" && colors.primary },
          ]}
        >
          <Text
            style={[styles.tabText, { color: tab == "l" && colors.primary }]}
          >
            Live
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setTab("s")}
          style={[
            styles.tab,
            { borderBottomColor: tab == "s" && colors.primary },
          ]}
        >
          <Text
            style={[styles.tabText, { color: tab == "s" && colors.primary }]}
          >
            Sold Out
          </Text>
        </TouchableOpacity>
      </View>

      {/* {tab === "l" && (
      <View style={styles.tabBox}>
        <TouchableOpacity
          onPress={() => setLtab("r")}
          style={[
            styles.tab,
            { borderBottomColor: ltab == "r" && colors.primary },
          ]}
        >
          <Text
            style={[styles.tabText, { color: ltab == "r" && colors.primary }]}
          >
            Recent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setLtab("st")}
          style={[
            styles.tab,
            { borderBottomColor: ltab == "st" && colors.primary },
          ]}
        >
          <Text
            style={[
              styles.tabText,
              { color: ltab == "st" && colors.primary },
            ]}
          >
            Stock
          </Text>
        </TouchableOpacity>
      </View>
    )} */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {products.length == 0 && (
          <Text style={styles.headerText}>No Products</Text>
        )}
        <View style={styles.contentContainer}>
          {products.map((prod, i) => (
            <ProductCard
              navigation={navigation}
              getProducts={getProducts}
              key={i}
              {...prod} />
          ))}  
        </View>
      </ScrollView>
      <View style={styles.btnBox}>
        <Button
          text="Add Product"
          color={colors.primary}
          onPress={() => navigation.navigate("AddProduct")}
          textColor="white" />
      </View>
    </SafeAreaView></>
  );
};

const ProductCard = ({
  pic,
  name,
  desc,
  price,
  unit,
  stock,
  prod_id,
  status,
  shipping,
  getProducts,
  navigation,
  remarks_removed,
}) => {
  const { height, width } = useWindowDimensions();
  const toast = useToast();

  const handleDelete = async () => {
    try {
      const res = await deleteDoc(doc(FIRESTORE_DB, "products", prod_id));

      toast.show("Product Deleted.", {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "slide-in",
      });
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
      style={[
        styles.card,
        {
          width: width * 0.95,
          backgroundColor: status == "archived" ? "#ffcccb" : "white",
        },
      ]}
      onPress={() => {
        if (status == "archived") {
          alert("Admin Remarks: " + remarks_removed);
        }
      }}
    >
      <Image
        source={{ uri: pic[0] }}
        resizeMode="cover"
        style={{
          height: 90,
          width: 90,
        }}
      />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
        <Text style={styles.price}>
          PHP {price} per
          {unit == 1
            ? " Kilo"
            : unit == 2
            ? " 100 grams"
            : unit == 3
            ? " pack"
            : unit == 4
            ? " 10kilos"
            : " Kaing (30 kg)"}
        </Text>
        <Text style={styles.price}>Stock: {stock}</Text>
      </View>
      <View style={styles.actions}>
        {status == "archived" ? (
          <Text style={{ color: "red" }}>REMOVED</Text>
        ) : null}
        {status == "archived" ? null : (
          <>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("EditProduct", {
                  prod_id,
                  name,
                  desc,
                  unit,
                  price,
                  stock,
                  shipping,
                  pic,
                })
              }
            >
              <Icon name="edit" size={20} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete}>
              <Icon name="delete" size={20} color={colors.primary} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default SellerHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    // paddingTop: Platform.OS === "android" ? 25 : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    // gap: 20,
    paddingHorizontal: 20,
    marginBottom: 10,
    // marginTop: 20,
  },
  contentContainer:{
    paddingBottom: 90,
  },
  headerText: {
    fontSize: 14,
    color: colors.headerText,
  },
  line: {
    flex: 1,
    borderBottomStyle: "solid",
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
  },
  tabBox: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "#dfdfdf",
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
  },
  tabText: {
    color: "black",
    fontSize: 12,
  },
  // liveBox: {
  //   width: "100%",
  //   flex: 1,
  // },
  btnBox: {
    position: 'absolute', 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 20,
    // top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
  },
  card: {
    height: 120,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    color: colors.headerText,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "bold",
  },
  desc: {
    color: "black",
    fontSize: 14,
    lineHeight: 14,
  },
  price: {
    color: "black",
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: 100,
  },
});
