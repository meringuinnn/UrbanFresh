import { SafeAreaView, StyleSheet, StatusBar, Text, View,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import logoText from '../assets/images/logo_text.png'

let interval = undefined;
const Loading = ({navigation}) => {
    const [running, setRunning] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (running) {
       interval =setInterval(() => {
        setProgress((prev) => prev + 10);
      }, 100);
    } else {
      clearInterval(interval);
    }
  }, [running]);

  useEffect(() => {
    if (progress === 280) {
      setRunning(false);
      clearInterval(interval);
      navigation.navigate('Landing')

    }
  }, [progress]);


   
    

  return (
    <><StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
    <SafeAreaView style={styles.container}>
      <Image
        source={logoText}
        resizeMode='contain'
        style={styles.logoText} />
      <View style={styles.progBox}>
        <View style={[styles.progBar, { width: progress }]}></View>
      </View>

    </SafeAreaView></>
  )
}

export default Loading

const styles = StyleSheet.create({
    container : {
        flex :1,
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'white'
    },
    logoText : {
        width : 300,
        height :200
    },
    progBox : {
        marginTop : 20,
        display : 'flex',
        flexDirection :'row',
        alignItems :'center',
        justifyContent : 'flex-start',
        width : 280
    },
    progBar : {
        
        height :10,
        backgroundColor :'#21C622',
        borderRadius : 10
    }
})