// src/screens/MovementListScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

interface Movement {
  id: number;
  status: 'Created' | 'Em Trânsito' | 'Coleta Finalizada';
  product_name: string;
  quantity: number;
  origin: string;
  destination: string;
  product_image: string;
}

export default function MovementScreen() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const navigation = useNavigation();

  // Carregar as movimentações ao montar o componente
  useEffect(() => {
    fetchMovements();
  }, []);

  const fetchMovements = async () => {
    try {
      const response = await axios.get<Movement[]>(process.env.EXPO_PUBLIC_API_URL + '/movements');
      setMovements(response.data);
    } catch (error) {
      Alert.alert('Erro ao buscar movimentações', 'Não foi possível carregar as movimentações.');
    }
  };

  const handleStartDelivery = async (movementId: number) => {
    const image = await pickImage();
    if (!image) return;

    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      name: 'delivery.jpg',
      type: 'image/jpeg',
    });
    formData.append('motorista', 'Nome do Motorista');

    try {
      await axios.put(process.env.EXPO_PUBLIC_API_URL + `/movements/${movementId}/start`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Sucesso', 'Entrega iniciada com sucesso!');
      fetchMovements();
    } catch (error) {
      Alert.alert('Erro ao iniciar entrega', 'Não foi possível iniciar a entrega.');
    }
  };

  const handleFinishDelivery = async (movementId: number) => {
    const image = await pickImage();
    if (!image) return;

    const formData = new FormData();
    formData.append('file', {
      uri: image.uri,
      name: 'finalize.jpg',
      type: 'image/jpeg',
    });
    formData.append('motorista', 'Nome do Motorista');

    try {
      await axios.put(process.env.EXPO_PUBLIC_API_URL + `/movements/${movementId}/end`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      Alert.alert('Sucesso', 'Entrega finalizada com sucesso!');
      fetchMovements();
    } catch (error) {
      Alert.alert('Erro ao finalizar entrega', 'Não foi possível finalizar a entrega.');
    }
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão negada', 'É necessário conceder permissão para usar a câmera.');
      return null;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    return result.cancelled ? null : result;
  };

  const renderItem = ({ item }: { item: Movement }) => {
    return (
      <View style={[styles.card, item.status === 'Created' ? styles.created : styles.inTransit]}>
        <Image source={{ uri: item.product_image }} style={styles.productImage} />
        <Text style={styles.text}><Text style={styles.label}>Produto:</Text> {item.product_name}</Text>
        <Text style={styles.text}><Text style={styles.label}>ID da Movimentação:</Text> {item.id}</Text>
        <Text style={styles.text}><Text style={styles.label}>Quantidade:</Text> {item.quantity}</Text>
        <Text style={styles.text}><Text style={styles.label}>Origem:</Text> {item.origin}</Text>
        <Text style={styles.text}><Text style={styles.label}>Destino:</Text> {item.destination}</Text>
        <Text style={styles.text}><Text style={styles.label}>Status:</Text> {item.status}</Text>

        {item.status === 'Created' && (
          <Button title="Iniciar Entrega" onPress={() => handleStartDelivery(item.id)} />
        )}
        {item.status === 'Em Trânsito' && (
          <>
            <Button title="Finalizar Entrega" onPress={() => handleFinishDelivery(item.id)} />
            <Button title="Ver Mapa" onPress={() => navigation.navigate('MapScreen', { origin: item.origin, destination: item.destination })} />
          </>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={movements}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  card: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  created: {
    backgroundColor: '#d3d3d3', // Fundo cinza para status "Created"
  },
  inTransit: {
    backgroundColor: '#FFA07A', // Fundo salmão para status "Em Trânsito"
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
});
