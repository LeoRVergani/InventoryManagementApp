// src/screens/AddMovementScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Picker, ScrollView } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// Definindo tipos para as opções de filial e produtos
interface Branch {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  quantity: number; // Quantidade disponível em estoque
}

export default function AddMovementScreen() {
  const [originBranches, setOriginBranches] = useState<Branch[]>([]);
  const [destinationBranches, setDestinationBranches] = useState<Branch[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedOrigin, setSelectedOrigin] = useState<number | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<string>('');
  const [observations, setObservations] = useState<string>('');
  const navigation = useNavigation();

  // Carregar as opções de filiais e produtos ao montar a tela
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const branchResponse = await axios.get<Branch[]>('http://localhost:3000/branches/options');
        const productResponse = await axios.get<Product[]>('http://localhost:3000/products/options');
        setOriginBranches(branchResponse.data);
        setDestinationBranches(branchResponse.data);
        setProducts(productResponse.data);
      } catch (error) {
        Alert.alert('Erro ao buscar dados', 'Não foi possível carregar as opções de filiais e produtos.');
      }
    };
    fetchOptions();
  }, []);

  // Função para cadastrar uma nova movimentação
  const handleRegisterMovement = async () => {
    // Verificação de validações
    if (selectedOrigin === null || selectedDestination === null || selectedProduct === null) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return;
    }
    if (selectedOrigin === selectedDestination) {
      Alert.alert('Erro', 'A filial de origem e destino devem ser diferentes.');
      return;
    }

    const selectedProductObj = products.find(product => product.id === selectedProduct);
    const requestedQuantity = parseInt(quantity, 10);

    if (selectedProductObj && requestedQuantity > selectedProductObj.quantity) {
      Alert.alert('Erro', 'A quantidade desejada excede o estoque disponível.');
      return;
    }

    // Fazer a requisição POST para cadastrar a movimentação
    try {
      await axios.post(process.env.EXPO_PUBLIC_API_URL + '/movements', {
        originBranchId: selectedOrigin,
        destinationBranchId: selectedDestination,
        productId: selectedProduct,
        quantity: requestedQuantity,
        observations
      });
      Alert.alert('Sucesso', 'Movimentação cadastrada com sucesso!');
      navigation.goBack();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert('Erro', error.response.data.error);
      } else {
        Alert.alert('Erro', 'Não foi possível cadastrar a movimentação.');
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastrar Movimentação</Text>

      <Text style={styles.label}>Filial de Origem</Text>
      <Picker
        selectedValue={selectedOrigin}
        onValueChange={(itemValue) => setSelectedOrigin(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione a Filial de Origem" value={null} />
        {originBranches.map((branch) => (
          <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Filial de Destino</Text>
      <Picker
        selectedValue={selectedDestination}
        onValueChange={(itemValue) => setSelectedDestination(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione a Filial de Destino" value={null} />
        {destinationBranches.map((branch) => (
          <Picker.Item key={branch.id} label={branch.name} value={branch.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Produto</Text>
      <Picker
        selectedValue={selectedProduct}
        onValueChange={(itemValue) => setSelectedProduct(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione o Produto" value={null} />
        {products.map((product) => (
          <Picker.Item key={product.id} label={`${product.name} - Em estoque: ${product.quantity}`} value={product.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Quantidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a quantidade"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Digite as observações"
        multiline
        value={observations}
        onChangeText={setObservations}
      />

      <Button title="Cadastrar" onPress={handleRegisterMovement} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  picker: {
    marginBottom: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  textArea: {
    height: 80,
  },
});
