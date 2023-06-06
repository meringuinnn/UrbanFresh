import { StyleSheet, Text, View,useWindowDimensions } from 'react-native'
import React,{useState,useEffect} from 'react'


const SellerStats = ({orders}) => {
    const {width} = useWindowDimensions()
    const [pending,setPending] = useState(0)
    const [toship,setToship] = useState(0)
    const [delivered,setDelivered]=useState(0)
    const [cancelled,setCancelled]=useState(0)

    useEffect(() => {
        initStats()
    }, [orders])
    

    const initStats=()=>{
        orders.map((o,i)=>{
            if(o.status==0){
                console.log(o.status)
                setPending(p=>p+1)
            }else if(o.status==1){
                console.log(o.status)
                setToship(p=>p+1)
            }else if(o.status==2){
                console.log(o.status)
                setDelivered(p=>p+1)
            }else{
                console.log(o.status)
                setCancelled(p=>p+1)
            }
        })
        
    }

   
  return (
    <View style={[styles.card,{width : width * .9}]}>
      <Text style={styles.title}>Order Status</Text>
      <View style={styles.statBox}>

        
          
            <View style={styles.stat}>
                <Text style={styles.number}>{toship}</Text>
                <Text style={styles.name}>To Ship</Text>
             </View>
         
             <View  style={styles.stat}>
                <Text style={styles.number}>{cancelled}</Text>
                <Text style={styles.name}>Cancelled</Text>
             </View>
             <View  style={styles.stat}>
                <Text style={styles.number}>{delivered}</Text>
                <Text style={styles.name}>Delivered</Text>
             </View>
             <View style={styles.stat}>
                <Text style={styles.number}>{pending}</Text>
                <Text style={styles.name}>To Review</Text>
             </View>
       
        </View>
     
  </View>
  )

    }

export default SellerStats

const styles = StyleSheet.create({
    card : {
        borderRadius: 10,
        height : 110,
        backgroundColor : 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
        marginVertical : 20,
        marginLeft : 'auto',
        marginRight : 'auto',
        padding: 15,
        // paddingVertical : 15,
        // paddingHorizontal : 15,
},
stat : {
    alignItems : 'center',
    justifyContent : 'center',
},
statBox : {
    width : '100%',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingHorizontal : 30
},
title : {
    fontSize : 16,
    fontWeight : 'bold',
    color : 'black',
    marginBottom: 5,
},
number : {
    fontSize : 24,
   
    color : 'black'
}

})