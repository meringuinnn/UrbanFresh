import { Pressable, SafeAreaView, StyleSheet, Text, View,ScrollView,Image,useWindowDimensions, TouchableOpacity } from 'react-native'
import React,{useState,useLayoutEffect} from 'react'
import Header from '../../components/Header'
import { colors } from '../../utils/constants'
import SellerCard from '../../components/SellerCard'
import fallback from '../../assets/images/fallback.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import ProductCard from '../../components/ProductCard'
import Button from '../../components/Button'
import { Shadow } from 'react-native-shadow-2';
import { ImageSlider } from "react-native-image-slider-banner";
import ReviewCard from '../../components/ReviewCard'
import { collection, query, where,getDocs,doc, getDoc  } from "firebase/firestore";
import { FIRESTORE_DB } from '../../utils/firebaseConfig'




const ProductDetail = ({route,navigation}) => {
    const {height,width} = useWindowDimensions()
    const { prod } = route.params;
    // const docRef = doc(FIRESTORE_DB, "products", prodid);
    const [product,setProduct] = useState(prod)
    const [count,setCount] = useState(0) 

    useLayoutEffect(() => {
       console.log(product)
     
    }, [])

//    const getProduct =  async ()=>{
//     const docSnap = await getDoc(docRef);

    
//     if (docSnap.exists()) {
//         console.log(docSnap.data())
//         const newProd = {...docSnap.data()}
//         setProduct(newProd)
//         console.log(product)
//       } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such document!");
//       }
//     }

    const getImages = ()=>{
        console.log(product.pic)
            if(product.pic.length===0) return {img : product.pic}

            const pics = product.pic.map((img)=>{
                return {
                    img : img
                }
            })

            return pics
    }

    
  
  return (
    <SafeAreaView style={styles.container}>
      <Header 
      onPress={()=>navigation.goBack()}
      hasSearch={false}
      
      />
      <ImageSlider
        data={[...getImages()]}
        
        autoPlay={true}
        onItemChanged={(item) => console.log("item", item)}
        timer={5000}
        caroselImageStyle={{ resizeMode: 'cover',height : height * .25 }}
        preview={false}
       />
      
      <View style={styles.nameBox}>
        <View style={styles.stars}>
            <Text style={styles.name}>{product.name}</Text>
            <View style={styles.rating}>
                <Icon name="star" size={20} color="#FAFF00" />
                <Icon name="star" size={20} color="#FAFF00" />
                <Icon name="star" size={20} color="#FAFF00" />
                <Icon name="star" size={20} color="#FAFF00" />
                <Icon name="star" size={20} color="#FAFF00" />

            </View>
        </View>
        <View style={styles.location}>
           
            <Text style={styles.locationText}>
                    PHP {product.price}  per {unit == 1? ' Kilo' : unit == 2? ' 100 grams':  unit == 3? ' pack' : unit == 4? ' 10kilos': ' Kaing (30 kg)'}
            </Text>
            <Text style={styles.locationText}>
                    Stock: {product.stock}
            </Text>
            <Icon name="heart-o" size={25} style={{marginLeft : 20}}  />


        </View>
        <Text style={styles.title}>
            Reviews
        </Text>
       

      </View>
      <ScrollView 
            style={{marginTop: 10}}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
         <Text>No Review Available</Text>



        </ScrollView>
        <Shadow  style={styles.actionBox} distance={2} startColor={'rgba(0, 0, 0, 0.4)'}>
        
            <View style={styles.number}>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.num}>-</Text>
                </TouchableOpacity>
                    <Text style={styles.num}>0</Text>
                <TouchableOpacity style={styles.btn}>
                    <Text style={styles.num}>+</Text>
                </TouchableOpacity>
            </View>
           <Button onPress={()=>console.log("pressed")} disabled={product.stock == 0} textColor="white" text="Add to Cart" color={colors.primary}/>
       
        </Shadow>
    
    </SafeAreaView>
  )
}

export default ProductDetail

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'white',
       
    },
    contentContainer :{
        alignItems : 'center',
        gap : 10
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
        marginTop : 20
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
        width : 100,
        flex: 1,
        textAlign : 'left',
        fontSize : 14,
        lineHeight : 14
    },
    actionBox : {
       width : '100%',
       height:80,
       flexDirection : 'row',
       alignItems : 'center',
       justifyContent : 'center',
       paddingHorizontal :30,


    },
    number : {
        flexDirection : 'row',
        flex : 1,
        alignItems : 'center',
        justifyContent : 'space-evenly',
    },
    num : {
       
        fontSize : 30,
        textAlign : 'center',
        lineHeight : 24,
        color : colors.headerText
    },
    btn : {
        border : '1px solid black',
        height : 35,
        width : 35,
        borderRadius : 50,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
    }
})