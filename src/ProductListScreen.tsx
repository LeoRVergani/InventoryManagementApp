import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, StyleSheet } from 'react-native';
import axios from 'axios';

interface Product {
  product_name: string;
  quantity: number;
  image_url: string;
  description: string;
  branch_name: string;
  location: string;
  latitude: number;
  longitude: number;
}

export default function ProductListScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);


  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(process.env.EXPO_PUBLIC_API_URL + '/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.branch_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de Produtos</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar por produto ou filial"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Button title="Buscar" onPress={handleSearch} />
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item, index) => index.toString()}
        
        renderItem={({ item }) => (
          <View style={[styles.productCard, item.quantity > 0 ? styles.inStock : styles.outOfStock]}>
            <Image source={{ uri: item.image_url }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.product_name}</Text>
              <Text style={styles.branchName}>Filial: {item.branch_name}</Text>
              <Text style={styles.location}>Local: {item.location}</Text>
              <Text style={styles.quantity}>Quantidade: {item.quantity}</Text>
              <Text style={styles.description}>Descrição: {item.description}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  productCard: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
  },
  inStock: {
    borderColor: 'green',
  },
  outOfStock: {
    borderColor: 'red',
    backgroundColor: '#ffcccc',
  },
  productImage: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  branchName: {
    fontSize: 14,
    color: '#555',
  },
  location: {
    fontSize: 14,
    color: '#555',
  },
  quantity: {
    fontSize: 14,
    color: '#555',
  },
  description: {
    fontSize: 12,
    color: '#777',
  },
});
