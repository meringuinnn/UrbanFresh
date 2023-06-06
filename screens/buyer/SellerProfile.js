import { Pressable, SafeAreaView, StyleSheet, Text, View,ScrollView,Image,useWindowDimensions,Modal,TouchableOpacity } from 'react-native'
import React,{useState,useLayoutEffect,useFocusEffect} from 'react'
import Header from '../../components/Header'
import { colors } from '../../utils/constants'
import SellerCard from '../../components/SellerCard'
import fallback from '../../assets/images/fallback.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import ProductCard from '../../components/ProductCard'
import { collection, query, where,getDocs,getDoc,addDoc, doc, setDoc} from "firebase/firestore";
import { FIRESTORE_DB } from '../../utils/firebaseConfig'
import useStore from '../../utils/appStore'
import { useIsFocused } from '@react-navigation/native';



const SellerProfile = ({route,navigation}) => {
    const {height,width} = useWindowDimensions()
    const { sellerid } = route.params;
    const docRef = doc(FIRESTORE_DB, "users", sellerid);
    const [store,setStore] = useState({})
    const [products,setProducts] = useState([])
    const cart =  useStore((state)=>state.cart)
    const user =  useStore((state)=>state.user)
    const [inCart,setIncart] = useState(false)
    const isFocused = useIsFocused();
    const setStoreid = useStore((state)=>state.setStoreid)
    const [rating,setRating] = useState(0)
    const [israted,setIsrated] = useState(false)

    useLayoutEffect(() => {
      getStoreProfile();
    

    }, [isFocused])

   


   const  getStoreProfile=async()=>{
    const docSnap = await getDoc(docRef);

    
if (docSnap.exists()) {
    console.log(docSnap.id, docSnap.data());
    setStoreid(docSnap.id)
    setStore(docSnap.data())
    getStoreProducts(docSnap.id)
    getRatings(docSnap.id)
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

    }


    const getStoreProducts = async(id)=>{
        const productRef = collection(FIRESTORE_DB, "products");
        const q = query(productRef, where("userId", "==",id));
        const querySnapshot = await getDocs(q);
        const prod_data = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
       
        prod_data.push({...doc.data(),prod_id : doc.id})
        });
        setProducts(prod_data)
        console.log(prod_data)
    }


    const getRatings= async (storeid)=>{
        const q =  query(collection(FIRESTORE_DB, "ratings"), where("storeid", "==",storeid));
        
        const querySnapshot = await getDocs(q);
        const fratings = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        fratings.push({...doc.data(),ratingid : doc.id})
        });
        console.log(fratings)
       
        if(fratings.length > 0){
            const initratings = fratings.reduce((acc,item)=>{
                    return acc + item.rating
            },0)
            const finalrating = Math.round(Math.round(initratings) / fratings.length)
            setRating(finalrating)
            console.log(finalrating)

            fratings.map((item,i)=>{
               if(item.userid == user.userid) setIsrated(true)
            })
        }
       
    }
    
  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={()=>navigation.goBack()}
       />
      <Image
        source={{uri : store.pic}  || fallback}
        resizeMode='cover'
        style={{
            width: '100%',
            height : height * .25
        }}
      />
      <View style={styles.nameBox}>
        <View style={styles.stars}>
            <Text style={styles.name}>{store.storename}</Text>
            <View style={styles.rating}>
                {
                    rating == 0 ? <Text>No Ratings Yet</Text>
                    :
                    [...Array(5).keys()].map((r,i)=>(
                        (i+1)<=rating ?  <Icon key={i} name="star" size={20} color="#FAFF00" /> : <Icon key={i} name="star-o" size={20} color="#DCDCDC" />
                       
                    ))

                }

                {/* <Icon name="star" size={20} color="#FAFF00" />
                <Icon name="star" size={20} color="#FAFF00" />
                <Icon name="star" size={20} color="#FAFF00" />
                <Icon name="star" size={20} color="#FAFF00" />
                <Icon name="star" size={20} color="#FAFF00" /> */}

            </View>
        </View>
        <View style={styles.location}>
            <Icon2 name="location" size={20} color="black" style={{marginRight : 10}} />
            <Text style={styles.locationText}>
                    { `${store.block} ${store.barangay} ${store.city} ${store.province} ${store.zipcode}`}
            </Text>
            {israted ?<Text>Already Rated</Text> :<TouchableOpacity style={styles.ratingBtn} onPress={()=>navigation.navigate('AddRating',{storeid:sellerid})}><Text style={{color : 'white',fontSize:16,fontWeight : 'bold'}}>Add Rating</Text></TouchableOpacity>}

        </View>
        
        <Text style={styles.title}>
            Products
        </Text>
       

      </View>
      <ScrollView 
            // style={{marginTop: 10}}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
        <View style={styles.productListContainer}>
            {
                products.length == 0 ? <Text>No Products Available!!</Text> :
                products.map((prod,i)=>(
                    <ProductCard key={i} sname={store.storename} {...prod}   />
                ))
            }
        </View> 
        </ScrollView>
    </SafeAreaView>
  )
}

export default SellerProfile

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#f2f3f4',

    },
    contentContainer :{
        // alignItems : 'center',
        // gap : 10
    },
    stars :{
        paddingHorizontal : 25,
        paddingVertical : 10,
        flexDirection :'row',
        alignItems : 'center',
        justifyContent : 'space-between'
    },
    title : {
        fontSize :24,
        color : colors.headerText,
        fontWeight : 'bold',
        textAlign : 'center',
        paddingHorizontal : 25,
        marginTop : 20,
        marginBottom: 20,
    },
    productListContainer:{ 
        backgroundColor: "#f2f3f4",
    },
    nameBox:{
        backgroundColor: 'white',
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
    },
    name : {
        fontSize :24,
        color : colors.headerText,
        fontWeight : 'bold'
    },
    rating : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        gap : 5
    },
    location : {
        flexDirection :'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        paddingHorizontal : 25,
    },
    locationText : {
        flex : 1,
        textAlign : 'left',
        fontSize : 14,
        lineHeight : 14
    },
    ratingBtn : {
        backgroundColor : colors.primary,
        
        width : 100,
        height : 40,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : 10
        
    }
})