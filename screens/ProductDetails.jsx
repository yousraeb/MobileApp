import { View , Text, TouchableOpacity , Image} from "react-native";
import React, {useState} from "react";
import {Ionicons, SimpleLineIcons, MaterialCommunityIcons, Fontisto} from '@expo/vector-icons';

import styles from "./productDetails.style";
import { COLORS, SIZES } from "../constants";


const ProductDetails =({navigation}) => {
    const [count, setCount] = useState(1)

    const increment = () =>{
        setCount(count + 1)
    }


    const decrement = () => {
        if(count >1){
            setCount(count - 1)
    }
}
    return (
       <View style={styles.container} >
            <View style={styles.upperRow }>
                <TouchableOpacity onPress={()=>navigation.goBack()}  >
                <Ionicons name='chevron-back-circle' size={30}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{}}  >
                <Ionicons name='heart' size={30} color={COLORS.primary}/>
                </TouchableOpacity>
            </View>
            <Image 
            
            source={{uri:"https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-acd415b/www.decorilla.com/online-decorating/wp-content/uploads/2022/11/Luxury-interior-design-home-designing-1-2048x1365.jpeg"}}
            style={styles.image}
            
            />
            <View style={styles.details}>
                <View  style={styles.titleRow}>
                <Text style={styles.title}> Product</Text>
                <View style={styles.priceWrapper}>
                <Text style={styles.price}>4000DH</Text>
                </View>
                </View>

                <View style={styles.ratingRow}  >
                    <View style={styles.rating}>
                        {[1,2,3,4,5].map((index) => (
                            <Ionicons 
                            key={index}
                            name='star'
                            size={24}
                            color="gold"/>
                        ))}
                        <Text style={styles.ratingText}>(4.9)</Text>
                    </View>

                    <View style={styles.rating}>
                        <TouchableOpacity onPress={()=>increment()}>
                            <SimpleLineIcons
                          
                            name='plus' size={20}/>
                        </TouchableOpacity>
                        <Text style={styles.ratingText}>{count}</Text>

                        <TouchableOpacity onPress={()=>decrement()}>
                            <SimpleLineIcons
                          
                            name='minus' size={20}/>
                        </TouchableOpacity>
                    </View>


                </View>
                    <View style={styles.descriptionWraper}>
                        <Text style={styles.description}>Description</Text>
                        <Text style={styles.descText}>
                        Lorem ipsum dolor sit amet. Eum quod voluptas id pariatur aliquid et perspiciatis laboriosam non repellendus voluptatem! Quo ipsum eveniet in quos similique ea alias provident. Hic nemo libero eum dolores rerum quo sint omnis ut voluptatem impedit rem illo odit?
                        </Text>
                    </View>

                    <View style={{marginBottom: SIZES.small}}>
                        <View style={styles.location}>
                            <View style={{flexDirection:"row"}}>
                              <Ionicons name='location-outline' size={20}/>
                              <Text> Marrakech </Text>
                            </View>

                            <View style={{flexDirection:"row"}}>
                              <MaterialCommunityIcons name='truck-delivery-outline' size={20}/>
                              <Text> Free Delivery  </Text>
                            </View>
                        </View>
                    </View>

                        <View style={styles.cartRow}>
                            <TouchableOpacity onPress={()=>{}} style={styles.cartBtn}> 
                               <Text style={styles.cartTitle}>BUY NOM</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>{}} style={styles.addCart}> 
                               <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
                            </TouchableOpacity>
                        </View>

            </View>
       </View>
    )
}
export default ProductDetails
