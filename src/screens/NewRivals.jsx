import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import styles from "./newRivals.style";
import { COLORS } from "../constants";

const NewRivals = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.56.1:8080/api/products/all');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
        <TouchableOpacity style={styles.addBtn}>
          <Ionicons name="add-circle" size={35} color={COLORS.primary} />
        </TouchableOpacity>
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
          <Text style={styles.heading}>Products</Text>
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

export default NewRivals;
