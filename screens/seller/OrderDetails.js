import { SafeAreaView, StyleSheet, Text, View,TouchableOpacity, Touchable, ScrollView,Platform,StatusBar,useWindowDimensions,Image} from 'react-native'
import React,{useState,useEffect} from 'react'
import { colors } from '../../utils/constants'
import useStore from '../../utils/appStore'
import HeaderBackOnlyS from '../../components/HeaderBackOnlyS'
import Icon from 'react-native-vector-icons/AntDesign';
import { collection, query, where,getDocs,doc,deleteDoc,getDoc,setDoc,increment } from "firebase/firestore";
import { FIRESTORE_DB } from '../../utils/firebaseConfig'
import fallback from '../../assets/images/fallback.png'
import Button from '../../components/Button'
import { useToast } from 'react-native-toast-notifications'

const OrderDetails = ({navigation,route}) => {
    const user = useStore((state)=>state.user)
    const {order} = route.params
    const [client,setClient] = useState({})
    const toast = useToast()

    useEffect(() => {
        getOrder()
    }, [])
    

  const getOrder= async ()=>{
    const docRef = doc(FIRESTORE_DB, "users",order.user_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setClient(docSnap.data())
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      
  }

  const getTotalPrice=()=>{
    return order.orders.reduce((acc,item)=>{
            return acc + ((item.price * item.count) + item.shipping)
    },0)
}

const getTotalShipping=()=>{
    return order.orders.reduce((acc,item)=>{
            return acc + item.shipping
    },0)
}


const handlePaid = async (orderid)=>{
    try {
        // const updatedCartItem = {
        //     ...prod,
        //     count: prod.count + 1,
        //   };
          const res = await setDoc(doc(FIRESTORE_DB,"orders",orderid),{
            status : 1
           
        },{ merge: true })

        order.orders.map(async (p,i)=>{
            const res = await setDoc(doc(FIRESTORE_DB,"products",p.prod_id),{
                stock : increment(-p.count)
               
            },{ merge: true })
        })


        toast.show('Order Status Updated',{
            type: "success",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "slide-in",
          })    

        navigation.navigate('SalesHome')
    } catch (error) {
        console.log(error)
    }
}


const handleDelivered = async (orderid)=>{
    try {
        // const updatedCartItem = {
        //     ...prod,
        //     count: prod.count + 1,
        //   };
          const res = await setDoc(doc(FIRESTORE_DB,"orders",orderid),{
            status : 2
           
        },{ merge: true })

        toast.show('Order Status Updated',{
            type: "success",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "slide-in",
          })    

        navigation.navigate('SalesHome')
    } catch (error) {
        console.log(error)
    }
}
 
  return (
    <><StatusBar backgroundColor={"#21C622"} barStyle={'light-content'} />
    <SafeAreaView style={styles.container}>
          <HeaderBackOnlyS />
          <View style={styles.titleContainer}>
              <Text style={styles.title}>Order Details</Text>
          </View>
          <ScrollView showsVerticalScrollIndicator={false} >
            <View style={styles.contentContainer}>
              <View style={styles.linkBox}>
                  <View style={styles.orderBox}>
                      <Text style={styles.orderText}>Order ID</Text>
                      <Text style={styles.number}>{order.orderid.slice(0, 7)}</Text>

                  </View>
              </View>

              <View style={styles.linkBox}>
                  <View style={styles.orderBox}>
                      <Text style={styles.orderText}>Delivery Address</Text>
                      <Text style={styles.normal}>{client.fname} {client.lname}</Text>
                      <Text style={styles.normal}>{client.mobile}</Text>
                      <Text style={styles.normal}>{client.block || ''} {client.barangay || ''} {client.city || ''} {client.province || ''} {client.zipcode || ''}</Text>

                  </View>
              </View>
              <View style={styles.productCardContainer}>
              <Text style={styles.orderText}>Items</Text>
                {order.orders.map((ord, i) => (
                  <ProductCard key={i} {...ord} />
              ))}
              </View>
              <View style={styles.linkBox}>
                  <Text style={{ fontSize: 16 }}>Shipping Fee</Text>
                  <Text style={{ fontSize: 16 }}>₱{getTotalShipping()}</Text>
              </View>
              <View style={styles.linkBox}>
                  <Text style={{ fontSize: 16 }}>Order Total</Text>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>₱{getTotalPrice()}</Text>
              </View>  
            </View>
              

          </ScrollView>
    <View style={styles.button}>
        {
            order.status == 0 && <Button text="Paid" color={colors.primary} textColor="white" onPress={()=>handlePaid(order.orderid)}/>
        }
    </View>
  </SafeAreaView></>
  )
}

const ProductCard =({pic,name,count,price,shipping})=>{
    return (
        <View style={styles.productCard}>
            <Image
            source={{uri:pic[0]} || fallback}
            resizeMode='contain'
            style={{
                height : 70,
                width : 70,
                borderRadius: 5,
            }}
            />

            <View style={{flex : 1}}>
                <Text style={{fontWeight : 'bold',fontSize : 14}}>{name}</Text>
                <Text>₱{price}</Text>
            </View>
            <Text>x {count}</Text>
        </View>
)
}

export default OrderDetails

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
        // paddingTop: Platform.OS === 'android' ? 25 : 0

    },
    contentContainer:{
        paddingBottom: 90,
    },
    titleContainer: {
        backgroundColor: colors.primary,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    productCardContainer: {
        paddingHorizontal : 20,
        paddingVertical : 10,
        borderColor : '#D6D6D6',
        borderBottomWidth :1,
    }, 
    productCard: {
        width : '100%',
        height : 90,
        flexDirection : 'row',
        alignItems : 'center',
        // paddingLeft : 20,
        // paddingRight : 20,
        gap : 10
    },
    orderText:{
        // marginTop: 10,
        fontWeight: 'bold',
    },
    orderBox :{
        alignItems :'flex-start',
        justifyContent : 'center',
        // width : 200,
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
    normal :{
        fontSize : 14,
        color: '#656565'
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
        // height : 50,
        paddingLeft : 20,
        paddingRight : 20,
        paddingVertical : 10,
        flexDirection : 'row',
        alignItems : 'flex-start',
        justifyContent : 'space-between',
        borderColor : '#D6D6D6',
        borderBottomWidth :1,
    
    },
    linkBox2 :{
        width : '100%',
        height : 50,
        paddingLeft : 20,
        paddingRight : 20,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        borderColor : '#D6D6D6',
        borderWidth :1,
    },
    button: {
        position: 'absolute', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 20,
        // top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
    }
    
})