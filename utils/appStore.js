import {create} from "zustand";
import { axios1 } from "./axios";
import { FIRESTORE_DB } from './firebaseConfig'
import { collection, query, where,getDocs,addDoc,getDoc,doc,setDoc,arrayUnion,updateDoc,serverTimestamp,deleteDoc} from "firebase/firestore";

const useStore = create((set,get) => ({
    data: [],
    orders:[],
    totalPrice:0,
    cart: [],
    favorites : [],
    user : [],
    storeid : "",
    currentStore : "",
    loading: false,
    hasErrors: false,
    addOrders : async (cart,storeid,pay)=>{
      console.log(storeid)
      console.log(get().currentStore)
      try {
        const res = await setDoc(doc(collection(FIRESTORE_DB,"orders")),{
          user_id : get().user.userid,
          orders : [...cart],
          storename : get().currentStore,
          address : get().user,
          storeid : storeid,
          pay : pay,
          status : 0,
          date: serverTimestamp()
         
      },{merge:true})

      await deleteDoc(doc(FIRESTORE_DB,"cart",get().user.userid))

      set(() => ({ cart:[] }));
      set(()=>({currentStore : "",storeid: ""}))
      console.log(res)
      } catch (error) {
        console.log(error)
      }
},
setStoreid : (id)=>{
  console.log({store : id})
  set(() => ({ storeid: id }));
},
    setUserProfile : (key,val)=>{
      set((state) => ({ user: {...state.user,[key] : val}  }));
    },
    setCartItems : (items)=>{
      set(() => ({ cart: items }));
    },
    setTotalPrice : (price)=>{
      set((state) => ({ totalPrice: state.price + price}))
    },
    setFaves : (favs)=>{
      set(() => ({ favorites: favs }));
    },
    getTotalPrice : ()=>{
      
      const totalPrice = get().cart.reduce((acc,item)=>{
          return acc + ((item.price * item.count)+ item.shipping)
      },0)
      console.log(totalPrice)
      set(()=>({totalPrice: totalPrice}))
    },
    fetchCart : async ()=>{
      // set(() => ({ loading: true }));
      // try {
      //   const productRef = collection(FIRESTORE_DB, "cart");
      //   const q = query(productRef, where("user_id", "==",get().user.userid));
      //   const querySnapshot = await getDocs(q);
      //   const cart_data = []
      //   if(querySnapshot.isEmpty) console.log('empty')
      //   querySnapshot.forEach(async (docu) => {
      //   // doc.data() is never undefined for query doc snapshots
      //   const docRef =  doc(FIRESTORE_DB, "products", docu.data().product_id);
      //   const docSnap = await getDoc(docRef);
      //   console.log(docSnap)
      //   if (docSnap.exists()) {
      //             console.log(docSnap.data())
      //             cart_data.push({...docu.data(),...docSnap.data(),cart_id : docu.id})
                  
      //           } else {
      //             // docSnap.data() will be undefined in this case
      //             console.log("No such document!");
      //           }
        
      //   });

        
        
      //   set(()=>({cart : cart_data}))
      //   set(() => ({ loading: false }));

      //       }catch (err) {
      //         console.log(err)
      //       }
      set(() => ({ loading: true }));
      try {
          const cartRef = doc(FIRESTORE_DB,"cart",get().user.userid)
          const docSnap = await getDoc(cartRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const data = docSnap.data();
            console.log(data.cart_items)
            
            if(data){
              set((state) => ({ cart: [...data.cart_items]}));
              set(() => ({ currentStore: data.store}))
              set(() => ({ storeid: data.storeid}))
              set(() => ({ loading: false }));
            }
            console.log(data.store)
           
          } else {
            // doc.data() will be undefined in this case
            console.log("Cart Empty");
            set((state) => ({ cart: (state.cart = [])  }));
              set(() => ({ currentStore: ""}))
              set(() => ({ storeid: ""}))
              set(() => ({ loading: false }));
          }
      } catch (error) {
        console.log(error)
      }

    },
    resetCurrentStore : ()=>{
      set(() => ({ currentStore: ""}))
    },
    addToCart : async (prod_id,user_id,count,sname,pic,unit,stock,price,name,desc,shipping)=>{
          const item = {
            prod_id : prod_id,
            pic:pic,
            unit : unit,
            stock : stock,
            count : count,
            price : price,
            name : name,
            desc :desc,
            shipping : shipping
          }
          try {
            const res = await setDoc(doc(FIRESTORE_DB,"cart",user_id),{
              cart_items : arrayUnion(item),
              store : sname,
              storeid : get().storeid
             
          },{merge:true})

          set((state) => ({ cart:[...state.cart,item] }));
          set(()=>({currentStore : sname}))
          console.log(res)
          } catch (error) {
            console.log(error)
          }
    },
    addToFav : async (prod_id,user_id,sname,pic,unit,price,name,desc)=>{
      const item = {
        prod_id : prod_id,
        pic:pic,
        unit : unit,
        price : price,
        name : name,
        desc :desc
        
      }
      try {
        const res = await setDoc(doc(FIRESTORE_DB,"favorites",get().storeid),{
          fav_items : arrayUnion(item),
          store : sname,
          userid : user_id
      },{merge:true})

      
      console.log(res)
      } catch (error) {
        console.log(error)
      }
},
    fetch: async (code) => {
      set(() => ({ loading: true }));
      try {
        const response = await axios1.get(
          `https://caringstore.xyz/api/getq/${code}`
        );
        

        set((state) => ({ data: (state.data = response.data), loading: false }));
      } catch (err) {
        set(() => ({ hasErrors: true, loading: false }));
      }
    },
    setUser : (userdata)=>{
      set((state)=>({user : (state.user = userdata)}))
    },
    updateComments : (index,comment)=>{
        set(state => ({
            data: state.data.map((item,i) => {
              if (i === index) {
                return {
                  ...item,
                  comment: comment,
                };
              } else {
                return item;
              }
            })
          }))
    },
    setLoading : (status)=>{
        set(()=>({loading : status}))
    }
  }));


export default useStore;