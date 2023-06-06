import { StyleSheet, Text, View,SafeAreaView,useWindowDimensions, TextInput,TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '../../utils/constants'
import Button from '../../components/Button'
import useStore from '../../utils/appStore'
import { FIRESTORE_DB } from '../../utils/firebaseConfig';
import { addDoc, doc, setDoc,collection } from "firebase/firestore"; 
import { useToast } from "react-native-toast-notifications";

const UpdateProfileS = ({navigation}) => {
    const user = useStore((state)=>state.user)
    const setUserProfile = useStore((state)=>state.setUserProfile)
    const toast = useToast();


    const handleUpdate= async ()=>{
        try {
            const userRef = doc(FIRESTORE_DB, 'users',user.userid);
          const res  = await setDoc(userRef,{
            pic : user.pic,
            storename : user.storename,
            email : user.email,
            cpass : user.cpass,
            mobile: user.mobile,
            block: user.block,
            barangay : user.barangay,
            city : user.city,
            province : user.province,
            zipcode : user.zipcode,
            userType : user.userType
           
        })
        console.log(res)
        toast.show('Changes saved.',{
          type: "success",
          placement: "bottom",
          duration: 2000,
          offset: 30,
          animationType: "slide-in",
        })
          navigation.navigate('ProfileViewS')
        } catch (error) {
          toast.show(error,{
            type: "danger",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "slide-in",
          })
        }
    }

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
            showsHorizontalScrollIndicator={false}
        >
        <View style={styles.header}>
            <Text style={styles.headerText}>Store Name</Text>
            <View style={styles.line}></View>
      </View>
      <Input label="Store Name" onChangeText={(text)=>setUserProfile('storename',text)} text={user.storename} />
     
      <View style={styles.header}>
            <Text style={styles.headerText}>Email Address</Text>
            <View style={styles.line}></View>
      </View>
      <Input label="Email Address" onChangeText={(text)=>setUserProfile('email',text)} text={user.email} />
      <View style={styles.header}>
            <Text style={styles.headerText}>Mobile Number</Text>
            <View style={styles.line}></View>
      </View>
      <Input label="Mobile Number" onChangeText={(text)=>setUserProfile('mobile',text)} text={user.mobile}isVerify />
      <View style={styles.header}>
            <Text style={styles.headerText}>Address</Text>
            <View style={styles.line}></View>
      </View>
      <Input label="Street Name Building, House no" onChangeText={(text)=>setUserProfile('block',text)} text={user.block || ''} />
      <Input label="Barangay" onChangeText={(text)=>setUserProfile('barangay',text)} text={user.barangay || ''} />
      <Input label="City/Town" onChangeText={(text)=>setUserProfile('city',text)} text={user.city || ''} />
      <Input label="Provice" onChangeText={(text)=>setUserProfile('province',text)} text={user.province || ''} />
      <Input label="Zip Code" onChangeText={(text)=>setUserProfile('zipcode',text)} text={user.zipcode || ''} />
      </ScrollView>
      <View style={styles.footer}>
            <Button onPress={handleUpdate} color={colors.primary} text="Save update" textColor="white"/>
      </View>
    </SafeAreaView>
    
  )
}

const Input =({label,text,isVerify,isPassword,multiline,onChangeText})=>{
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
        
            <TextInput secureTextEntry={isPassword} onChangeText={onChangeText} style={styles.txtbox} value={text}/>
        </View>
           {/* { isVerify && <TouchableOpacity style={styles.modify}>
                <Text style={styles.modifyText}>Send Code</Text>
            </TouchableOpacity>} */}
         
            
       
    </View>
    )
}



export default UpdateProfileS



const styles = StyleSheet.create({
    container :{
        flex :1,
        backgroundColor : 'white',
        paddingHorizontal : 10,
        position : 'relative',

        paddingTop : 10
    },
    header : {
        
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        gap :20,
        paddingHorizontal : 20,
        marginBottom :10
    },
    headerText : {
        fontSize : 16,
        fontWeight : 'bold',
        color : colors.primary,
    },
    line : {
        flex :1,
        borderBottomStyle : 'solid',
        borderBottomWidth : .5,
        borderBottomColor : 'black'
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
        marginBottom : 15,
        paddingHorizontal : 20,
       
    },
    label : {
        fontSize : 14,
        color : '#656565',
        lineHeight : 16,
        marginBottom : 5
    },
    txtbox : {
        outlineStyle : 'none',
        fontSize : 16,
        fontWeight : 'bold',
        lineHeight : 16,
        color : colors.headerText

    },
    // modify : {
    //     width : 90,
    //     height : 30,
    //     borderRadius : 15,
    //     backgroundColor : colors.primary,
    //     alignItems : 'center',
    //     justifyContent : 'center'
    // },
    // modifyText :{
    //     color : 'white',
    //     fontSize : 14,
    //     lineHeight : 14,
    //     fontWeight : 'bold'
    // },
    footer : {
        position : 'static',
        bottom : 0,
        right : 0,
        width : '100%',
        paddingBottom : 10,
        alignItems : 'center',
        justifyContent : 'center',
        flexDirection : 'row',
        backgroundColor : 'white'
    }
})