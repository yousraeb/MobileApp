import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./productCardView.style";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductCardView = ({ product }) => {
    const navigation = useNavigation();
    const goToProductDetails = () => {
        navigation.navigate("ProductDetails", { productId: product.id });
    };

    const [supplierName, setSupplierName] = useState('');
    const [isFavorite, setIsFavorite] = useState(false); 
    const [isAdded, setIsAdded] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = await getUserInfo();
            if (userInfo && userInfo.name) {
                setSupplierName(userInfo.name);
                console.log('Supplier Name:', userInfo.name); 
            } else {
                console.log('User info or user name is null');
            }
        };

        fetchUserInfo();
    }, []);

    const getUserInfo = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('supplier');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.error('Error retrieving user information:', error);
        }
    };

    const handleAddToFavorites = async () => {
        try {
            if (!supplierName) {
                Alert.alert("Error", "Supplier name is not available.");
                return;
            }
    
            const apiUrl = `http://192.168.1.103:8080/api/suppliers/addtofavorites?supplierName=${supplierName}&productName=${product.name}`;
            console.log("API URL:", apiUrl); 
            
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            const responseData = await response.json(); 
            
            if (response.ok) {
                setIsFavorite(true);
                Alert.alert('Success', 'Product added to favorites!');
            } else {
                const errorMessage = responseData && responseData.message ? responseData.message : 'Failed to add product to favorites.';
                Alert.alert('Error', errorMessage);
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred. Please try again.');
            console.error('Error adding to favorites:', error);
        }
    };

    const handleAddToCart = async () => {
        try {
            // Retrieve supplier information from AsyncStorage
            const supplierJson = await AsyncStorage.getItem('supplier');
            const supplier = JSON.parse(supplierJson);
    
            // Prepare cart item data
            const cartItem = {
                supplierName: supplier.name,
                price_per_unit: product.price_per_unit,
                img: product.img,
                cartOwner: supplier.name,
                productName: product.name,
                quantity: 1 // Assuming quantity is always 1 when adding to cart
            };
    
            // Send POST request to add the item to the cart
            const response = await fetch('http://192.168.1.103:8080/api/carts/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cartItem)
            });
    
            // Check if the request was successful
            if (response.ok) {
                setIsAdded(true);
                console.log("Product added to cart successfully", supplier.name);
                alert("Product added to cart successfully");
            } else {
                console.error("Failed to add product to cart");
                alert("Failed to add product to cart");
            }
        } catch (error) {
            console.error("Error adding product to cart:", error);
            alert("An error occurred. Please try again.");
        }
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
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.heartBtn} onPress={handleAddToFavorites}>
                        <Ionicons name={isFavorite ? "heart" : "heart-outline"} size={35} color={COLORS.primary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
                        <Ionicons name={isAdded ? "bag" : "bag-outline"} size={35} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ProductCardView;
