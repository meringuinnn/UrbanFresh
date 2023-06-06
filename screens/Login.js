import { StyleSheet, Text, View,TextInput, StatusBar, TouchableOpacity,ActivityIndicator,ImageBackground,KeyboardAvoidingView} from 'react-native'
// import Checkbox from 'expo-checkbox';
import React,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {axios1} from '../utils/axios';
import { useToast } from "react-native-toast-notifications";
import Input from '../components/Input';
import Button from '../components/Button';
import logoNeon from '../assets/images/logo-neon-green.png'
import { doc, getDoc } from "firebase/firestore";
import { FIRESTORE_DB } from '../utils/firebaseConfig';
import { FIREBASE_AUTH } from '../utils/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useStore from '../utils/appStore';



export default function Login({navigation}) {
    const toast = useToast();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isChecked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false)
    const setUser = useStore((state)=>state.setUser)
    const user = useStore((state)=>state.user)

    


    useEffect(() => {
      console.log(logoNeon)
    
     
      
    },[])
    
  

    const userLogin = async  () => {
      console.log('Login')
        if(email =='' || email.indexOf('@') == -1 || password=='') {
          toast.show('Fill up empty fields!',{
            type: "danger",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "slide-in",
          })
          return;
        }
        setLoading(true)
        signInWithEmailAndPassword(FIREBASE_AUTH,email, password)
        .then(cred=>{
          console.log(cred)
          if(cred.user.emailVerified==false){
            toast.show('Please verify your email first!',{
              type: "danger",
              placement: "bottom",
              duration: 2000,
              offset: 30,
              animationType: "slide-in",
            })
            return;
          }else{
           
              const docRef = doc(FIRESTORE_DB, "users",cred.user.uid);
               getDoc(docRef).then(docSnap=> 
                {console.log("Document data:", docSnap.data())
                setUser({...docSnap.data(),userid : cred.user.uid})
                console.log(user)
                toast.show('Login Successfully!',{
                  type: "success",
                  placement: "bottom",
                  duration: 2000,
                  offset: 30,
                  animationType: "slide-in",
                })
                setLoading(false)
                if(docSnap.data().userType === 1){
                  navigation.navigate('BuyerTabs');
                }else{
                  navigation.navigate('SellerTabs');
                }
              })
               .catch(err=>{
                console.log(err)
                toast.show('Error logging in!',{
                  type: "danger",
                  placement: "bottom",
                  duration: 2000,
                  offset: 30,
                  animationType: "slide-in",
                })
              })
             
          }
      
         
        })
        .catch(err=>{
          console.log(err.code)
          if(err.code=="auth/user-not-found"){
            toast.show('User not found! Please check your credentials.',{
              type: "danger",
              placement: "bottom",
              duration: 2000,
              offset: 30,
              animationType: "slide-in",
            })
          }else if(err.code==="auth/wrong-password"){
            toast.show('Password is incorrect!',{
              type: "danger",
              placement: "bottom",
              duration: 2000,
              offset: 30,
              animationType: "slide-in",
            })
          }
        })
        .finally(()=>setLoading(false))

            
           
       

    }

    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('empid', jsonValue)
        } catch (e) {
          // saving error
        }
      }

      



  return (
    <><StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
    <SafeAreaView style={styles.container} behavior='padding'
      keyboardVerticalOffset={80}>
      <KeyboardAvoidingView>
        <ImageBackground source={logoNeon} resizeMode='contain' style={styles.image}></ImageBackground>
        {loading && <ActivityIndicator style={styles.indicator} animating={loading} size="large" color='#21C622' />}
        {/* <Image
      source={logoNeon}
      resizeMode = 'contain'
      style={styles.image}
      /> */}

        <View style={styles.loginBox}>
          <View style={styles.header}>
            <Text style={styles.heading}>Log in to UrbanFresh</Text>
            <Text style={styles.smallText}>Ayala Boulevard, Ermita, Manila, Philippines.</Text>
          </View>


          <Input
            type='text'
            placeholder='Email Address'
            placeholderTextColor='#D6D6D6'
            onChangeText={(text) => setEmail(text)}
            value={email} />
          <Input
            type='text'
            placeholder='Password'
            secureTextEntry={true}
            placeholderTextColor='#D6D6D6'
            onChangeText={(text) => setPassword(text)}
            value={password} />
          <View style={styles.newUser}>
            <Text>New user?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RegisterPanel')}>
              <Text style={styles.link}>Create an account</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.button, { width: 150, backgroundColor: '#21C622' }]} onPress={userLogin}>
            <Text style={styles.buttontxt}>
              Log in
            </Text>
          </TouchableOpacity>
          {/* <Button onPress={userLogin} text='Log in' width={150} color='#21C622' textColor='white'/> */}

        </View>
      </KeyboardAvoidingView>

    </SafeAreaView></>
  )
}

const styles = StyleSheet.create({
    container: {
        overflow : 'hidden',
        flex: 1,
        position : 'relative',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor : "white"
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
      buttontxt:{
        fontWeight: 'bold',
        color: '#fff',
      },
      indicator : {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'flex-start',
        left: 0,
        right: 0,
        top: 100,
       
      },
      header : {
         width : '100%',
         display :'flex',
         alignItems: 'flex-start',
         justifyContent : 'center',
         gap : 10,
         marginBottom : 10,
      },
      loginBox : {
        display : 'flex',
        alignItems:'center',
        justifyContent : 'center',
        marginTop : 150,
        width : 300
      },
      heading : {
        // width : 250,
        fontWeight: 'bold',
        fontSize: 29,
        lineHeight: 30,
        color : '#3E3627'
      },
      smallText :{
        fontStyle: 'normal',
        fontSize: 12,
        lineHeight: 12,
        textTransform: 'uppercase',
        color : '#21C622',
        marginVertical : 8
      },
     newUser : {
        flexDirection : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap : 5,
        width : '100%',
        marginVertical : 5
     },
     link : {
      color : '#264CD0'
     },
     image : {
      height : 350,
      width : 350,
      // zIndex : 1,
      opacity: 0.6,
      position : 'absolute',
      
      bottom : -360,
      right : -140
     }
      
    
    })