import { SafeAreaView, StyleSheet, Text, StatusBar, View,ImageBackground, TextInput,useWindowDimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import userplaceholder from '../../assets/images/user.png'
import { colors } from '../../utils/constants'
import Button from '../../components/Button'
import useStore from '../../utils/appStore'
import {STORAGE,FIRESTORE_DB } from '../../utils/firebaseConfig';
import  Icon  from 'react-native-vector-icons/AntDesign'
import { useToast } from 'react-native-toast-notifications'
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadString,getDownloadURL, uploadBytes} from "firebase/storage";
import randomstring from 'randomstring'
import { doc, setDoc} from "firebase/firestore"; 

const ProfileView = ({navigation}) => {
    const user = useStore((state)=>state.user)
    const setUserProfile = useStore((state)=>state.setUserProfile)
    const toast = useToast()

    const pickImage = async  () => {
       
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
       console.log(user)

       console.log(result.assets[0].uri)
        if (result.assets[0].uri) {
         
          const name = randomstring.generate({
            length: 10,
            charset: 'alphabetic'
            
          }
          )
          const response = await fetch(result.assets[0].uri);
         const blob = await response.blob();
         console.log(blob);


          console.log(name)
          const storageRef = ref(STORAGE,`users/${name}`)
          const snapshot =  await uploadBytes(storageRef, blob)
        //   const snapshot =  await uploadString(storageRef,result.assets[0].uri,'data_url')
          console.log(snapshot)
          const url = await getDownloadURL(storageRef)
          
          try {
            // const updatedCartItem = {
            //     ...prod,
            //     count: prod.count + 1,
            //   };
              const res = await setDoc(doc(FIRESTORE_DB,"users",user.userid),{
                pic : url
               
            },{ merge: true })
            setUserProfile("pic",url)
            toast.show('Profile Pic Updated!!',{
                type: "success",
                placement: "bottom",
                duration: 2000,
                offset: 30,
                animationType: "slide-in",
              })    
    
            navigation.navigate('Profile')
        } catch (error) {
            console.log(error)
        }
            
        }
}


  return (
    <><StatusBar backgroundColor={"#21C622"} barStyle={'light-content'} />
    <SafeAreaView style={styles.container}>
          <View style={styles.profileContainer}>
              <View style={styles.imgBox}>
                  <ImageBackground
                      source={{ uri: user.pic.toString() } || userplaceholder}
                      resizeMode="cover"
                      style={styles.img}
                  ></ImageBackground>
                  <TouchableOpacity onPress={pickImage} style={styles.icon}>
                      <Icon name="edit" size={30} color={colors.primary} />
                  </TouchableOpacity>
              </View>
              <Input label="Name" text={`${user.fname} ${user.lname}`} />
              <Input label="Email" text={user.email} isVerified />
              <Input label="Password" text={user.cpass} isPassword />
              <Input label="Mobile Number" text={user.mobile} />
              <Input label="Address" text={`${user.block} ${user.barangay} ${user.city} ${user.province}`} multiline />

              <View style={styles.footer}>
                  <TouchableOpacity onPress={() => navigation.navigate('UpdateProfile')} style={[styles.button, { width: 150, backgroundColor: '#21C622' }]}>
                      <Text style={styles.btntxt}>Update Profile</Text>
                  </TouchableOpacity>
                  {/* <Button onPress={()=>navigation.navigate('UpdateProfile')} color={colors.primary} text="Update Profile" textColor="white"/> */}
              </View>
          </View>
      </SafeAreaView></>
  )
}

const Input =({label,text,isVerified,isModify,isPassword,multiline})=>{
    const {width} = useWindowDimensions()

    const convertText=(text)=>{
        const array = text.split("")
        const newText = array.map((i)=>"*").join("")
        return newText
    }
    return (
    <View style={[styles.input,{width : width * .95,height : multiline ? 90 : 60}]}>
        <View style={{flex : 1}}>
            <Text style={styles.label}>{label}</Text>
            {isPassword ? <Text style={styles.txtbox}>{convertText(text)}</Text> :
            <Text style={styles.txtbox}>{text}</Text>}
        </View>
           { isModify && <TouchableOpacity style={styles.modify}>
                <Text style={styles.modifyText}>Modify</Text>
            </TouchableOpacity>}
            {
                isVerified &&
            <Text style={styles.verified}>Verified</Text>
            }
            
       
    </View>
    )
}

export default ProfileView

const styles = StyleSheet.create({
    container :{
        flex :1,
        backgroundColor : colors.primary,
    },
    profileContainer:{
        flex :1,
        backgroundColor : 'white',
        paddingHorizontal : 10,
        position : 'relative',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    img:{
        width : 100,
        height : 100,
        borderRadius : 50,
        position : 'relative',
        overflow: 'hidden',
    },
    imgBox :{
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        paddingHorizontal :20,
        paddingVertical : 20,
        
    },
    icon :{
        position : 'absolute',
        bottom : 20,
        right : 140,
    },
    input :{
        marginVertical : 0,
        marginHorizontal : 'auto',
        
        borderColor : '#AFAFAF',
        borderStyle :'solid',
        borderWidth : 1,
        paddingVertical : 5,
        paddingHorizontal : 10,
        borderRadius : 10,
        alignItems : 'center',
        flexDirection : 'row',
        marginBottom : 10

       
    },
    label : {
        fontSize : 14,
        color : '#656565',
        lineHeight : 16,
        marginBottom : 5
    },
    txtbox : {
       
        fontSize : 16,
        fontWeight : 'bold',
        lineHeight : 16,
        color : colors.headerText

    },
    verified : {
        fontSize : 14,
        lineHeight:16,
        fontWeight : 'bold',
        color : colors.primary,
        paddingHorizontal : 20
    },
    space : {
        paddingHorizontal : 20
    },
    modify : {
        width : 84,
        height : 30,
        borderRadius : 15,
        backgroundColor : colors.primary,
        alignItems : 'center',
        justifyContent : 'center'
    },
    modifyText :{
        color : 'white',
        fontSize : 14,
        lineHeight : 14,
        fontWeight : 'bold'
    },
    footer : {
       
        width : '100%',
        paddingBottom : 10,
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row'
    },
    button:{
        zIndex : 10,
        marginVertical : 20,
        height : 50,
        borderRadius : 30,
        display : 'flex',
        alignItems: 'center',
        justifyContent : 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
      },
      btntxt:{
        fontWeight: 'bold',
        color: 'white',
      },
})