import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity, Touchable, ScrollView,Platform,StatusBar,useWindowDimensions,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import { colors } from '../../utils/constants'
import useStore from '../../utils/appStore'
import Header from '../../components/Header'
import Icon from 'react-native-vector-icons/AntDesign';
import { collection, query, where,getDocs,doc,deleteDoc } from "firebase/firestore";
import { FIRESTORE_DB } from '../../utils/firebaseConfig'

const CancelledOrders = ({navigation}) => {
    const user = useStore((state)=>state.user)
    const [orders,setOrders] = useState([])


    useEffect(() => {
        getOrders()
    }, [])
    

  const getOrders= async ()=>{
    const q =  query(collection(FIRESTORE_DB, "orders"), where("storeid", "==",user.userid),where("status","==",3));
        
    const querySnapshot = await getDocs(q);
    const orders = []
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    orders.push({...doc.data(),orderid : doc.id})
    });
    
    setOrders(orders)
    console.log(orders)
  }


  return (
    <SafeAreaView style={styles.container}>
       {
        orders.length  == 0 ? <Text style={{width : '100%',textAlign : 'center' , marginTop : 200,fontSize : 24,fontWeight : 'bold',color : colors.primary}}>No Orders</Text>
        : 
        orders.map((order,i)=>(
            <LinkBox key={i} {...order} onPress={()=>navigation.navigate('OrderDetails',{order: order})} />
        ))
       }
       

  </SafeAreaView>
  )
}

const LinkBox = ({orderid,orders,onPress})=>{

    const getTotalPrice=()=>{
        return orders.reduce((acc,item)=>{
                return acc + ((item.price * item.count) + item.shipping)
        },0)
    }

    const getTotalItems=()=>{
        return orders.reduce((acc,item)=>{
                return acc + item.count
        },0)
    }

    return (
        <TouchableOpacity style={styles.linkBox} onPress={onPress}>
        <View style={styles.orderBox}>
            <Text style={styles.orderText}>Order ID:</Text>
            <Text style={styles.number}>{orderid.slice(0,7)}</Text>
            <View style={styles.amount}><Text style={styles.count}>{getTotalItems()} Items</Text>{  }<Text style={styles.price}>PHP {getTotalPrice().toLocaleString()}</Text></View>
        </View>
        <Icon name="right" size={20} color={colors.headerText} />
    </TouchableOpacity>
    )
}

export default CancelledOrders

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
        // paddingTop: Platform.OS === 'android' ? 25 : 0

    },
    orderBox :{
        alignItems :'flex-start',
        justifyContent : 'center',
        width : 200,
        height : '100%',
        gap :5
    },
    amount : {
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        gap :5
    },  
    number: {
        fontSize : 18,
        fontWeight : 'bold',
        color: 'black'
    },
    price :{
        fontSize : 18,
        fontWeight : 'bold',
        color: 'black'
    },
    count :{
        fontSize : 18,
        
        color: 'black'
    },
    linkText : {
        fontSize : 16,
        color : colors.headerText,
        lineHeight : 24

    },
    linkBox :{
        width : '100%',
        height : 100,
        paddingLeft : 20,
        paddingRight : 20,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        borderBottomColor : '#D6D6D6',
        borderBottomWidth :1,
    
    }
    
})