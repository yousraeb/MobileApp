import React, { useState, useEffect } from "react";
import { SafeAreaView, TextInput, TouchableOpacity, View, Text, Alert } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons'; 
import { COLORS } from "../constants";
import styles from './AddProduct.style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddProduct = ({ navigation }) => {
    const [name, setName] = useState('');
    const [price_per_unit, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [categoryName, setCategory] = useState('');
    const [img, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [supplierName, setSupplierName] = useState('');

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

    const addProduct = async () => {
        setLoading(true);
        try {
            if (!supplierName) {
                Alert.alert("Error", "Supplier name is not available.");
                setLoading(false);
                return;
            }

            const response = await fetch("http://192.168.1.103:8080/api/products/add", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    price_per_unit: parseFloat(price_per_unit),
                    quantity: parseInt(quantity),
                    img,
                    categoryName,
                    supplierName,
                }),
            });

            if (response.ok) {
                Alert.alert("Success", "Product added successfully");
                setName('');
                setPrice('');
                setQuantity('');
                setCategory('');
                setImage('');
            } else {
                throw new Error('Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            Alert.alert("Error", "Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='chevron-back-circle' size={30} style={{ marginTop: 10 }} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add a new product</Text>
                <TouchableOpacity onPress={addProduct}>
                    <Ionicons name='add-circle' size={30} style={{ marginTop: 10 }} color={COLORS.primary} />
                </TouchableOpacity>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Price"
                value={price_per_unit}
                onChangeText={setPrice}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Quantity"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Image"
                value={img}
                onChangeText={setImage}
            />
            <Picker
                selectedValue={categoryName}
                style={styles.picker}
                onValueChange={(itemValue) => setCategory(itemValue)}
            >
                <Picker.Item label="Select Category" value="" />
                <Picker.Item label="Bed" value="Bed" />
                <Picker.Item label="BedSide table" value="BedSide table" />
                <Picker.Item label="Chair" value="Chair" />
                <Picker.Item label="Mirror" value="Mirror" />
                <Picker.Item label="Lamp" value="Lamp" />
            </Picker>
        </SafeAreaView>
    );
};

export default AddProduct;
