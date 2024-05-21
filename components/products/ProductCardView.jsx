import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import styles from "./productCardView.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const ProductCardView = ({ product }) => {
    const navigation = useNavigation();
    const goToProductDetails = () => {
        navigation.navigate("ProductDetails", { productId: product.id });
    };
    return (
        <TouchableOpacity onPress={goToProductDetails}>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: product.img }} style={styles.image} />
                </View>
                <View style={styles.details}>
                    <Text style={styles.title} numberOfLines={1}>
                        {product.name}
                    </Text>
                    <Text style={styles.supplier} numberOfLines={1}>
                        {product.supplierName}
                    </Text>
                    <Text style={styles.price}>{product.price_per_unit} USD</Text>
                </View>
                <TouchableOpacity style={styles.addBtn}>
                    <Ionicons name="add-circle" size={35} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCardView;
