import { StyleSheet, Text, View,TextInput, TouchableOpacity,Image } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import {axios1} from '../utils/axios';

import bg from '../assets/logo_caring.png';
import { useToast } from "react-native-toast-notifications";


export default function Signup({navigation}) {
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();


    const handleSignup = async () =>{
      if(password !== cpassword){
        toast.show("Passwords dont match!!", {
          type: "danger",
          placement: "bottom",
          duration: 2000,
          offset: 30,
          animationType: "slide-in",
        });
      }else{
        const res = axios1.post('signup', {
          fullname,
          email,
          password
      });
      const result = await res;
      console.log(result);
      if(result){
        toast.show("Registration successful! Please login using your account.", {
          type: "success",
          placement: "bottom",
          duration: 2000,
          offset: 30,
          animationType: "slide-in",
        });
        navigation.navigate('Login');

      }else{
        Toast.show({
          type: 'error',
          text1: 'Registration Failed!',
         
          position : 'bottom'
         
        });
      }
      }
    }

  return (
    <SafeAreaView style={styles.container}>
       <Image 
        source = {bg}
        style = {{width : 200, height : 200,}}
         />
       
       <Text style={styles.heading}>Sign Up</Text>
     
      <View style={styles.login_box}>
        
        <TextInput  placeholder='Fullname' value={fullname} onChangeText={setFullname}  style={styles.login_input} />
        <TextInput  placeholder='Email' value={email} onChangeText={setEmail} style={styles.login_input} />
        
        
        
        <TextInput name='pass' placeholder='Password' value={password} onChangeText={setPassword}  secureTextEntry={true}  style={styles.login_input} />
        <TextInput name='pass' placeholder='Confirm Password' value={cpassword} onChangeText={setCpassword}  secureTextEntry={true}  style={styles.login_input} />
        
        <TouchableOpacity onPress={handleSignup}  style={styles.login_button}>
            <Text style={styles.login_button_text}>Sign Up</Text>
        </TouchableOpacity>
            
      </View>
     
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        
        flex: 1,
        
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor : "white"
      },
      title: {
        width : '100vw',
        fontSize: 40,
        fontWeight: 'bold',
        color: '#EEEEEE',
        textAlign : 'center',
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex : 2000

      },
      login_box : {
        display : 'flex',
        height:300,
        width : 300,
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center',
        zIndex : 2000
       

      },
      login_text:{
        fontSize : 20,
        marginTop : 5,
        fontWeight : 'bold',
        color : 'black',
        textTransform : 'uppercase',

      },
        login_input : {
            height : 60,
            width : 300,
            borderColor : '#DDDDDD',
            borderWidth : 1,
            borderRadius : 5,
            marginTop : 10,
            paddingLeft : 10,
            color : 'black',
            fontSize : 20,
            fontWeight : 'bold',
           
        },
        login_button : {
            display :'flex',
            justifyContent : 'center',
            alignItems : 'center',
            height : 70,
            width : 300,
            borderColor : 'white',
            borderWidth : 1,
            borderRadius : 5,
            marginTop : 15,
            paddingLeft : 10,
            color : 'white',
            fontSize : 20,
            fontWeight : 'bold',
            textTransform : 'uppercase',
            backgroundColor : '#4649FF',
           

        },
        login_button_text : {
            fontSize : 20,
            fontWeight : 'bold',
            color : 'white',
            textTransform : 'uppercase',

        },
        smallText : {
          marginTop : 10,
          fontSize : 16,
          fontWeight : "bold",
          color : 'black',
        },
        signUp : {
          color : "blue"
        },
        heading : {
          fontSize : 22,
          fontWeight : 'bold',
          textTransform : 'uppercase',
          color : 'black'

        }

})