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
// import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { FIRESTORE_DB } from "../../utils/firebaseConfig";
import FruitCard from "../../components/FruitCard";
import FruitCard_Whatspop from "../../components/FruitCard_Whatspop";
import Header_Home from "../../components/Header_Home";
import Search_Home from "../../components/Search_Home";
// import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/Feather";
import ProductCard from "../../components/ProductCard";
import apple from "../../assets/images/fruits/apple.png";
import avocado from "../../assets/images/fruits/avocado.png";
import banana from "../../assets/images/fruits/banana.png";
import bg from "../../assets/images/seller.jpg";
import vege from "../../assets/images/vege.png";
// import sellerss from "../../assets/kuya_buko.png";
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
// import retailer from "../../assets/images/retailer.png";
import strawberry from "../../assets/images/fruits/strawberry.png";
import useStore from "../../utils/appStore";
import watermelon from "../../assets/images/fruits/watermelon.png";
// import wholesale from "../../assets/images/wholesale.png";

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
        <Header_Home/>  
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
                  Conveniently deliver farm-fresh produce straight to your door with just one tap. Enjoy high-quality fruits and vegetables at your fingertips.
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
          <Search_Home
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
          <>
          <Text style={styles.headline2}>Browse by category</Text><View style={{ height: 100 }}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 100,
                    paddingLeft: 10,
                  }}
                  data={fruits}
                  renderItem={({ item, index }) => (
                    <FruitCard navigation={navigation} key={index} {...item} />
                  )}
                  keyExtractor={(item) => item.id} />
              </View><Text style={styles.headline2}>What's Popular?</Text><Text style={{ color: "#3E3627", fontSize: 14, paddingLeft: 20 }}>
                  Check out what our shoppers are buying
                </Text>
            {/* <ScrollView showsVerticalScrollIndicator={false}> */}
            <View style={styles.fruitContainer}>
              <FruitCard_Whatspop
                color="rgba(173, 11, 5, 0.4)"
                image={strawberry}
                fruit="Strawberry"
              />
              <FruitCard_Whatspop
                color="rgba(233, 198, 64, 0.4)"
                image={banana}
                fruit="Banana"
              />
              <FruitCard_Whatspop
                color="rgba(242, 154, 143, 0.4)"
                image={watermelon}
                fruit="Watermelon"
              />
              <FruitCard_Whatspop
                color="rgba(94, 174, 13, 0.4)"
                image={guava}
                fruit="Guava"
              />

              <FruitCard_Whatspop
                color="rgba(251, 255, 32, 0.4)"
                image={mango}
                fruit="Mango"
              />
              <FruitCard_Whatspop
                color="rgba(193, 208, 59, 0.4)"
                image={kiwi}
                fruit="Kiwi"
              />
              <FruitCard_Whatspop
                color="rgba(240, 120, 3, 0.4)"
                image={papaya}
                fruit="Papaya"
              />
              <FruitCard_Whatspop
                color="rgba(207, 6, 6, 0.4)"
                image={apple}
                fruit="Apple"
              />

              <FruitCard_Whatspop
                color="rgba(133, 55, 72, 0.4)"
                image={mangosteen}
                fruit="Mangosteen"
              />
              <FruitCard_Whatspop
                color="rgba(223, 54, 92, 0.4)"
                image={dragon}
                fruit="DragonFruit"
              />
              <FruitCard_Whatspop
                color="rgba(155, 213, 60, 0.4)"
                image={avocado}
                fruit="Avocado"
              />
              <FruitCard_Whatspop
                color="rgba(249, 254, 5, 0.4)"
                image={lemon}
                fruit="Lemon"
              />
            </View>
            {/* </ScrollView> */}
            </>
          )}
        </ScrollView>

        
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
    marginTop: 10,
  },
  headline: {
    color: colors.headerText,
    fontSize: 40,
    fontWeight: '900',
    width: 300,
    marginBottom: 10,
  },
  description: {
    color: colors.headerText,
  },
  headline2: {
    color: colors.headerText,
    fontSize: 30,
    fontWeight: '900',
    width: 300,
    marginBottom: 10,
    margin: 20,
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
    marginTop: 15,
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
    fontSize: 14,
  },
  fruitContainer:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
});
