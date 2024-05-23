import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import styles from "./newRivals.style";
import { COLORS } from "../constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favourites = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState(null);

  // Function to fetch user info from AsyncStorage
  const fetchUserInfo = useCallback(async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('supplier');
      const userInfo = jsonValue != null ? JSON.parse(jsonValue) : null;
      if (userInfo && userInfo.name) {
        setUserName(userInfo.name);
        console.log('Supplier Name:', userInfo.name);
      } else {
        console.log('User info or user name is null');
      }
    } catch (error) {
      console.error('Error retrieving user information:', error);
    }
  }, []);

  // Function to fetch products based on user name
  const fetchProducts = useCallback(async () => {
    if (userName) {
      try {
        const response = await axios.get(`http://192.168.1.103:8080/api/suppliers/favorites/${userName}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
  }, [userName]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.img }} style={styles.image} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
          <Text style={styles.supplier} numberOfLines={1}>{item.supplierName}</Text>
          <Text style={styles.price}>{item.price_per_unit} USD</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.containerr}>
        <View style={styles.wrapper}>
          <View style={styles.upperRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='chevron-back-circle' size={30} color={COLORS.lightWhite} />
            </TouchableOpacity>
            <Text style={styles.heading}>Loading...</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.containerr}>
      <View style={styles.wrapper}>
        <View style={styles.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-circle' size={30} color={COLORS.lightWhite} />
          </TouchableOpacity>
          <Text style={styles.heading}>Favorite products  <Ionicons name="heart" size={20} color="red"/></Text>
        </View>
        <FlatList
            data={products}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
        />
      </View>
    </SafeAreaView>
  );
};

export default Favourites;
