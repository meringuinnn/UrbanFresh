import { StyleSheet, Text, ScrollView, View, Linking, SafeAreaView,Image, TouchableOpacity,Modal,ActivityIndicator, ImageBackground} from 'react-native'
import React,{useState} from 'react'
// import logoNeon from '../assets/images/logo-neon-green.png'
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Input from '../components/Input';
import Checkbox from 'expo-checkbox';
import Spacer from '../components/Spacer';
import { useToast } from "react-native-toast-notifications";
//firebase
import { createUserWithEmailAndPassword, sendEmailVerification }  from 'firebase/auth';
import { FIRESTORE_DB } from '../utils/firebaseConfig';
import { FIREBASE_AUTH } from '../utils/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { KeyboardAvoidingView } from 'react-native';

const BuyerRegistration = () => {
    
    const toast = useToast();
    const navigation = useNavigation()
    const [isChecked, setChecked] = useState(false);
    const [isCheckedP, setCheckedP] = useState(false);
    const [showt,setShowt] = useState(false);
    const [showp,setShowp] = useState(false);
    const [loading,setLoading] = useState(false)
    const [user,setUser] = useState({
      pic : '',
      firstname : '',
      lastame : '',
      emailadd: '',
      pass : '',
      cpass: '',
      mobile : '',
      block: '',
      barangay : '',
      city : '',
      province : '',
      zipcode : '',
      userType : 1

    })

    const handleSubmit = () => {
      if(user.pass !== user.cpass){
        toast.show("Passwords don't match!", {
          type: "danger",
          placement: "bottom",
          duration: 2000,
          offset: 30,
          animationType: "slide-in",
        });
        return;
      }

      if(user.firstname =="" || user.lastname =="" || user.emailaddress == "" || user.pass == "" || user.mobile == "" || user.address==""){
        toast.show("Please fill up empty fields!", {
          type: "danger",
          placement: "bottom",
          duration: 2000,
          offset: 30,
          animationType: "slide-in",
        });

        return;
      }
      setLoading(true)
      createUserWithEmailAndPassword(FIREBASE_AUTH,user.emailadd, user.pass)
      .then((userCredential)=>{
          //  const full = user.fullname.split(' ')
          setDoc(doc(FIRESTORE_DB,'users',userCredential.user.uid),{
             
             pic : user.pic,
             fname: user.firstname,
             lname : user.lastname,
             email : user.emailadd,
             cpass : user.pass,
             mobile: user.mobile,
             block: user.block,
             barangay : user.barangay,
             city : user.city,
             province : user.province,
             zipcode : user.zipcode,
             userType: user.userType
            
          })
          .then((res)=>{
              sendEmailVerification(FIREBASE_AUTH.currentUser)
              setLoading(false)
              navigation.navigate('RegisterSuccess')
               
              
          })
          .catch(err => console.error(err))
      })
      .catch((err)=>{
        console.log(err)
      });
    }
    
  return (
    <SafeAreaView style={styles.container} behavior='padding' keyboardVerticalOffset={80}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView style={{width:'100%', alignItems: 'center'}}>
      {/* <ImageBackground source={logoNeon} resizeMode='contain' style={styles.image}></ImageBackground> */}
      {loading && <ActivityIndicator style={styles.indicator} animating={loading} size="large" color='#21C622'/>}
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
            <Icon name="arrowleft" size={30} color='#21C622' />
            </TouchableOpacity>
           
        </View>
        <View style={styles.titleBox}>
            <Text style={styles.title}>Sign up as a Buyer</Text>
        </View>
        <View style={styles.buyerbox}>
        <Input type="text" placeholder='First name' onChangeText={(text)=>setUser({...user,['firstname']:text})} value={user.firstname} />
        <Input type="text" placeholder='Last name' onChangeText={(text)=>setUser({...user,['lastname']:text})} value={user.lastname} />
        <Input type="text" placeholder='Email address' onChangeText={(text)=>setUser({...user,['emailadd']:text})} value={user.emailadd} />
        <Input type="text" placeholder='Password' secureTextEntry={true} onChangeText={(text)=>setUser({...user,['pass']:text})} value={user.pass}/>
        <Input type="text" placeholder='Confirm Password' secureTextEntry={true} onChangeText={(text)=>setUser({...user,['cpass']:text})} value={user.cpass}/>
        <Input type="text" inputmode='numeric' placeholder='Mobile no.' onChangeText={(text)=>setUser({...user,['mobile']:text})} value={user.value} />
        <Input type="text" placeholder='Complete Address' multiline={true} numberOfLines={10} height={95} onChangeText={(text)=>setUser({...user,['block']:text})} value={user.address} />
        </View>
        <Spacer height={12}/>
        <View style={styles.remember}>
          <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#21C622' : undefined}
        />
              <Text>I have read the</Text>
              <TouchableOpacity><Text style={styles.link} onPress={ ()=>{ Linking.openURL('https://www.traff.co/37e7mTd0')}}>Terms & Conditions</Text></TouchableOpacity>
          </View>

          <View style={styles.remember}>
          <Checkbox
            style={styles.checkbox}
            value={isCheckedP}
            onValueChange={setCheckedP}
            color={isCheckedP ? '#21C622' : undefined}
          />
              <Text>I agree to the</Text>
              <TouchableOpacity><Text style={styles.link} onPress={ ()=>{ Linking.openURL('https://www.freeprivacypolicy.com/live/1c09baf4-ceae-450d-a53b-d35457a87009')}}>Privacy Policy</Text></TouchableOpacity>
          </View>
          {isCheckedP && isChecked ?
          <TouchableOpacity onPress={handleSubmit} style={[styles.button,{width :150,backgroundColor : '#21C622'}]}>
            <Text style={[styles.btnText,{color : 'white'}]}>Create Account</Text>
            </TouchableOpacity>
            : <TouchableOpacity disabled={true} style={[styles.button,{width :150,backgroundColor : 'gray'}]}>
            <Text style={[styles.btnText,{color : 'white'}]}>Create Account</Text>
          </TouchableOpacity>
   }
      
      {/* <Image
        source={logoNeon}
        resizeMode = 'contain'
        style={styles.image}
        />
        <Modal
            visible={showt}
        >
            <Text>MOdal</Text>
        </Modal> */}
      
      
      </KeyboardAvoidingView>
    </ScrollView>
    </SafeAreaView>
  )
}

export default BuyerRegistration

const styles = StyleSheet.create({
    container: {
        overflow : 'hidden',
        flex: 1,
        position : 'relative',
        alignItems: 'center',
        backgroundColor : 'white',
        justifyContent: 'flex-start',
        width : "100%",
        paddingHorizontal : 30,
        border : '1px solid black'
      },
      indicator : {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'flex-start',
        left: 0,
        right: 0,
        top: 100,
       
      },
     image : {
      height : 350,
      width : 350,
      opacity: 0.6,
      zIndex: -1,
      position : 'absolute',
      bottom : -188,
      right : -100
     },
     header : {
        width : '100%',
        paddingVertical : 30,
        paddingHorizontal : 30,
        height : 10,
        flexDirection : 'row',
        alignItems  : 'center',
        justifyContent : 'flex-start',
     },
     title : {
        fontWeight : 'bold',
        fontSize : 29,
        lineHeight : 30,
        color : '#3E3627',
        width : '100%',
        textAlign : 'left',
       

     },
     titleBox:{
        display: 'flex',
        width : '100%',
        paddingHorizontal : 30,
        gap:10,
        marginBottom : 10,
        marginTop: 30,
        
     },
     buyerbox: {
      display : 'flex',
      position: 'relative',
      alignItems:'center',
      justifyContent : 'center',
      width : 300
    },
     remember : {
        zIndex : 2000,
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        width : '100%',
        gap: 5
       },
      checkbox : {
        height : 18,
        width : 18,
        margin : 3,
       },
       link : {
        color : '#264CD0'
       },
       button : {
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
    btnText : {
        fontWeight : 'bold'
    }
})