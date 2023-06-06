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
  
  const Search = ({
    onPress,
    hasSearch = true,
    origList,
    cloneList,
    setOrigList,
    what,
  }) => {
    // const navigation = useNavigation();
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
      <View style={styles.container}>
        <View style={styles.searchBar}>
            <View style={styles.search}>
              <Icon name="search" size={20} color="white" />
              <TextInput
                onChangeText={(text) => {
                  //    console.log(text);
                  searchItem(text, origList, cloneList, setOrigList);
                }}
                style={styles.input}
                placeholder="Search Store"
                placeholderTextColor="white"
              />
            </View>
        </View>
      </View>
    );
  };
  
export default Search;
  
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    alignItems: 'center',
    // marginTop: 20,
    backgroundColor: 'white',
    paddingBottom: 20,
  },
  searchBar: {
    // flex: 1,
    backgroundColor: '#3E3627',
    opacity: .7,
    width: 300,
    height: 40,
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 10,

  }
});
  