import { SafeAreaView, StyleSheet, Text, StatusBar, View,Image, TextInput,useWindowDimensions, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState,useEffect } from 'react'
import userplaceholder from '../../assets/images/user.png'
import { colors } from '../../utils/constants'
import { collection, query, where,getDocs,orderBy } from "firebase/firestore";
import { FIRESTORE_DB } from '../../utils/firebaseConfig'
import Header from '../../components/Header'
import useStore from '../../utils/appStore';
import { useIsFocused } from '@react-navigation/native';


const TransactionHome = ({navigation}) => {
    const user = useStore((state)=>state.user)


    const [transactions,setTransactions] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
      getOrders()
      },[isFocused])
    

    const getOrders = async  ()=>{
       
        const q =  query(collection(FIRESTORE_DB, "orders"), where("user_id", "==",user.userid),orderBy("date","desc"));
        
        const querySnapshot = await getDocs(q);
        const orders = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        orders.push({...doc.data(),orderid : doc.id})
        });
        console.log(orders)
        setTransactions(orders)
    }

  return (
    <>
    {/* <StatusBar backgroundColor={"#21C622"} barStyle={'light-content'}/> */}
    <Header what={"Cart"} onPress={() => navigation.goBack()} />
    <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.cartBox}>

              <Text style={styles.title}>Order History</Text>

          </View>
          {transactions.length == 0 &&
              <Text style={styles.infoText}>No Current Orders</Text>}

          {transactions.length > 0 &&
              transactions.map((t, i) => (
                  <OrderCard key={i} {...t} o={t} navigation={navigation} />
              ))}
    </ScrollView>
    </SafeAreaView></>
  )
}

const OrderCard =({address,date,orders,pay,status,storename,orderid,o,navigation})=>{

    const getColor=(status)=>{
        if(status == 3){
            return colors.red
        }
        else if(status==2){
            return colors.blue
        }else if(status==1){
            return colors.primary
        }else{
            return colors.yellow
        }
    }

    const getTotal=()=>{
        return orders.reduce((acc,item)=>{
            return acc + ((item.price * item.count)+ item.shipping)
        },0)
    }

    const getTotalItems=()=>{
        return orders.reduce((acc,item)=>{
            return acc + item.count
        },0)
    }

    const getStatus=(status)=>{
        if(status == 3){
            return "Cancelled"
        }
        else if(status==2){
            return "Delivered"
        }else if(status==1){
            return "Out for Delivery"
        }else{
            return "Pending"
        }
    }
    const {width} = useWindowDimensions()
    return (
        <TouchableOpacity onPress={()=>navigation.navigate('OrderDetails',{order : o})} style={[styles.card,{width : width * .90}]}>
            <View style={styles.info}>
                <Text style={styles.name}>{storename}</Text>
                <Text style={styles.date}>{new Date(date.seconds * 1000).toLocaleDateString("en-US")}</Text>
                    <View style={styles.indicator}>
                        <View style={[styles.dot,{backgroundColor: getColor(status)}]}></View>
                        <Text style={styles.status}>{getStatus(status)}</Text>
                    </View>
            </View>

            <View style={styles.infoRight}>
                <Text style={styles.name}>₱{getTotal()}</Text>
                <Text style={styles.date}>{getTotalItems()} Items</Text>
                  
            </View>
        </TouchableOpacity>
    )
}

export default TransactionHome

const styles = StyleSheet.create({
    container :{
        flex :1,
        backgroundColor : 'white',
        alignItems: 'center',
        position : 'relative'
    },
    cartBox : {
        height :70,
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center'
    },
    title : {
      textAlign : 'center',
        flex  :1,
        fontSize : 24,
        fontWeight:'bold',
        color : colors.primary,
        lineHeight : 25
    },
    infoText : {
        textAlign : 'center',
        flex  :1,
        fontSize : 20,
        fontWeight:'bold',
        color : colors.headerText,
        lineHeight : 20,
        width : '100%',
    },
    card : {
        marginVertical : 0,
        marginHorizontal : 'auto',
        borderColor : '#AFAFAF',
        borderStyle :'solid',
        borderWidth : 1,
        paddingVertical : 10,
        paddingHorizontal : 10,
        borderRadius : 10,
        alignItems : 'center',
        justifyContent : 'space-between',
        flexDirection : 'row',
        marginBottom : 10
    },
    info : {
        // justifyContent : 'space-between',
        alignItems : 'flex-start',
    },
    infoRight: {
        alignItems : 'flex-end',
    },
    name : {
        fontSize : 14,
        lineHeight : 16,
        color : colors.headerText,
        fontWeight : 'bold'
    },
    date : {
        fontSize : 12,
        lineHeight : 16,
        color :colors.headerText
    },
    indicator : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        width : '100%',
        gap : 5
    },
    dot : {
        width :14,
        height : 14,
        borderRadius : 50

    },
    status : {
        fontSize :12,
        lineHeight : 14,
        colors: colors.headerText,
        fontWeight : 'bold'
    }
})