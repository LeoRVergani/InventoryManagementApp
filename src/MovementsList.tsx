import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// Definindo o tipo Movement
interface Movement {
  id: number;
  origin_name: string;
  destination_name: string;
  product_name: string;
  status: string;
}

export default function MovementsList() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const navigation = useNavigation();

  // Função para buscar as movimentações ao carregar a tela
  const fetchMovements = async () => {
    try {
      const response = await axios.get<Movement[]>(process.env.EXPO_PUBLIC_API_URL + '/movements');
      setMovements(response.data);
    } catch (error) {
      console.error('Erro ao buscar movimentações:', error);
    }
  };

  // Carrega as movimentações na inicialização
  useEffect(() => {
    fetchMovements();
  }, []);

  // Função para navegar para a tela de adicionar nova movimentação
  const handleAddMovement = () => {
    navigation.navigate('AddMovement');  // Substitua 'AddMovement' pelo nome da tela de cadastro de movimentação
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de Movimentações</Text>

      <FlatList
        data={movements}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={[styles.movementCard, item.status === 'created' ? styles.created : styles.inProgress]}>
            <Text style={styles.label}>Origem:</Text>
            <Text style={styles.info}>{item.origin_name}</Text>
            <Text style={styles.label}>Destino:</Text>
            <Text style={styles.info}>{item.destination_name}</Text>
            <Text style={styles.label}>Produto:</Text>
            <Text style={styles.info}>{item.product_name}</Text>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.info}>{item.status}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAddMovement}>
        <Text style={styles.addButtonText}>Adicionar Nova Movimentação</Text>
      </TouchableOpacity>
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
  movementCard: {
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
  },
  created: {
    borderColor: 'green',
  },
  inProgress: {
    borderColor: 'orange',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  info: {
    fontSize: 14,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
