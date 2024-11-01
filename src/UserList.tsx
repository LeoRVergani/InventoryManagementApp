import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const toggleUserStatus = async (userId: any) => {
    try {
      await axios.patch(process.env.EXPO_PUBLIC_API_URL + `/users/${userId}/toggle-status`);
      fetchUsers(); // Atualiza a lista de usuários após a alteração do status
    } catch (error) {
      console.error('Erro ao atualizar status do usuário:', error);
    }
  };

  const renderUserItem = ({ item }) => {
    return (
      <View
        style={[
          styles.userCard,
          item.status ? styles.activeUser : styles.inactiveUser,
        ]}
      >
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.userProfile}>Tipo: {item.profile}</Text>
        <Switch
          value={item.status}
          onValueChange={() => toggleUserStatus(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('UserRegister')}
      >
        <Text style={styles.addButtonText}>Adicionar Novo Usuário</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  userCard: {
    padding: 15,
    borderRadius: 8,
    marginVertical: 8,
  },
  activeUser: {
    borderWidth: 2,
    borderColor: 'green',
  },
  inactiveUser: {
    backgroundColor: 'red',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userProfile: {
    fontSize: 16,
    color: 'gray',
  },
  addButton: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
