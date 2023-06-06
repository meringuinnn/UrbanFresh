import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

import { FIRESTORE_DB } from "../../utils/firebaseConfig";
import FavItem from "../../components/FavItem";
import Header from "../../components/Header";
import Header_fav from "../../components/Header_fav";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/AntDesign";
import { colors } from "../../utils/constants";
import useStore from "../../utils/appStore";

const Favorites = ({ navigation }) => {
  const user = useStore((state) => state.user);
  const setFaves = useStore((state) => state.setFaves);
  const [favorites, setFavorites] = useState([]);
  const [favorites_, setFavorites_] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useLayoutEffect(() => {
    getFaves();
  }, []);

  const getFaves = async () => {
    try {
      const q = query(
        collection(FIRESTORE_DB, "favorites"),
        where("userid", "==", user.userid)
      );
      const querySnapshot = await getDocs(q);
      const favs = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        favs.push({ ...doc.data(), storeid: doc.id });
      });
      setFavorites(favs);
      setFavorites_(favs);
      setFaves(favs);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(favorites);
  return (
    <SafeAreaView style={styles.container}>
      <Header_fav
        cloneList={favorites_}
        origList={favorites}
        setOrigList={setFavorites}
        onPress={() => navigation.goBack()}
      />
      <View style={styles.cartBox}>
        {/* <View style={{width:30,marginHorizontal : 20}}></View> */}
        <Text style={styles.title}>Favorites</Text>
        {/* {isDeleting  && <TouchableOpacity onPress={()=>setIsDeleting(!isDeleting)}>
                <Icon2 name="close" size={30} color='black' style={{marginHorizontal:20}}/>
              </TouchableOpacity> }
             { !isDeleting && <TouchableOpacity onPress={()=>setIsDeleting(!isDeleting)}>
                <Icon name="edit" size={30} color='black' style={{marginHorizontal:20}}/>
              </TouchableOpacity>} */}
      </View>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {favorites.length == 0 ? (
          <Text>No Favorites</Text>
        ) : (
          favorites.map((f, i) => (
            <FavItem
              key={i}
              {...f}
              isDeleting={isDeleting}
              getFaves={getFaves}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    lineHeight: 24,
  },
  contentContainer: {
    alignItems: "center",
    gap: 10,
  },
});
