import React, { useEffect, useState } from "react";
import { TextInput, View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from '@expo/vector-icons';
import { COLORS, SIZES } from "../constants";
import styles from "./search.style";
import ProductCardView from "../components/products/ProductCardView";
import axios from 'axios';

const Search = ({ navigation }) => {
  const [searchKey, setSearchKey] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://192.168.1.103:8080/api/products/all');
      setProducts(response.data);
      setFilteredProducts(response.data); // Set filtered products initially
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Update filtered products based on search key
  useEffect(() => {
    const filtered = products.filter(item =>
      item.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchKey, products]);

  const handleSearch = (key) => {
    setSearchKey(key);
  };

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='chevron-back-circle' size={30} style={{ marginTop: 10 }} color={COLORS.primary} />
            </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value={searchKey}
            onChangeText={handleSearch}
            placeholder="What are you looking for?"
          />
        </View>
        <View>
          <TouchableOpacity style={styles.searchBtn} onPress={() => handleSearch(searchKey)}>
            <Feather
              name="search"
              size={24}
              color={COLORS.offwhite}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
      {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCardView key={product.id} product={product} />
            ))
          ) : (
            <Text style={styles.noProductsText}>No products found</Text>
          )}

      </View>
    </SafeAreaView>
  );
};

export default Search;


