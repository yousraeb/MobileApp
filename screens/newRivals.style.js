import { StyleSheet } from "react-native";
import {COLORS , SIZES} from '../constants/index'


const styles = StyleSheet.create({
    containerr:{
        flex: 1,
        backgroundColor: COLORS.lightWhite

    },
    wrapper:{
        flex: 1,
        backgroundColor: COLORS.lightWhite
    },
    upperRow:{
        width: SIZES.width-58,
        marginHorizontal : SIZES.large,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        position:"absolute",
        backgroundColor: COLORS.primary,
        borderRadius : SIZES.large,
        top: SIZES.large,
        zIndex: 999

    },
    heading:{
        fontFamily: "semibold",
        fontSize: SIZES.medium,
        color: COLORS.lightWhite,
        marginLeft: 5},

        container:{
            width: 182,
            height: 260,
            marginEnd : 22,
            marginStart: 3,
            borderRadius: SIZES.medium,
            backgroundColor: COLORS.secondary,
            marginTop: 60,
            marginStart: 9
            
            
        },
        imageContainer :{
            flex :1,
            width: 178,
            marginLeft: SIZES.small/2,
            marginTop: SIZES.small/2,
            borderRadius: SIZES.small,
            overflow: "hidden",
            marginStart: 1,
            marginTop: 0.5
        },
        image:{
            aspectRatio: 1,
            resizeMode: 'cover',
            
            
          },
          details:{
            padding: SIZES.small
          },
          title:{
            fontFamily: "bold",
            fontSize: SIZES.large,
            marginBottom:2
          },
          supplier:{
            fontFamily: "regular",
            fontSize: SIZES.small,
            color: COLORS.gray
          },
          price:{
            fontFamily: "bold",
            fontSize: SIZES.medium
           
          },
          addBtn:{
            position: "absolute",
            bottom: SIZES.xSmall,
            right: SIZES.xSmall
          }
})
export default styles ;