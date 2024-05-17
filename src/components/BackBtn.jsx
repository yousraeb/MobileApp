import { View , TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {Ionicons} from '@expo/vector-icons';
import { COLORS, SIZES } from "../../constants";
const BackBtn =({onPress}) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.BackBtn}>
        <Ionicons
        name='chevron-back-circle'
        size={38}
        color={COLORS.primary}/>
      </TouchableOpacity>
    )
}
export default BackBtn
const styles = StyleSheet.create({
  BackBtn:{
    alignItems: "center",
    position: "absolute",
    zIndex:999,
    top: SIZES.large-10
  }
})