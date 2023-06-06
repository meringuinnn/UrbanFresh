import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
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

import Button from "../../components/Button";
import { FIRESTORE_DB } from "../../utils/firebaseConfig";
import { SelectList } from "react-native-dropdown-select-list";
import { colors } from "../../utils/constants";
import useStore from "../../utils/appStore";
import { useToast } from "react-native-toast-notifications";

const AddRating = ({ route, navigation }) => {
  const { storeid } = route.params;
  const user = useStore((state) => state.user);
  const [rating, setRating] = useState(1);
  const toast = useToast();

  const data = [
    { key: 1, value: 1 },
    { key: 2, value: 2 },
    { key: 3, value: 3 },
    { key: 4, value: 4 },
    { key: 5, value: 5 },
  ];

  const onChangeType = async (val) => {
    setRating(val);
    console.log(val);
  };

  const handleAddRating = async () => {
    try {
      const res = await setDoc(
        doc(collection(FIRESTORE_DB, "ratings")),
        {
          storeid: storeid,
          userid: user.userid,
          rating: rating,
        },
        { merge: true }
      );
      toast.show("Successfully Added a Rating!!", {
        type: "success",
        placement: "bottom",
        duration: 2000,
        offset: 30,
        animationType: "slide-in",
      });
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <SelectList
          boxStyles={styles.select}
          dropdownStyles={styles.dropdown}
          defaultOption={{ key: 1, value: 1 }}
          setSelected={onChangeType}
          save="key"
          search={false}
          data={data}
          placeholder="Rating"
        />
        <Button
          onPress={handleAddRating}
          color={colors.primary}
          textColor="white"
          text="Add Rating"
        />
      </View>
    </SafeAreaView>
  );
};

export default AddRating;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  select: {
    border: "2px #21C622 solid",
    // outlineStyle : 'none',
    width: 294,
    borderRadius: 10,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  dropdown: {
    border: "2px #21C622 solid",
    // outlineStyle : 'none',
  },
});
