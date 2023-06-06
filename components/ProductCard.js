import { Image, StyleSheet, Text, TouchableOpacity, View,useWindowDimensions } from 'react-native'
import React,{useState,useLayoutEffect} from 'react'
import fallback from '../assets/images/fallback.png'
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors } from '../utils/constants';
import useStore from '../utils/appStore';
import { useToast } from "react-native-toast-notifications";

const ProductCard = ({onPress,name,desc,price,stock,unit,pic,prod_id,sname,shipping}) => {
    const {width} = useWindowDimensions()
    const addToCart = useStore((state)=>state.addToCart)
    const addToFav = useStore((state)=>state.addToFav)
    const fetchCart = useStore((state)=>state.fetchCart)
    const user = useStore((state)=>state.user)
    const cart = useStore((state)=>state.cart)
    const currentStore = useStore((state)=>state.currentStore)
    const toast = useToast()
    const [inCart,setinCart] = useState(false)
    
    
   


    useLayoutEffect(() => {
      checkCart(prod_id)
    }, [])

    const checkCart = (prod_id) => {
        const res =  cart.some((item) => item.prod_id == prod_id);
        console.log({checkcart : res})
        if(res){
            setinCart(prev=>!prev)
        }
        
      };

   const handleAddToCart = ()=>{
    if(currentStore == "" || currentStore == sname){
        if(cart.some((item) => item.prod_id == prod_id)) return toast.show('Product already in cart!',{
            type: "danger",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "slide-in",
        })

        addToCart(prod_id,user.userid,0,sname,pic,unit,stock,price,name,desc,shipping)
        console.log("added to cart")
        toast.show('Product added to cart.',{
            type: "success",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "slide-in",
        })
        fetchCart()

    }else{
        toast.show('You must add items from the same store!',{
            type: "danger",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "slide-in",
        })
    }
    
   }


   const handleAddtoFav = ()=>{
    addToFav(prod_id,user.userid,sname,pic,unit,price,name,desc)
        console.log("added to Favorites")
        toast.show('Product added to favorites.',{
            type: "success",
            placement: "bottom",
            duration: 2000,
            offset: 30,
            animationType: "slide-in",
        })
        
   }
       
    
  return (
    <TouchableOpacity  onPress={onPress} style={styles.card}>
        <Image 
            source={{uri:pic[0]} || fallback}
            resizeMode='cover'
            style={{
                height : 90,
                width : 90,
                borderRadius: 10
            }}
        />
        <View style={styles.info}>
                <Text style={styles.name}>{name.charAt(0).toUpperCase() + name.slice(1)}</Text>
                <Text style={styles.desc}>{desc}</Text>
                <Text style={styles.price}>PHP {price} per   
                {unit == 1? ' Kilo' : unit == 2? ' 100 grams':  unit == 3? ' pack' : unit == 4? ' 10kilos': ' Kaing (30 kg)'}
                
                </Text>
                <Text style={styles.price}>Stock: {stock}</Text>
        </View>
        <View style={styles.heart}>
            <TouchableOpacity onPress={handleAddtoFav}><Icon name="heart-o" size={25} /></TouchableOpacity>
            {inCart ? <Text>Already in Cart</Text>: <TouchableOpacity disabled={stock==0} onPress={handleAddToCart} style={styles.add}><Text style={{fontSize : 14,lineHeight : 14,color : 'white'}}>Add</Text></TouchableOpacity>}
        </View>
    </TouchableOpacity>
  )
}

export default ProductCard

const styles = StyleSheet.create({
    card: {
        // height: 70,
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
        padding: 20,
        flexDirection: "row",
        // flexWrap: 'wrap',
        // justifyContent : 'center',
        
      },
    info : {
        flex : 1,
        marginLeft: 10,
    },
    name : {
        color : colors.headerText,
        fontSize : 18,
        // lineHeight : 20,
        fontWeight : 'bold',
        paddingVertical: 4
    },
    desc : {
        color : colors.headerText,
        fontSize : 14,
        // lineHeight : 14,
       
    },
    price : {
        color : colors.headerText,
        fontSize : 14,
        // lineHeight : 20,
    },
    heart : {
        
        height : 90,
        width : 80,
        alignItems : 'flex-end',
        justifyContent : 'space-evenly',
    },
    add : {
        backgroundColor : colors.primary,
        width : 60,
        height : 25,
        borderRadius :20,
        alignItems : 'center',
        justifyContent : 'center',
    }
})