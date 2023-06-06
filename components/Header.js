import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Icon from "react-native-vector-icons/Feather";
import Icon2 from "react-native-vector-icons/Ionicons";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native";
import { colors } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";

const Header = ({
  onPress,
  hasSearch = true,
  origList,
  cloneList,
  setOrigList,
  what,
}) => {
  const navigation = useNavigation();
  function searchItem(word, origList, cloneList, setOrigList) {
    try {
      if (word === "") {
        setOrigList(cloneList);
      } else {
        let arr = origList
          .filter((res) => {
            if (res.storename.toUpperCase().match(word.toUpperCase())) {
              console.log(res);
              return res;
            }
          })
          .map((res) => {
            return res;
          });
        setOrigList(arr);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <SafeAreaView>
      <View style={styles.header}>
        {onPress && (
          <Pressable onPress={onPress}>
            <Icon2 name="arrow-back" size={25} style={{ color: colors.primary }} />
          </Pressable>
        )}
        {/* {hasSearch ? (
          <View style={styles.search}>
            <Icon name="search" size={20} color="white" />
            <TextInput
              onChangeText={(text) => {
                //    console.log(text);
                searchItem(text, origList, cloneList, setOrigList);
              }}
              style={styles.input}
              placeholder="Search Product"
              placeholderTextColor="white"
            />
          </View>
        ) : (
          <View style={styles.spacer}></View>
        )} */}
        <View style={styles.rightPart}>
          <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
            <Icon name="heart" size={20} style={{ padding: 20, color: colors.primary }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Icon name="shopping-cart" size={20} style={{ color: colors.primary }}/>
          </TouchableOpacity>          
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    height: 60,
    backgroundColor: 'white',
    width: "100%",
    flexDirection: "row",
    // gap : 20,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
  },
  rightPart: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  // search: {
  //   display: "flex",
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "flex-start",
  //   flex: 1,

  //   backgroundColor: "#3E3627",
  //   border: "1px solid  #FFFFFF",
  //   borderRadius: 7,
  //   gap: 10,
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  // },
  // spacer: {
  //   flex: 1,
  // },
  // input: {
  //   flex: 1,
  //   height: "100%",
  //   outlineStyle: "none",
  //   color: "#FFFFFF",
  // },
});
