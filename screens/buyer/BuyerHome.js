import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { FIRESTORE_DB } from "../../utils/firebaseConfig";
import FruitCard from "../../components/FruitCard";
import FruitCard_Whatspop from "../../components/FruitCard_Whatspop";
import Header_Home from "../../components/Header_Home";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/Feather";
import ProductCard from "../../components/ProductCard";
import apple from "../../assets/images/fruits/apple.png";
import avocado from "../../assets/images/fruits/avocado.png";
import banana from "../../assets/images/fruits/banana.png";
import bg from "../../assets/images/seller.jpg";
import vege from "../../assets/images/vege.png";
import sellerss from "../../assets/kuya_buko.png";
import { colors } from "../../utils/constants";
import dragon from "../../assets/images/fruits/dragon-fruit.png";
import fallback from "../../assets/images/fallback.png";
import { fruits } from "../../utils/data";
import guava from "../../assets/images/fruits/guava.png";
import kiwi from "../../assets/images/fruits/kiwi.png";
import lemon from "../../assets/images/fruits/lemon.png";
import mango from "../../assets/images/fruits/mango.png";
import mangosteen from "../../assets/images/fruits/mangosteen.png";
import papaya from "../../assets/images/fruits/papaya.png";
import retailer from "../../assets/images/retailer.png";
import strawberry from "../../assets/images/fruits/strawberry.png";
import useStore from "../../utils/appStore";
import watermelon from "../../assets/images/fruits/watermelon.png";
import wholesale from "../../assets/images/wholesale.png";

const BuyerHome = ({ navigation }) => {
  const user = useStore((state) => state.user);
  const fetchCart = useStore((state) => state.fetchCart);
  const getTotalPrice = useStore((state) => state.getTotalPrice);
  const [prodList, setProdlist] = useState([]);
  const [prodList_, setProdlist_] = useState([]);
  useEffect(() => {}, []);
  useLayoutEffect(() => {
    fetchCart();
    getTotalPrice();
    const q = query(
      collection(FIRESTORE_DB, "products"),
      where("status", "==", "active")
    );
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        //resolve(querySnapshot)
        let list = [];
        querySnapshot.docs.forEach(async (res) => {
          const docRef = doc(FIRESTORE_DB, "users", res.data().userId);
          const docSnap = await getDoc(docRef);

          list.push({ storename: docSnap.data().storename, item: res.data() });
        });
        setProdlist_(list);

        //  console.log("DATA", list);
      },
      () => {
        return unsubscribe();
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);

  return (
    <>
      <StatusBar backgroundColor={"#fff"} barStyle={'dark-content'}/>
      <SafeAreaView style={styles.container}>
        <Header_Home
          origList={prodList}
          cloneList={prodList_}
          setOrigList={setProdlist}
        />
        {prodList != 0 ? (
          <>
            {/* <TouchableOpacity
              onPress={() => {
                setProdlist([]);
              }}
            >
              <Text>BACK</Text>
            </TouchableOpacity> */}
            <ScrollView showsVerticalScrollIndicator={false}>
              {prodList.map((prod, i) => (
                <ProductCard key={i} sname={prod.storename} {...prod.item} />
              ))}
            </ScrollView>
            
          </>
        ) : (  
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.browseStore}>
              <Image
                source={vege}
                style={styles.vegeBG}
                resizeMode="contain"
                ></Image>
              <View style={styles.textContainer}>
                <Text style={styles.headline}>Make a fresh food delivery</Text>
                <Text style={styles.description}>
                  Conveniently deliver farm-fresh produce straight to your door. Enjoy wholesome fruits and vegetables at your fingertips.
                </Text>
                <TouchableOpacity
                      onPress={() => navigation.navigate("SellerList")}
                      style={styles.bannerGo}
                    >
                      <Text style={styles.goText}>Browse Stores</Text>
                      <Icon2 name="arrow-right" size={20} color={'white'} />
                </TouchableOpacity>   
              </View>   
          </View>
        </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};

export default BuyerHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  browseStore:{
    flex: 1,
  },
  vegeBG: {
    // width: 400,
    height: 400,
    marginTop: 30,
  },
  headline: {
    color: colors.headerText,
    fontSize: 40,
    fontWeight: '900',
    width: 300,
    marginBottom: 10,
  },
  textContainer: {
    margin: 20,
    width: 320,
  },
  bannerGo: {
    display: "flex",
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
    margin: 15,
    padding: 15,
    borderRadius: 30,
    shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
  },
  goText: {
    color: 'white',
    marginHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
