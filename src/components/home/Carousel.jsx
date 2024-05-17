import { View , Text, StyleSheet } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS } from "../../constants";


const Carousel=() => {
    const slides = [
       "https://static.wixstatic.com/media/57c0e2_f11c281488564a85a80496acdde76aca~mv2.jpg/v1/fill/w_925,h_610,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/57c0e2_f11c281488564a85a80496acdde76aca~mv2.jpg",
       "https://asset-ng.skoiy.com/9b80a6f781ff336f/yrwwqpnyb7ys.jpg?w=970&q=90&fm=webp",
       "https://asset.skoiy.com/9b80a6f781ff336f/htaugrpyt0j3.jpg"

     ];
    return (
       <View style={styles.carouselContainer}>
         <SliderBox
          images={slides}
         
          dotColor={COLORS.primary}
          inactiveDotColor={COLORS.secondary}
          ImageComponentStyle={{ borderRadius: 15, width: "93%", marginTop: 15 }}
          autoplay
          circleLoop
         />
       </View>
    )
}
export default Carousel
const styles = StyleSheet.create({
    carouselContainer:{
        flex: 1,
        alignItems:"center"
    }
})