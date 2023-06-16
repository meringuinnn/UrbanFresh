import {
    Pressable,
    StyleSheet,
    View,
    TouchableOpacity,
  } from "react-native";
  
import Icon2 from "react-native-vector-icons/Ionicons";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "../utils/constants";
import { useNavigation } from "@react-navigation/native";
  
const HeaderBackOnly = ({
    onPress,
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon2 name="arrow-back" size={25} style={{ color: 'white' }}/>
          </TouchableOpacity>     
        </View>
    </SafeAreaView>
);
};

export default HeaderBackOnly;
  
  const styles = StyleSheet.create({
    header: {
      display: "flex",
      height: 60,
      backgroundColor: colors.primary,
      width: "100%",
      flexDirection: "row",
      // gap : 20,
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 25,
    },
  });
  