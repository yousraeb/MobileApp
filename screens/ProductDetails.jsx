import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Ionicons, MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';
import styles from "./productDetails.style";
import { COLORS, SIZES } from "../constants";

const ProductDetails = ({ route, navigation }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://192.168.1.103:8080/api/products/single/${productId}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    }, [productId]);

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.upperRow}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-circle" size={30} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                    <Ionicons name="heart" size={30} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            {/* Product Image */}
            <Image
                source={{ uri: product.img }} // Use product.img for image source
                style={styles.image}
            />

            {/* Product Details */}
            <View style={styles.details}>
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{product.name}</Text> {/* Use Text component here */}
                        <View style={styles.priceWrapper}>
                            <Text style={styles.price}>{product.price_per_unit} USD</Text> {/* Use Text component here */}
                        </View>
                    </View>
            </View>

                {/* Description */}
                <View style={styles.descriptionWrapper}>
                    <Text style={styles.description}>Description</Text>
                    <Text style={styles.descText}>{product.description}</Text>
                </View>

                {/* Action Buttons */}
                <View style={styles.cartRow}>
                    <TouchableOpacity onPress={() => {}} style={styles.cartBtn}>
                        <Text style={styles.cartTitle}>BUY NOW</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {}} style={styles.addCart}>
                        <Fontisto name="shopping-bag" size={22} color={COLORS.lightWhite} />
                    </TouchableOpacity>
                </View>
            </View>
       
    );
};

export default ProductDetails;
