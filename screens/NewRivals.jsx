import { View , Text, TouchableOpacity , Image} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import styles from "./newRivals.style";
import {Ionicons} from '@expo/vector-icons';
import { COLORS } from "../constants";


const NewRivals =({navigation}) => {
    return  (
            <SafeAreaView style={styles.containerr}>
                <View style={styles.wrapper}>
                    <View style={styles.upperRow}>
                        <TouchableOpacity onPress={() => navigation.goBack()}  >
                            <Ionicons name='chevron-back-circle'
                                size={30} color={COLORS.lightWhite} />
                        </TouchableOpacity>
                        <Text style={styles.heading}> Products</Text>
                    </View>
                    <View>
                        <TouchableOpacity>
                            <View style={styles.container}>
                                <View style={styles.imageContainer}>
                                            <Image source={{uri:"https://megafurniture.sg/cdn/shop/articles/modern-luxury-interior-design-tips-for-home-renovation-megafurniture_d199fbaa-61e4-4abe-9d1d-37b272b30fc1.jpg?v=1710226685&width=950"}}
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
                    
                </View>
                </View>
                
            </SafeAreaView>
            
);
};
export default NewRivals
