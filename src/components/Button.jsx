import { View , Text, StyleSheet , TouchableOpacity} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants";

const Button =({title, onPress, isValid}) => {
    return (
       <TouchableOpacity onPress={onPress}style={styles.btnStyle(isValid == false ? COLORS.gray: COLORS.primary)}>
            <Text style={styles.btnTxt}>{title} </Text>
       </TouchableOpacity>
    )
}
export default Button
const styles = StyleSheet.create({

    btnTxt:{
        fontFamily: "bold",
        color: COLORS.white,
        fontSize: 18
    },
    btnStyle:(backgroundColor)=>({
        height: 50,
        width: '100%',
        marginVertical: 28,
        backgroundColor: backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12
    })
})