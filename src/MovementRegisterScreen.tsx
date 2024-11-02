import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

interface Branch {
  id: number;
  name: string;
}

interface Product {
  id: number;
  product_name: string;
  quantity: number;
  image_url: string;
  description: string;
  branch_name: string;
  location: string;
  latitude: number;
  longitude: number;
}

export default function MovementRegisterScreen() {
  const [originBranches, setOriginBranches] = useState<Branch[]>([]);
  const [destinationBranches, setDestinationBranches] = useState<Branch[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [originBranchId, setOriginBranchId] = useState<number | null>(null);
  const [destinationBranchId, setDestinationBranchId] = useState<number | null>(null);
  const [productId, setProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<string>('');
  const [observation, setObservation] = useState<string>('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchBranches();
    fetchProducts();
  }, []);

  const fetchBranches = async () => {
    try {
      const response = await axios.get<Branch[]>(process.env.EXPO_PUBLIC_API_URL + '/branches/options');
      setOriginBranches(response.data);
      setDestinationBranches(response.data);
    } catch (error) {
      Alert.alert('Erro ao buscar filiais', 'Não foi possível carregar as opções de filiais.');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(process.env.EXPO_PUBLIC_API_URL + '/products/options');
      setProducts(response.data);
    } catch (error) {
      Alert.alert('Erro ao buscar produtos', 'Não foi possível carregar as opções de produtos.');
    }
  };

  const handleRegisterMovement = async () => {
    if (originBranchId === destinationBranchId) {
      Alert.alert('Erro', 'A filial de origem e destino devem ser diferentes.');
      return;
    }
    
    const selectedProduct = products.find(product => product.id === productId);
    if (selectedProduct && parseInt(quantity) > selectedProduct.quantity) {
      Alert.alert('Erro', 'A quantidade desejada excede o estoque disponível.');
      return;
    }

    try {
      await axios.post(process.env.EXPO_PUBLIC_API_URL + '/movements', {
        originBranchId,
        destinationBranchId,
        productId,
        quantity: parseInt(quantity),
        observation
      });
      Alert.alert('Sucesso', 'Movimentação cadastrada com sucesso!');
      navigation.goBack();
    } catch (error) {
      if (error.response?.status === 400) {
        Alert.alert('Erro', error.response.data.Error);
      } else {
        Alert.alert('Erro', 'Não foi possível cadastrar a movimentação.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Filial de Origem:</Text>
      <Picker
        selectedValue={originBranchId}
        onValueChange={(itemValue) => setOriginBranchId(itemValue as number)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione a Filial de Origem" value={null} />
        {originBranches.map(branch => (
          <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Filial de Destino:</Text>
      <Picker
        selectedValue={destinationBranchId}
        onValueChange={(itemValue) => setDestinationBranchId(itemValue as number)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione a Filial de Destino" value={null} />
        {destinationBranches.map(branch => (
          <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Produto:</Text>
      <Picker
        selectedValue={productId}
        onValueChange={(itemValue) => setProductId(itemValue as number)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione o Produto" value={null} />
        {products.map(product => (
          <Picker.Item key={product.id} label={`${product.product_name} (Estoque: ${product.quantity})`} value={product.id} />
        ))}
      </Picker>

      {productId && (
        <View style={styles.productDetails}>
          {products.find(product => product.id === productId)?.image_url && (
            <Image
              source={{ uri: products.find(product => product.id === productId)?.image_url }}
              style={styles.productImage}
            />
          )}
          <Text style={styles.productDescription}>
            {products.find(product => product.id === productId)?.description}
          </Text>
          <Text style={styles.productLocation}>
            Local: {products.find(product => product.id === productId)?.branch_name} - {products.find(product => product.id === productId)?.location}
          </Text>
        </View>
      )}

      <Text style={styles.label}>Quantidade:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
        placeholder="Digite a quantidade"
      />

      <Text style={styles.label}>Observações:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        multiline
        value={observation}
        onChangeText={setObservation}
        placeholder="Observações sobre a movimentação"
      />

      <Button title="Cadastrar" onPress={handleRegisterMovement} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 80,
  },
  productDetails: {
    marginVertical: 15,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  productLocation: {
    fontSize: 12,
    color: 'gray',
  },
});
