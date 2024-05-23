import React, { useState, useEffect } from "react";
import { SafeAreaView, TextInput, TouchableOpacity, View, Text, Image } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 
import { COLORS } from "../constants";
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Cart = ({ navigation }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const savedSupplier = await getUserInfo();
                if (!savedSupplier || !savedSupplier.name) {
                    console.log('User info or user name is null');
                    return;
                }

                const response = await fetch(`http://192.168.1.103:8080/api/carts/getbyowner/${savedSupplier.name}`);
                if (response.ok) {
                    const cartItemsData = await response.json();
                    const mappedCartItems = cartItemsData.map(item => ({
                        ...item,
                        productId: item._id
                    }));
                    setCartItems(mappedCartItems);
                } else {
                    throw new Error('Failed to fetch cart items');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, []);

    const getUserInfo = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('supplier');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (error) {
            console.error('Error retrieving user information:', error);
        }
    };


    const totalItemsInCart = cartItems.length;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back-circle' size={30} style={{ marginTop: 10 }} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Cart ({totalItemsInCart})</Text>
            </View>
            <View style={styles.cartContainer}>
                {cartItems.map((item, index) => (
                    <View key={index} style={styles.cartItem}>
                        <Image source={{ uri: item.img }} style={styles.itemImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.itemName}>{String(item.name)}</Text>
                            <Text style={styles.itemPrice}>{item.price_per_unit} USD</Text>
                            <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                            <Text style={styles.itemCategory}>Category: {String(item.categoryName)}</Text>
                        </View>

                    </View>
                ))}
            </View>
        </SafeAreaView>
    );
    
};

export default Cart;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    cartContainer: {
        flex: 1,
        padding: 20,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    itemImage: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        marginRight: 20,
        borderRadius: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemPrice: {
        fontSize: 14,
        color: COLORS.primary,
        marginBottom: 5,
    },
    itemQuantity: {
        fontSize: 14,
        marginBottom: 5,
    },
    itemCategory: {
        fontSize: 14,
        color: '#666',
    },
});
