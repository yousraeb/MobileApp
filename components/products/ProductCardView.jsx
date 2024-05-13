import { View , Text, TouchableOpacity , Image} from "react-native";
import React from "react";

import styles from "./productCardView.style";
import {Ionicons} from '@expo/vector-icons';
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";



const ProductCardView =() => {
  const navigation = useNavigation();
    return (
      <TouchableOpacity onPress={()=>navigation.navigate("ProductDetails")}>
        <View style={styles.container}>
           <View style={styles.imageContainer}>
                <Image
                source={{uri:"https://cdn-bnokp.nitrocdn.com/QNoeDwCprhACHQcnEmHgXDhDpbEOlRHH/assets/images/optimized/rev-acd415b/www.decorilla.com/online-decorating/wp-content/uploads/2022/11/Luxury-interior-design-home-designing-1-2048x1365.jpeg"}}
                style={styles.image}/>
           </View>

           <View style={styles.details}>
            <Text style={styles.title} numberOfLines={1}>Product</Text>
            <Text style={styles.supplier}numberOfLines={1}>Product</Text>
            <Text style={styles.price}>4000DH</Text>
           </View>
           <TouchableOpacity style={styles.addBtn}>
                <Ionicons name="add-circle" size={35} color={COLORS.primary} />
           </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )
}
export default ProductCardView
