import { StyleSheet, Text, View,useWindowDimensions,Image, TouchableOpacity } from 'react-native'
import React,{useState,useLayoutEffect} from 'react'
import fallback from '../assets/images/fallback.png'
import Icon from 'react-native-vector-icons/AntDesign'
import { colors } from '../utils/constants'
import { doc, getDoc,deleteDoc,setDoc,arrayUnion,arrayRemove,deleteField, updateDoc  } from "firebase/firestore";
import { FIRESTORE_DB } from '../utils/firebaseConfig'
import useStore from '../utils/appStore'
import { useToast } from 'react-native-toast-notifications'

const CartItem = ({isDeleting,cart,setIsDeleting}) => {
    const [name,setName] = useState("")
    const currentStore = useStore((state)=>state.currentStore)
    

    useLayoutEffect(() => {
        console.log(cart)

    //  getProduct();
    }, [isDeleting])

    // const getProduct =  async ()=>{
    // const docRef = doc(FIRESTORE_DB, "users",cart[0].userId);
    // const docSnap = await getDoc(docRef);

    
    // if (docSnap.exists()) {
    //     console.log(docSnap.data())
        
    //   } else {
    //     // docSnap.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }

   

  return (
    <View style={styles.card}>
      <View style={styles.header}>
            <Text>{currentStore}</Text>
            <View style={styles.line}></View>
      </View>
      <View style={styles.contentContainer}>
            {
                cart.length == 0 ? <Text>No Products</Text> : 
                cart.map((prod,i)=>(
                    <CartProduct setIsDeleting={setIsDeleting} isDeleting={isDeleting} prod={prod} {...prod} key={i} />
                ))
            }
      </View>
    </View>
  )
}



const CartProduct = ({isDeleting,count,prod_id,name,desc,price,unit,pic,stock,setIsDeleting,prod}) =>{
    const {width} = useWindowDimensions()
    const [product,setProduct] = useState({})
    const fetchCart = useStore((state)=>state.fetchCart)
    const setCartItems = useStore((state)=>state.setCartItems)
    const getTotalPrice = useStore((state)=>state.getTotalPrice)
    const cartItems = useStore((state)=>state.cart)
    const resetCurrentStore = useStore((state)=>state.resetCurrentStore)
    const user = useStore((state)=>state.user)
    const currentStore = useStore((state)=>state.currentStore)
    const storeid = useStore((state)=>state.storeid)
    const toast = useToast()

    useLayoutEffect(() => {
        console.log(count)
    }, [])

    const handleDelete = async ()=>{
        try {
            
            const updatedCartItems = cartItems.filter((item) => item.prod_id !== prod_id);
            console.log({old : cartItems,new:updatedCartItems})
            console.log(user.userid)
            if(updatedCartItems.length ==0){
                const res = await setDoc(doc(FIRESTORE_DB,"cart",user.userid),{
                    cart_items : updatedCartItems,
                    store : ""
                },{merge : true})
                setCartItems(updatedCartItems)
            }else{
                const res = await setDoc(doc(FIRESTORE_DB,"cart",user.userid),{
                    cart_items : updatedCartItems,
                },{merge : true})
                setCartItems(updatedCartItems)
            }
            
               
            toast.show('Item deleted from cart!',{
                type: "success",
                placement: "bottom",
                duration: 2000,
                offset: 30,
                animationType: "slide-in",
              })    
              fetchCart()
              setIsDeleting(false)
             
              
        } catch (error) {
            console.log(error)
        }
    }

    const handleDecrement=async (prod)=>{
        console.log(prod)
        const newCart = cartItems.map((item)=>{
            if(item.prod_id == prod_id){
                return {...item,
                    count : item.count > 1 ? item.count - 1 : 1 }
                    // added a condition so that item count won't go below 0
                    // default code is {...item,count : item.count - 1  }
            }else{
                return item
            }
        })
        try {
            // const updatedCartItem = {
            //     ...prod,
            //     count: prod.count + 1,
            //   };
              const res = await setDoc(doc(FIRESTORE_DB,"cart",user.userid),{
                cart_items: arrayUnion(...newCart),
                store : currentStore,
                storeid : storeid
               
            })
            setCartItems(newCart)
            getTotalPrice()
        } catch (error) {
            console.log(error)
        }

    }

    const handleIncrement=async (prod)=>{
        console.log(prod)
        let currIndex;
        const newCart = cartItems.map((item,i)=>{
            if(item.prod_id == prod_id){
                currIndex = i
                return {...item,
                    count : item.count < stock ? item.count + 1 : stock}
                    //added a condition so that it won't increase over the total stocks
                    // default code is {...item,count : item.count + 1  }
            }else{
                return item
            }
        })
        try {
            // const updatedCartItem = {
            //     ...prod,
            //     count: prod.count + 1,
            //   };
              const res = await setDoc(doc(FIRESTORE_DB,"cart",user.userid),{
                cart_items: arrayUnion(...newCart),
                store : currentStore,
                storeid : storeid
               
            })
            setCartItems(newCart)
            getTotalPrice()
        } catch (error) {
            console.log(error)
        }
       

    }
    

    return (
        <View style={[styles.card2,{width : width * .95}]}>
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
                <Text style={styles.price}>₱{price} per   
                {unit == 1? ' Kilo' : unit == 2? ' 100 grams':  unit == 3? ' pack' : unit == 4? ' 10kilos': ' Kaing (30 kg)'}
                
                </Text>
                <Text style={styles.price}>{stock} stocks remaining</Text>
        </View>
        <View style={styles.heart}>
            {
                isDeleting ? <TouchableOpacity onPress={handleDelete}><Icon name="delete" size={30} color="#FF0000" /></TouchableOpacity> : 
                <View style={styles.actions}>
                    <TouchableOpacity onPress={()=> handleDecrement(prod)}>
                        <Icon name="minus" size={20}/>
                    </TouchableOpacity>
                  
                    <Text style={styles.num}>{count}</Text>
                    <TouchableOpacity onPress={()=>handleIncrement(prod)}>
                        <Icon name="plus" size={20}/>
                    </TouchableOpacity>
                </View>
            }
        </View>
    </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    card :{
        width : '100%',
        paddingHorizontal :20,
       
    },
    card2 : {
        height : 120,
        padding: 15,
        flexDirection : 'row',
        alignItems : 'center',
        gap : 10
        
    },
    header : {
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'flex-start',
        gap :20
    },
    line : {
        flex :1,
        borderBottomStyle : 'solid',
        borderBottomWidth : .5,
        borderBottomColor : 'black'
    },
    info : {
        flex : 1,
        marginLeft: 5,
    },
    name : {
        color : colors.headerText,
        fontSize : 18,
        lineHeight : 20,
        fontWeight : 'bold',
        paddingBottom: 10,
    },
    desc : {
        color : 'black',
        fontSize : 14,
        lineHeight : 14,
       
    },
    price : {
        color : 'black',
        fontSize : 14,
        lineHeight : 20,
    },
    heart : {
        
        height : 90,
        width : 80,
        alignItems : 'flex-end',
        justifyContent : 'space-evenly',
    },
   actions : {
    backgroundColor : '#E5E5E5',
    borderRadius : 5,
    width : 80,
    height : 30,
    flexDirection : 'row',
    alignItems :'center',
    justifyContent : 'space-evenly',
    gap:5

   },
   num :{
    fontSize : 20,
    fontWeight : 'bold',
   },
   contentContainer : {
    alignItems : 'center',
    gap : 10
  }
})