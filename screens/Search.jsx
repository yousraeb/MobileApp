import {TextInput, View , Text,TouchableOpacity, StyleSheet } from "react-native";
import React , {useState} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./search.style";
import {Feather, Ionicons} from '@expo/vector-icons';
import { COLORS, SIZES } from "../constants";

const Search =() => {
  const [searchKey, setSearchKey] = useState ('');

  
    return (
       <SafeAreaView>
          <View style={styles.searchContainer}>
            <TouchableOpacity>
                <Ionicons
                 name="camera-outline" 
                  size={SIZES.xLarge} 
                  style={styles.searchIcon}
                  />
        
                
            </TouchableOpacity>
            <View style={styles.searchWrapper}>
                <TextInput
                style={styles.searchInput}
                value={searchKey}
                onChangeText={setSearchKey}
                onPressIn={()=>{}}
                placeholder="what are you looking for "
                />
            </View> 
            <View>
              <TouchableOpacity style={styles.searchBtn} onPress={()=>{}}>
                <Feather name="search" size={24}
                    
                   color={COLORS.offwhite}
                   />
              </TouchableOpacity>
            </View>
            </View>

            
       </SafeAreaView>
       
    )
}
export default Search;
